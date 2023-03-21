package com.app.pagseguro;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Typeface;
import android.text.Layout;
import android.text.StaticLayout;
import android.text.TextPaint;

import java.io.ByteArrayOutputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CreateTicket {
    private final int WIDTH = 300;
    private final int HEIGHT = 460;
    private final int TEXT_SIZE_DEFAULT = 12;
    private final int TEXT_SIZE_TITLE = 15;
    public byte[] create(Ticket ticket, Integer amounttickets, String versionName, String appName) throws Exception{
        try {
            TextPaint tpDefault = new TextPaint(TextPaint.ANTI_ALIAS_FLAG);
            tpDefault.setColor(Color.BLACK);
            tpDefault.setTextSize(TEXT_SIZE_DEFAULT);
            tpDefault.setTypeface(Typeface.create("Arial", Typeface.BOLD));

            TextPaint tpTitle = new TextPaint(TextPaint.ANTI_ALIAS_FLAG);
            tpTitle.setColor(Color.BLACK);
            tpTitle.setTextSize(TEXT_SIZE_TITLE);
            tpTitle.setTypeface(Typeface.create("Arial", Typeface.BOLD));

            Bitmap bmp = Bitmap.createBitmap(WIDTH, HEIGHT, Bitmap.Config.ARGB_8888);
            Canvas canvas = new Canvas(bmp);

            StaticLayout description = createStaticLayout("Essa Impressão não é responsabilidade da PagSeguro", tpDefault);
            description.draw(canvas);
            canvas.translate(0, 35);

            StaticLayout date = createStaticLayout(mountDateText(ticket.getDate(), appName, versionName), tpDefault);
            date.draw(canvas);
            canvas.translate(0, 13);

            StaticLayout transaction = createStaticLayout(ticket.getTransactionId(), tpDefault);
            transaction.draw(canvas);
            canvas.translate(0, 13);

            QrCode qrCode = new QrCode();
            Bitmap bitmap = qrCode.create(ticket.getQrCodeEncrypted());
            canvas.drawBitmap(bitmap, 50, 0, null);

            canvas.translate(0, 190);
            StaticLayout posName = createStaticLayout(ticket.getPosName(), tpTitle);
            posName.draw(canvas);
            canvas.translate(0, 16);

            if (ticket.getTicketId() != null && ticket.getTicketId().trim().length() > 0) {
                StaticLayout ticketName = createStaticLayout(ticket.getTicketName(), tpTitle);
                ticketName.draw(canvas);
                canvas.translate(0, 30);
            } else if (ticket.getProductId() != null && ticket.getProductId().trim().length() > 0) {
                StaticLayout productName = createStaticLayout(ticket.getProductName(), tpTitle);
                productName.draw(canvas);
                canvas.translate(0, 30);
            } else if (ticket.getComboId() != null && ticket.getComboId().trim().length() > 0) {
                StaticLayout comboName = createStaticLayout(ticket.getProductName(), tpTitle);
                comboName.draw(canvas);
                canvas.translate(0, 30);
            }

            DecimalFormat df = new DecimalFormat("#,###,##0.00");
            String valueString = "Valor: R$ " + df.format(ticket.getUnitValue());
            StaticLayout value = createStaticLayout(valueString, tpDefault);
            value.draw(canvas);
            canvas.translate(0, 13);

            String feeString = "Taxas: R$ " + df.format(ticket.getUnitValue().multiply(ticket.getFee()).subtract(ticket.getUnitValue()));
            StaticLayout fee = createStaticLayout(feeString, tpDefault);
            fee.draw(canvas);
            canvas.translate(0, 13);

            String totalString = "Total: R$ " + df.format(ticket.getUnitValue().multiply(ticket.getFee()));
            StaticLayout total = createStaticLayout(totalString, tpDefault);
            total.draw(canvas);
            canvas.translate(0, 25);

            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            String eventDateString = "Inicio: " + sdf.format(ticket.getEventDate());
            StaticLayout eventDate = createStaticLayout(eventDateString, tpDefault);
            eventDate.draw(canvas);
            canvas.translate(0, 13);

            StaticLayout place = createStaticLayout("Local: " + ticket.getEventPlace(), tpDefault);
            place.draw(canvas);
            canvas.translate(0, 13);

            String cityAndState = "Cidade: " + ticket.getEventCity() + "/" + ticket.getEventUF();
            StaticLayout city = createStaticLayout(cityAndState, tpDefault);
            city.draw(canvas);
            canvas.translate(0, 13);

            StaticLayout payment = createStaticLayout("Pagamento: " + toPosPaymentType(ticket.getPaymentType()), tpDefault);
            payment.draw(canvas);
            canvas.translate(0, 30);

            StaticLayout sequence = createStaticLayout( ticket.getSequence() + "/" + amounttickets, tpDefault);
            sequence.draw(canvas);
            canvas.translate(0, 30);

            StaticLayout cutHere = createStaticLayout( "- - - - - - - - - - - - - RECORTE AQUI - - - - - - - - - - - - - ", tpDefault);
            cutHere.draw(canvas);

            ByteArrayOutputStream stream = new ByteArrayOutputStream();
            bmp.compress(Bitmap.CompressFormat.PNG, 100, stream);
            byte[] image = stream.toByteArray();
            return  image;
        } catch (Exception e) {
            throw e;
        }
    }

    private StaticLayout createStaticLayout(String content, TextPaint tp) {
        StaticLayout sl = StaticLayout.Builder.obtain(content , 0, content.length(), tp , WIDTH)
                .setAlignment(Layout.Alignment.ALIGN_CENTER)
                .build();
        return sl;
    }

    private String mountDateText(Date date, String appName, String appVersion) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        String s = sdf.format(date) + " - " + appName + " - " + appVersion;
        return s;
    }

    private String toPosPaymentType(Integer value) {
        String paymentType = "";
        switch (value) {
            case 0:
                paymentType = "Dinheiro";
                break;
            case 1:
                paymentType = "Cartão de Crédito";
                break;
            case 2:
                paymentType = "Cartão de Débido";
                break;
            case 5:
                paymentType = "PIX";
                break;
            default:
                paymentType = "";
                break;
        }
        return paymentType;
    }
}