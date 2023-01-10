package com.app.pagseguro;

import android.util.Log;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPag;
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagNFCResult;
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagNearFieldCardData;
import br.com.uol.pagseguro.plugpagservice.wrapper.data.request.PlugPagBeepData;
import br.com.uol.pagseguro.plugpagservice.wrapper.data.request.PlugPagLedData;
import br.com.uol.pagseguro.plugpagservice.wrapper.exception.PlugPagException;

import static com.app.pagseguro.Constants.BEEP_FAIL;
import static com.app.pagseguro.Constants.NFC_OK;
import static com.app.pagseguro.Constants.CARD_NOT_FOUND;
import static com.app.pagseguro.Constants.LED_FAIL;
import static com.app.pagseguro.Constants.NFC_START_FAIL;
import static com.app.pagseguro.Constants.LED_ON_SUCCESS;
import static com.app.pagseguro.Constants.LED_OFF_SUCCESS;

public class NFCModule extends ReactContextBaseJavaModule {
    PlugPag mPlugPag;

    public NFCModule(ReactApplicationContext context) {
        super(context);

        mPlugPag = new PlugPag(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "NFCModule";
    }

    @ReactMethod
    public Integer beepNFC() {
        int result = mPlugPag.beep(new PlugPagBeepData(
                PlugPagBeepData.FREQUENCE_LEVEL_1, 500)
        );

        if (result == NFC_OK) {
            Log.d("NFCModule", "event called beep NFC: " + result);
        } else {
            new PlugPagException(BEEP_FAIL);
        }

        return result;
    }

    @ReactMethod
    public void readNFCCard(Promise promise) {
        try {
            PlugPagNearFieldCardData cardData = new PlugPagNearFieldCardData();

            cardData.setStartSlot(28);
            cardData.setEndSlot(28);

            PlugPagNFCResult result = mPlugPag.readFromNFCCard(cardData);

            Log.d("NFCModule", "a result related read card: " + result.getResult());

            if (result.getResult() == NFC_OK) {
                Log.d("NFCModule", "success read card: " + result.hashCode() + " - ");
            } else {
                new PlugPagException(CARD_NOT_FOUND + result.getResult());
            }

            promise.resolve(result.hashCode());
        } catch (Exception e) {
            promise.reject(e.getMessage());
        }
    }

    public Integer setLedNFC(Byte ledColor) {
        int result = mPlugPag.setLed(new PlugPagLedData(ledColor));

        if (result == NFC_OK) {
            Log.d("NFCModule", "event called led NFC: " + result);
        } else {
            new PlugPagException(LED_FAIL);
        }

        return result;
    }
}