package com.nguyenquyen.vnpaydemo.dto;

public class PaymentCallbackResponse {
    private String code;
    private String message;
    private String status;
    private String orderId;
    private String totalPrice;
    private String paymentTime;
    private String transactionId;

    public PaymentCallbackResponse() {
    }

    public PaymentCallbackResponse(String code, String message, String status,
                                   String orderId, String totalPrice,
                                   String paymentTime, String transactionId) {
        this.code = code;
        this.message = message;
        this.status = status;
        this.orderId = orderId;
        this.totalPrice = totalPrice;
        this.paymentTime = paymentTime;
        this.transactionId = transactionId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(String totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getPaymentTime() {
        return paymentTime;
    }

    public void setPaymentTime(String paymentTime) {
        this.paymentTime = paymentTime;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
}
