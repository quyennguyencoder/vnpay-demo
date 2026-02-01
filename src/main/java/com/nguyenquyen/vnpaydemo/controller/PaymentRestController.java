package com.nguyenquyen.vnpaydemo.controller;

import com.nguyenquyen.vnpaydemo.dto.PaymentRequest;
import com.nguyenquyen.vnpaydemo.dto.PaymentResponse;
import com.nguyenquyen.vnpaydemo.service.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Cho phép CORS từ React app
public class PaymentRestController {

    @Autowired
    private VNPayService vnPayService;

    // Endpoint nhận JSON body
    @PostMapping("/create-payment")
    public ResponseEntity<?> createPayment(@RequestBody PaymentRequest paymentRequest) {
        try {
            String baseUrl = paymentRequest.getBaseUrl();

            // Nếu không có baseUrl từ frontend, sử dụng giá trị mặc định
            if (baseUrl == null || baseUrl.isEmpty()) {
                baseUrl = "http://localhost:8080";
            }

            String vnpayUrl = vnPayService.createOrder(
                paymentRequest.getAmount(),
                paymentRequest.getOrderInfo(),
                baseUrl
            );

            PaymentResponse response = new PaymentResponse();
            response.setCode("00");
            response.setMessage("success");
            response.setPaymentUrl(vnpayUrl);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            PaymentResponse errorResponse = new PaymentResponse();
            errorResponse.setCode("99");
            errorResponse.setMessage("Failed to create payment: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // Endpoint nhận form data (cho tương thích với form submit)
    @PostMapping("/create-payment-form")
    public ResponseEntity<?> createPaymentForm(
            @RequestParam("amount") int orderTotal,
            @RequestParam("orderInfo") String orderInfo,
            @RequestParam(value = "baseUrl", required = false) String baseUrl) {

        try {
            // Nếu không có baseUrl từ frontend, sử dụng giá trị mặc định
            if (baseUrl == null || baseUrl.isEmpty()) {
                baseUrl = "http://localhost:8080";
            }

            String vnpayUrl = vnPayService.createOrder(orderTotal, orderInfo, baseUrl);

            Map<String, Object> response = new HashMap<>();
            response.put("code", "00");
            response.put("message", "success");
            response.put("paymentUrl", vnpayUrl);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("code", "99");
            errorResponse.put("message", "Failed to create payment: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/payment-callback")
    public ResponseEntity<?> paymentCallback(HttpServletRequest request) {
        try {
            int paymentStatus = vnPayService.orderReturn(request);

            String orderInfo = request.getParameter("vnp_OrderInfo");
            String paymentTime = request.getParameter("vnp_PayDate");
            String transactionId = request.getParameter("vnp_TransactionNo");
            String totalPrice = request.getParameter("vnp_Amount");

            Map<String, Object> response = new HashMap<>();
            response.put("orderId", orderInfo);
            response.put("totalPrice", totalPrice);
            response.put("paymentTime", paymentTime);
            response.put("transactionId", transactionId);

            if (paymentStatus == 1) {
                response.put("code", "00");
                response.put("message", "Payment successful");
                response.put("status", "success");
            } else if (paymentStatus == 0) {
                response.put("code", "01");
                response.put("message", "Payment failed");
                response.put("status", "failed");
            } else {
                response.put("code", "02");
                response.put("message", "Invalid signature");
                response.put("status", "error");
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("code", "99");
            errorResponse.put("message", "Error processing callback: " + e.getMessage());
            errorResponse.put("status", "error");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/payment-info")
    public ResponseEntity<?> getPaymentInfo(
            @RequestParam("orderId") String orderId,
            @RequestParam("transactionId") String transactionId) {

        // Endpoint này có thể được mở rộng để query thông tin thanh toán từ database
        Map<String, Object> response = new HashMap<>();
        response.put("code", "00");
        response.put("message", "Query successful");
        response.put("orderId", orderId);
        response.put("transactionId", transactionId);

        return ResponseEntity.ok(response);
    }
}
