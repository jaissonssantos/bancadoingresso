package com.app.pagseguro;

import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPag;
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagActivationData;
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagInitializationResult;
import br.com.uol.pagseguro.plugpagservice.wrapper.exception.PlugPagException;

public class AuthenticationModule extends ReactContextBaseJavaModule {
    private final PlugPag mPlugPag;
    private String TAG = "AuthenticationModule";

    public AuthenticationModule(ReactApplicationContext context) {
        super(context);

        mPlugPag = new PlugPag(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "AuthenticationModule";
    }

    @ReactMethod
    public void isAuthenticated(Promise promise) {
        try {
            Boolean isAuth = mPlugPag.isAuthenticated();

            WritableMap params = Arguments.createMap();
            params.putBoolean("enabled", isAuth);

            if(isAuth) {
                params.putString("id", String.valueOf(Build.ID));
                params.putString("terminalSerialNumber", String.valueOf(Build.SERIAL));
            } else {
                params.putNull("id");
                params.putNull("terminalSerialNumber");
            }

            Log.i(TAG, "serial number: " + String.valueOf(Build.SERIAL));

            promise.resolve(params);
        } catch (Exception e) {
            promise.reject(e.getMessage());
        }
    };

    @ReactMethod
    public void initializeAndActivatePinPad(String activationCode, Promise promise) {
        try {
            PlugPagInitializationResult result = mPlugPag.initializeAndActivatePinpad(new PlugPagActivationData(activationCode));

            if (result.getResult() == PlugPag.RET_OK) {
                Log.i(TAG, "Call initializeAndActivatePinPad success");
                promise.resolve(result.getResult());
            } else {
                promise.reject(new PlugPagException(result.getErrorMessage()));
            }
        } catch (Exception e) {
            promise.reject(e.getMessage());
        }
    }

    @ReactMethod
    public void deactivate(String activationCode, Promise promise) {
        try {
            PlugPagInitializationResult result = mPlugPag.deactivate(new PlugPagActivationData(activationCode));

            if (result.getResult() == PlugPag.RET_OK) {
                Log.i(TAG, "Call deactivate success");
                promise.resolve(result.getResult());
            } else {
                promise.reject(new PlugPagException(result.getErrorMessage()));
            }
        } catch (Exception e) {
            promise.reject(e.getMessage());
        }
    }
}
