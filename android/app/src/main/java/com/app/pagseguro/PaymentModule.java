package com.app.pagseguro;

import android.os.Handler;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
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

        mPlugPag = new PlugPag(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "PaymentModule";
    }

    @ReactMethod
    public void startPaymentEventListener() {
        setEventListener();
    }

    @ReactMethod
    public void startPayment(Promise promise) {
        Log.i(TAG, "Call startPayment");

//        Handler handler = new Handler(getReactApplicationContext().getMainLooper());
//
//        handler.postDelayed(new Runnable() {
//            @Override
//            public void run() {

                try {
                    PlugPagTransactionResult result = doCreditPaymentBuyerInstallments(30000, 1);

                    promise.resolve(result.getMessage());
                } catch (Exception e) {
                    promise.reject(e.getMessage());
                }
//            }
//        }, 500);
    }

    public PlugPagTransactionResult doCreditPaymentBuyerInstallments(int value, int installments) {
        Log.i(TAG, "Call doCreditPaymentBuyerInstallments");

        return doPayment(new PlugPagPaymentData(
                TYPE_CREDITO,
                value,
                INSTALLMENT_TYPE_A_VISTA,
                installments,
                USER_REFERENCE,
                false
        ));
    }

    private PlugPagTransactionResult doPayment(final PlugPagPaymentData paymentData) {
        mPlugPagPaymentData = paymentData;

        PlugPagTransactionResult plugPagTransactionResult = mPlugPag.doPayment(paymentData);

        Log.i(TAG, "Call doPayment: " + plugPagTransactionResult.getMessage());

        return plugPagTransactionResult;
    }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        Log.i(TAG, "params: " + params.toString());

        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    private void setEventListener() {
        mPlugPag.setEventListener(plugPagEventData -> {
            WritableMap params = Arguments.createMap();
            params.putString("message", plugPagEventData.getCustomMessage());
            params.putString("code", String.valueOf(plugPagEventData.getEventCode()));

            if(plugPagEventData.getEventCode() != 0){
                sendEvent("statusPayment", params);
            }
        });
    }
}
