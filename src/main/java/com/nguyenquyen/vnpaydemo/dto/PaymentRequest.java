package com.nguyenquyen.vnpaydemo.dto;

public class PaymentRequest {
    private int amount;
    private String orderInfo;
    private String baseUrl;

    public PaymentRequest() {
    }

    public PaymentRequest(int amount, String orderInfo, String baseUrl) {
        this.amount = amount;
        this.orderInfo = orderInfo;
        this.baseUrl = baseUrl;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getOrderInfo() {
        return orderInfo;
    }

    public void setOrderInfo(String orderInfo) {
        this.orderInfo = orderInfo;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }
}
