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
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagTransactionResult;
import br.com.uol.pagseguro.plugpagservice.wrapper.listeners.PlugPagPaymentListener;

import static com.app.pagseguro.Constants.TYPE_CREDITO;
import static com.app.pagseguro.Constants.USER_REFERENCE;
import static com.app.pagseguro.Constants.INSTALLMENT_TYPE_A_VISTA;

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

        doPayment(new PlugPagPaymentData(
                TYPE_CREDITO,
                value,
                INSTALLMENT_TYPE_A_VISTA,
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
                sendEvent("successPayment", params);
                resetCountPassword();

                Log.i(TAG, "Payment success: " + plugPagTransactionResult.getTransactionId());
            }

            @Override
            public void onError(@NonNull PlugPagTransactionResult plugPagTransactionResult) {
                WritableMap params = createObjectToEvent(plugPagTransactionResult);
                sendEvent("errorPayment", params);
                resetCountPassword();

                Log.i(TAG, "Payment error: " + plugPagTransactionResult.getTransactionId());
            }

            @Override
            public void onPaymentProgress(@NonNull PlugPagEventData plugPagEventData) {
                int eventCode = plugPagEventData.getEventCode();

                WritableMap params = Arguments.createMap();
                params.putString("message", plugPagEventData.getCustomMessage());
                params.putString("code", String.valueOf(eventCode));

                Boolean mustShowPassword = eventCode == PlugPagEventData.EVENT_CODE_NO_PASSWORD || eventCode == PlugPagEventData.EVENT_CODE_DIGIT_PASSWORD;

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
                    sendEvent("passwordToPayment", params);

                    return;
                }

                sendEvent("statusPayment", params);
                Log.i(TAG, "Payment in progress: " + plugPagEventData.getCustomMessage());
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

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        Log.i(TAG, "params: " + params.toString());

        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    private WritableMap createObjectToEvent(PlugPagTransactionResult transactionResult) {
        WritableMap params = Arguments.createMap();
        params.putString("message", transactionResult.getMessage());
        params.putString("code", String.valueOf(transactionResult.getTransactionCode()));

        return params;
    }

    private void resetCountPassword() {
        countPassword = 0;
    }
}
