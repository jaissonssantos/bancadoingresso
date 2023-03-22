package com.app.pagseguro;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Environment;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;

import com.app.BuildConfig;
import com.app.MainActivity;
import com.app.R;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.jetbrains.annotations.NotNull;

import java.io.File;
import java.io.FileOutputStream;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPag;
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagPrintResult;
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagPrinterData;
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagPrinterListener;

public class PrintModule extends ReactContextBaseJavaModule {
    private final ReactContext reactContext;
    private final PlugPag mPlugPag;
    private final String TAG = "PrintModule";

    public PrintModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        mPlugPag = new PlugPag(context);
        Log.i(TAG, "mPlugPag: " + mPlugPag);
    }

    @NonNull
    @Override
    public String getName() {
        return TAG;
    }

    @ReactMethod
    public void startPrint(ReadableArray array, Integer ticketSequence) {
        CreateTicket createTicket = new CreateTicket();
        String versionName = BuildConfig.VERSION_NAME;
        String appName = getReactApplicationContext().getString(R.string.app_name);
        String imagePath = Environment.getExternalStorageDirectory().getAbsolutePath() + "/file.png";
        File file = new File(imagePath);
        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (Exception e) {
                Log.e(TAG, e.getMessage());
                PlugPagPrintResult result = new PlugPagPrintResult(-1, e.getMessage(), e.getMessage(), ticketSequence);
                sendEvent("eventErrorPrint", createObjectToEventSuccessPrint(result, ticketSequence));
            }
        }
        try {
            List<Ticket> list = fromReadableArray(array);
            for (Ticket ticket: list) {
                if (ticket.getSequence() >= ticketSequence) {
                    try {
                        byte[] image = createTicket.create(ticket, list.size(), versionName, appName);
                        FileOutputStream stream = new FileOutputStream(imagePath);
                        stream.write(image);
                        stream.close();
                        printOnPos(imagePath, ticket.getSequence());
                    } catch (Exception e) {
                        Log.e(TAG, e.getMessage());
                        PlugPagPrintResult result = new PlugPagPrintResult(-1, e.getMessage(), e.getMessage(), ticket.getSequence());
                        sendEvent("eventErrorPrint", createObjectToEventSuccessPrint(result, ticket.getSequence()));
                        break;
                    }
                }
            }
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
            PlugPagPrintResult result = new PlugPagPrintResult(-1, e.getMessage(), e.getMessage(), ticketSequence);
            sendEvent("eventErrorPrint", createObjectToEventSuccessPrint(result, ticketSequence));
        }
    }

    private List<Ticket> fromReadableArray(ReadableArray array) throws ParseException {
        List<Ticket> tickets = new ArrayList<Ticket>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for (int i = 0; i < array.size(); i++) {
            ReadableMap readableMap = array.getMap(i);
            HashMap<String, Object> map = readableMap.toHashMap();
            Ticket ticket = new Ticket();
            ticket.setDate(sdf.parse((String) map.get("date")));
            ticket.setTransactionId((String) map.get("transactionId"));
            ticket.setEventId((String) map.get("eventId"));
            ticket.setEventName((String) map.get("eventName"));
            if (map.containsKey("ticketId")) {
                ticket.setTicketId((String) map.get("ticketId"));
                ticket.setTicketName((String) map.get("ticketName"));
            }
            ticket.setHalfPrice((Boolean) map.get("halfPrice"));
            if (map.containsKey("productId")) {
                ticket.setProductId((String) map.get("productId"));
                ticket.setProductName((String) map.get("productName"));
            }
            if (map.containsKey("comboId")) {
                ticket.setComboId((String) map.get("comboId"));
                ticket.setComboName((String) map.get("comboName"));
            }
            ticket.setQrCodeEncrypted((String) map.get("qrCodeEncrypted"));
            ticket.setPdvName((String) map.get("pdvName"));
            ticket.setPosName((String) map.get("posName"));
            ticket.setUnitValue(new BigDecimal((Double) map.get("unitValue")));
            ticket.setFee(new BigDecimal((Double) map.get("fee")));
            //ticket.setTotalValue(new BigDecimal((Double) map.get("totalValue")));
            ticket.setEventDate(sdf.parse((String) map.get("eventDate")));
            ticket.setEventPlace((String) map.get("eventPlace"));
            ticket.setEventCity((String) map.get("eventCity"));
            ticket.setEventUF((String) map.get("eventUF"));
            Double paymentTypeDouble = (Double) map.get("paymentType");
            ticket.setPaymentType(paymentTypeDouble.intValue());
            Double sequence = (Double) map.get("sequence");
            ticket.setSequence(sequence.intValue());
            tickets.add(ticket);
        }
        return  tickets;
    }

    private void printOnPos(String imagePath, Integer sequence) {
        PlugPagPrinterData data = new PlugPagPrinterData(imagePath, 4,10 * 12);

        PlugPagPrinterListener listener = new PlugPagPrinterListener() {
            @Override
            public void onSuccess(@NonNull PlugPagPrintResult plugPagPrintResult) {
                sendEvent("eventSuccessPrint", createObjectToEventSuccessPrint(plugPagPrintResult, sequence));
                Log.i(TAG, "Print success: " + plugPagPrintResult.getMessage());
            }

            @Override
            public void onError(@NotNull PlugPagPrintResult plugPagPrintResult) {
                sendEvent("eventErrorPrint", createObjectToEventSuccessPrint(plugPagPrintResult, sequence));
                Log.i(TAG, "Print error: " + plugPagPrintResult.getMessage());
            }
        };

        mPlugPag.setPrinterListener(listener);
        PlugPagPrintResult result = mPlugPag.printFromFile(data);

        if (result.getResult() == PlugPag.RET_OK) {
            sendEvent("eventSuccessPrint", createObjectToEventSuccessPrint(result, sequence));
            Log.i(TAG, "Print success: " + result.getMessage());
        } else {
            sendEvent("eventErrorPrint", createObjectToEventSuccessPrint(result, sequence));
            Log.i(TAG, "Print error: " +  result.getMessage());
        }
    }

    private WritableMap createObjectToEventSuccessPrint(PlugPagPrintResult plugPagPrintResult, Integer sequence) {
        WritableMap params = Arguments.createMap();
        params.putString("errorCode", plugPagPrintResult.getErrorCode());
        params.putString("message", plugPagPrintResult.getMessage());
        params.putInt("result", plugPagPrintResult.getResult());
        params.putInt("steps", plugPagPrintResult.getSteps());
        params.putInt("sequence", sequence);
        return params;
    }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        Log.i(TAG, "sendEvent with params: " + params.toString());
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}