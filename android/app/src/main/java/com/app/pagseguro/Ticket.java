package com.app.pagseguro;

import java.math.BigDecimal;
import java.util.Date;

public class Ticket {
    private Date date;
    private String transactionId;
    private String eventId;
    private String eventName;
    private String ticketId;
    private String ticketName;
    private Boolean halfPrice;
    private String productId;
    private String productName;
    private String comboId;
    private String comboName;
    private String qrCodeEncrypted;
    private String pdvName;
    private String posName;
    private BigDecimal unitValue;
    private BigDecimal fee;
    private BigDecimal totalValue;
    private Date eventDate;
    private String eventPlace;
    private String eventCity;
    private String eventUF;
    private Integer paymentType;
    private Integer sequence;

    public Ticket () {

    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getTicketId() {
        return ticketId;
    }

    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }

    public String getTicketName() {
        return ticketName;
    }

    public void setTicketName(String ticketName) {
        this.ticketName = ticketName;
    }

    public Boolean getHalfPrice() {
        return halfPrice;
    }

    public void setHalfPrice(Boolean halfPrice) {
        this.halfPrice = halfPrice;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getComboId() {
        return comboId;
    }

    public void setComboId(String comboId) {
        this.comboId = comboId;
    }

    public String getComboName() {
        return comboName;
    }

    public void setComboName(String comboName) {
        this.comboName = comboName;
    }

    public String getQrCodeEncrypted() {
        return qrCodeEncrypted;
    }

    public void setQrCodeEncrypted(String qrCodeEncrypted) {
        this.qrCodeEncrypted = qrCodeEncrypted;
    }

    public String getPdvName() {
        return pdvName;
    }

    public void setPdvName(String pdvName) {
        this.pdvName = pdvName;
    }

    public String getPosName() {
        return posName;
    }

    public void setPosName(String posName) {
        this.posName = posName;
    }

    public BigDecimal getUnitValue() {
        return unitValue;
    }

    public void setUnitValue(BigDecimal unitValue) {
        this.unitValue = unitValue;
    }

    public BigDecimal getFee() {
        return fee;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
    }

    public BigDecimal getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(BigDecimal totalValue) {
        this.totalValue = totalValue;
    }

    public Date getEventDate() {
        return eventDate;
    }

    public void setEventDate(Date eventDate) {
        this.eventDate = eventDate;
    }

    public String getEventPlace() {
        return eventPlace;
    }

    public void setEventPlace(String eventPlace) {
        this.eventPlace = eventPlace;
    }

    public String getEventCity() {
        return eventCity;
    }

    public void setEventCity(String eventCity) {
        this.eventCity = eventCity;
    }

    public String getEventUF() {
        return eventUF;
    }

    public void setEventUF(String eventUF) {
        this.eventUF = eventUF;
    }

    public Integer getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(Integer paymentType) {
        this.paymentType = paymentType;
    }

    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }
}
