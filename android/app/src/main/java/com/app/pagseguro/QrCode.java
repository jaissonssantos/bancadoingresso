package com.app.pagseguro;

import android.graphics.Bitmap;
import android.graphics.Color;

import androidmads.library.qrgenearator.QRGContents;
import androidmads.library.qrgenearator.QRGEncoder;

public class QrCode {
    public Bitmap create(String content) {
        QRGEncoder qrgEncoder = new QRGEncoder(content, null, QRGContents.Type.TEXT, 300);
        qrgEncoder.setColorBlack(Color.TRANSPARENT);
        qrgEncoder.setColorWhite(Color.BLACK);
        Bitmap bitmap = qrgEncoder.getBitmap();
        return bitmap;
    }
}