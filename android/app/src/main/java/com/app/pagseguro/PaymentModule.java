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
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagAppIdentification;
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagPaymentData;
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagTransactionResult;

import static com.app.pagseguro.Constants.TYPE_CREDITO;
import static com.app.pagseguro.Constants.USER_REFERENCE;
import static com.app.pagseguro.Constants.INSTALLMENT_TYPE_A_VISTA;
import static com.app.pagseguro.Constants.APP_IDENTIFICATION;
import static com.app.pagseguro.Constants.APP_VERSION;

public class PaymentModule extends ReactContextBaseJavaModule {
    private ReactContext reactContext;
    private final PlugPag mPlugPag;
    private PlugPagPaymentData mPlugPagPaymentData;

    String TAG = "PaymentModule";

    public PaymentModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;

        PlugPagAppIdentification appIdentification = new PlugPagAppIdentification(APP_IDENTIFICATION, APP_VERSION);

        mPlugPag = new PlugPag(context, appIdentification);
    }

    @NonNull
    @Override
    public String getName() {
        return "PaymentModule";
    }

    @ReactMethod
    public void startPayment() {
        Log.i(TAG, "Call startPayment");

        Handler handler = new Handler(this.getReactApplicationContext().getMainLooper());

        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                doCreditPaymentBuyerInstallments(30000, 1);
            }
        }, 100);
    }

    public void doCreditPaymentBuyerInstallments(int value, int installments) {
        Log.i(TAG, "Call doCreditPaymentBuyerInstallments");

        setEventListener();
        PlugPagTransactionResult plugPagTransactionResult = doPayment(new PlugPagPaymentData(
                TYPE_CREDITO,
                value,
                INSTALLMENT_TYPE_A_VISTA,
                installments,
                USER_REFERENCE,
                false
        ));

        Log.i(TAG, "return payment" + plugPagTransactionResult.getResult());
    }

    private PlugPagTransactionResult doPayment(final PlugPagPaymentData paymentData) {
       mPlugPagPaymentData = paymentData;

        Log.i(TAG, "Call doPayment" + paymentData.toString());

        PlugPagTransactionResult plugPagTransactionResult = mPlugPag.doPayment(paymentDataPayload);

        Log.i(TAG, "Call doPayment" + plugPagTransactionResult.getMessage());

        return plugPagTransactionResult;
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    private void setEventListener() {
        mPlugPag.setEventListener(plugPagEventData -> {
            Log.i(TAG, "code: " + plugPagEventData.getEventCode());
            Log.i(TAG, "message: " + plugPagEventData.getCustomMessage());

            WritableMap params = Arguments.createMap();
            params.putString("message", plugPagEventData.getCustomMessage());
            params.putString("code", String.valueOf(plugPagEventData.getEventCode()));

            sendEvent(reactContext, "statusPayment", params);
        });
    }
}
