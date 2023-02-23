package com.app.pagseguro;

import android.os.Handler;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPag;
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagEventData;
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagPaymentData;
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagPrintResult;
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagStyleData;
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagTransactionResult;
import br.com.uol.pagseguro.plugpagservice.wrapper.listeners.PlugPagPaymentListener;

import static com.app.pagseguro.Constants.TYPE_CREDITO;
import static com.app.pagseguro.Constants.USER_REFERENCE;
import static com.app.pagseguro.Constants.INSTALLMENT_TYPE_A_VISTA;
import static com.app.pagseguro.Constants.INSTALLMENT_TYPE_PARC_VENDEDOR;
import static com.app.pagseguro.Constants.HEAD_TEXT_COLOR;
import static com.app.pagseguro.Constants.HEAD_BACKGROUND_COLOR;
import static com.app.pagseguro.Constants.CONTENT_TEXT_COLOR;
import static com.app.pagseguro.Constants.CONTENT_TEXT_VALUE_1_COLOR;
import static com.app.pagseguro.Constants.CONTENT_TEXT_VALUE_2_COLOR;
import static com.app.pagseguro.Constants.POSITIVE_BUTTON_TEXT_COLOR;
import static com.app.pagseguro.Constants.POSITIVE_BUTTON_BACKGROUND;
import static com.app.pagseguro.Constants.NEGATIVE_BUTTON_TEXT_COLOR;
import static com.app.pagseguro.Constants.NEGATIVE_BUTTON_BACKGROUND;
import static com.app.pagseguro.Constants.LINE_COLOR;

import java.util.Arrays;

public class PaymentModule extends ReactContextBaseJavaModule {
    private ReactContext reactContext;
    private PlugPag mPlugPag;
    private PlugPagPaymentData mPlugPagPaymentData;
    private int countPassword = 0;
    private static final String ASTERISK = "•";

    String TAG = "PaymentModule";

    public PaymentModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;

        mPlugPag = new PlugPag(context);

