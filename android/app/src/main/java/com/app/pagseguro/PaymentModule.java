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
import static com.app.pagseguro.Constants.TYPE_PIX;
import static com.app.pagseguro.Constants.TYPE_DEBITO;
import static com.app.pagseguro.Constants.INSTALLMENT_TYPE_A_VISTA;
import static com.app.pagseguro.Constants.INSTALLMENT_TYPE_PARC_COMPRADOR;
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
    public void startPayment(int value, int installments, int type, String user_reference) {
        Log.i(TAG, "Call startPayment");
        setStyle();

        Handler handler = new Handler(getReactApplicationContext().getMainLooper());

        handler.postDelayed(new Runnable() {
            @Override
            public void run() {

                try {
                    doCreditPaymentBuyerInstallments(value, installments, type, user_reference);

                } catch (Exception e) {
                    Log.i(TAG, "Error on call startPayment: " + e.getMessage());
                }
            }
        }, 100);
    }

    public void doCreditPaymentBuyerInstallments(int value, int installments, int type, String user_reference) {
        int payment_type = TYPE_CREDITO;

        if(type == TYPE_CREDITO){
            payment_type = TYPE_CREDITO;
        }

        if(type == TYPE_DEBITO){
            payment_type = TYPE_DEBITO;
        }

        if(type == TYPE_PIX){
            payment_type = TYPE_PIX;
        }

        int installment_type = installments == 1 ? INSTALLMENT_TYPE_A_VISTA : INSTALLMENT_TYPE_PARC_COMPRADOR;

        Log.i(TAG, "Call doCreditPaymentBuyerInstallments: " + value + " installments: " + installments + " type: " + type);

        doPayment(new PlugPagPaymentData(
                payment_type,
                value,
                installment_type,
                installments,
                user_reference,
                true
        ));
    }

    private void doPayment(final PlugPagPaymentData paymentData) {
        mPlugPagPaymentData = paymentData;

        mPlugPag.doAsyncPayment(paymentData, new PlugPagPaymentListener() {
            @Override
            public void onSuccess(@NonNull PlugPagTransactionResult plugPagTransactionResult) {
                WritableMap params = createObjectToEventSuccessPayment(plugPagTransactionResult);
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
                WritableMap params = Arguments.createMap();
                params.putString("code", plugPagPrintResult.getErrorCode());
                params.putString("message", "Impressão concluída");

                sendEvent("eventPrintSuccess", params);
                Log.i(TAG, "Print success");
            }

            @Override
            public void onPrinterError(@NonNull PlugPagPrintResult plugPagPrintResult) {
                WritableMap params = Arguments.createMap();
                params.putString("code", plugPagPrintResult.getErrorCode());
                params.putString("message", plugPagPrintResult.getMessage());

                sendEvent("eventPrintError", params);
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

    private WritableMap createObjectToEventSuccessPayment(PlugPagTransactionResult transactionResult) {
        WritableMap params = Arguments.createMap();
        params.putString("message", transactionResult.getMessage());
        params.putString("errorCode", transactionResult.getErrorCode());
        params.putString("transactionCode", transactionResult.getTransactionCode());
        params.putString("transactionId", transactionResult.getTransactionId());
        params.putString("date", transactionResult.getDate());
        params.putString("time", transactionResult.getTime());
        params.putString("hostNsu", transactionResult.getHostNsu());
        params.putString("cardBrand", transactionResult.getCardBrand());
        params.putString("bind", transactionResult.getBin());
        params.putString("holder", transactionResult.getHolder());
        params.putString("userReference", transactionResult.getUserReference());
        params.putString("terminalSerialNumber", transactionResult.getTerminalSerialNumber());
        params.putString("amount", transactionResult.getAmount());
        params.putString("availableBalance", transactionResult.getAvailableBalance());
        params.putString("cardApplication", transactionResult.getCardApplication());
        params.putString("label", transactionResult.getLabel());
        params.putString("holderName", transactionResult.getHolderName());
        params.putString("extendedHolderName", transactionResult.getExtendedHolderName());
        params.putInt("result", transactionResult.getResult());
        params.putString("readerModel", transactionResult.getReaderModel());
        params.putString("nsu", transactionResult.getNsu());
        params.putString("autoCode", transactionResult.getAutoCode());
        params.putString("installments", transactionResult.getInstallments().toString());
        params.putInt("originalAmount", transactionResult.getOriginalAmount());
        params.putString("buyerName", transactionResult.getBuyerName());
        params.putInt("paymentType", transactionResult.getPaymentType());
        params.putString("typeTransaction", transactionResult.getTypeTransaction());
        params.putString("appIdentification", transactionResult.getAppIdentification());
        params.putString("cardHash", transactionResult.getCardHash());
        params.putString("preAutoDueDate", transactionResult.getPreAutoDueDate());
        params.putString("preAutoOriginalAmount", transactionResult.getPreAutoOriginalAmount());
        params.putInt("userRegistered", transactionResult.getUserRegistered());
        params.putString("accumulatedValue", transactionResult.getAccumulatedValue());
        params.putString("dynamicListMsgData", transactionResult.getDynamicListMsgData());
        params.putString("partialPayPartiallyAuthorizedAmount", transactionResult.getPartialPayPartiallyAuthorizedAmount());
        params.putString("partialPayRemainingAmount", transactionResult.getPartialPayRemainingAmount());

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