        Log.i(TAG, "mPlugPag: " + mPlugPag);
    }

    @NonNull
    @Override
    public String getName() {
        return "PaymentModule";
    }

    @ReactMethod
    public void startPayment(int value, int installments) {
        Log.i(TAG, "Call startPayment");
        setStyle();

        Handler handler = new Handler(getReactApplicationContext().getMainLooper());

        handler.postDelayed(new Runnable() {
            @Override
            public void run() {

                try {
                    doCreditPaymentBuyerInstallments(value, installments);

                } catch (Exception e) {
                    Log.i(TAG, "Error on call startPayment: " + e.getMessage());
                }
            }
        }, 100);
    }

    public void doCreditPaymentBuyerInstallments(int value, int installments) {
        Log.i(TAG, "Call doCreditPaymentBuyerInstallments");

        int INSTALLMENT_FINAL = installments == 1 ? INSTALLMENT_TYPE_A_VISTA : INSTALLMENT_TYPE_PARC_VENDEDOR;

        doPayment(new PlugPagPaymentData(
                TYPE_CREDITO,
                value,
                INSTALLMENT_FINAL,
                installments,
                USER_REFERENCE,
                true
        ));
    }

    private void doPayment(final PlugPagPaymentData paymentData) {
        mPlugPagPaymentData = paymentData;

        mPlugPag.doAsyncPayment(paymentData, new PlugPagPaymentListener() {
            @Override
            public void onSuccess(@NonNull PlugPagTransactionResult plugPagTransactionResult) {
                WritableMap params = createObjectToEvent(plugPagTransactionResult);
                sendEvent("eventSuccessPayment", params);
                resetCountPassword();

                Log.i(TAG, "Payment success: " + plugPagTransactionResult.getTransactionId());
            }

            @Override
            public void onError(@NonNull PlugPagTransactionResult plugPagTransactionResult) {
                WritableMap params = createObjectToEvent(plugPagTransactionResult);
                sendEvent("eventErrorPayment", params);
                resetCountPassword();

                Log.i(TAG, "Payment error: " + plugPagTransactionResult.getTransactionId());
            }

            @Override
            public void onPaymentProgress(@NonNull PlugPagEventData plugPagEventData) {
                int eventCode = plugPagEventData.getEventCode();

                WritableMap params = Arguments.createMap();
                params.putString("message", plugPagEventData.getCustomMessage());
                params.putInt("code", eventCode);

                Boolean mustShowPassword = eventCode == PlugPagEventData.EVENT_CODE_NO_PASSWORD || eventCode == PlugPagEventData.EVENT_CODE_DIGIT_PASSWORD;

                Boolean mustShowKeyboardToRequestPassword = eventCode == PlugPagEventData.EVENT_CODE_NO_PASSWORD || eventCode == PlugPagEventData.EVENT_CODE_PIN_REQUESTED;

                Boolean mustHideKeyboardToRequestPassword = eventCode == PlugPagEventData.EVENT_CODE_PIN_OK;

                Boolean mustShowActionToAbortPayment = eventCode == PlugPagEventData.EVENT_CODE_WAITING_CARD;

                if(mustShowActionToAbortPayment){
                    Log.i(TAG, "Show action to abort payment");
                    WritableMap customParams = Arguments.createMap();
                    customParams.putBoolean("isAvailableAbort", true);

                    sendEvent("eventCodeAvailableAbort", customParams);
                }

                if(mustShowKeyboardToRequestPassword) {
                    Log.i(TAG, "Show keyboard to code pin confirm");
                    WritableMap customParams = Arguments.createMap();
                    customParams.putBoolean("isPinRequested", true);

                    sendEvent("eventCodePinRequested", customParams);
                }

                if (mustHideKeyboardToRequestPassword) {
                    Log.i(TAG, "Hide keyboard to code pin confirm");
                    WritableMap customParams = Arguments.createMap();
                    customParams.putBoolean("isPinRequested", false);

                    sendEvent("eventCodePinRequested", customParams);
                }

                if(mustShowPassword){
                    StringBuilder password = new StringBuilder();

                    Log.i(TAG, "Password string before: " + password.length());

                    if (eventCode == PlugPagEventData.EVENT_CODE_DIGIT_PASSWORD) {
                        countPassword++;
                    }
                    if (eventCode == PlugPagEventData.EVENT_CODE_NO_PASSWORD && countPassword >= 0) {
                        countPassword--;
                    }

                    for (int count = countPassword; count >= 0; count--) {
                        password.append(ASTERISK);
                    }

                    Log.i(TAG, "Password countPassword: " + countPassword);
                    Log.i(TAG, "Password string after: " + password.length());

                    params.putString("message", password.toString());
                    sendEvent("eventPasswordToPayment", params);
                    return;
                }

                sendEvent("eventStatusPayment", params);
            }

            @Override
            public void onPrinterSuccess(@NonNull PlugPagPrintResult plugPagPrintResult) {
                Log.i(TAG, "Print success");
            }

            @Override
            public void onPrinterError(@NonNull PlugPagPrintResult plugPagPrintResult) {
                Log.i(TAG, "Print error");
            }
        });
    }

    @ReactMethod
    private void abortPayment() {
        mPlugPag.abort();

        WritableMap params = Arguments.createMap();
        params.putBoolean("isAvailableAbort", false);

        sendEvent("eventCodeAvailableAbort", params);
    }

    @ReactMethod
    private void getAvailableInstallments(int value) {
        String[] calculateInstallments = mPlugPag.calculateInstallments(String.valueOf(value));

        String installments = Arrays.toString(calculateInstallments);

        WritableMap params = Arguments.createMap();
        params.putString("installments", installments);

        sendEvent("eventCodeGetAvailableInstallments", params);
    }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        Log.i(TAG, "sendEvent with params: " + params.toString());

        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    private WritableMap createObjectToEvent(PlugPagTransactionResult transactionResult) {
        WritableMap params = Arguments.createMap();
        params.putString("message", transactionResult.getMessage());
        params.putString("code", transactionResult.getTransactionCode());

        return params;
    }

    private void resetCountPassword() {
        countPassword = 0;
    }

    private void setStyle() {
        mPlugPag.setStyleData(
                new PlugPagStyleData(
                        HEAD_TEXT_COLOR,
                        HEAD_BACKGROUND_COLOR,
                        CONTENT_TEXT_COLOR,
                        CONTENT_TEXT_VALUE_1_COLOR,
                        CONTENT_TEXT_VALUE_2_COLOR,
                        POSITIVE_BUTTON_TEXT_COLOR,
                        POSITIVE_BUTTON_BACKGROUND,
                        NEGATIVE_BUTTON_TEXT_COLOR,
                        NEGATIVE_BUTTON_BACKGROUND,
                        LINE_COLOR
                )
        );
    }
}
