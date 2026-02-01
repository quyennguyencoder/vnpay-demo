import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './PaymentResult.css';

const PaymentResult = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Parse VNPay callback parameters
    const params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }

    // Determine payment status
    const responseCode = params.vnp_ResponseCode;
    const transactionStatus = params.vnp_TransactionStatus;

    let status = 'error';
    let message = 'Thanh toán thất bại';

    if (responseCode === '00' && transactionStatus === '00') {
      status = 'success';
      message = 'Thanh toán thành công';
    } else if (responseCode === '24') {
      status = 'cancelled';
      message = 'Giao dịch bị hủy bởi người dùng';
    } else {
      status = 'failed';
      message = 'Thanh toán thất bại';
    }

    // Format payment data
    const data = {
      status,
      message,
      orderId: params.vnp_TxnRef,
      orderInfo: params.vnp_OrderInfo,
      amount: params.vnp_Amount ? (parseInt(params.vnp_Amount) / 100).toLocaleString('vi-VN') : '0',
      bankCode: params.vnp_BankCode,
      transactionNo: params.vnp_TransactionNo,
      payDate: params.vnp_PayDate,
      responseCode,
    };

    setPaymentData(data);
    setLoading(false);
  }, [searchParams]);

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="payment-result-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Đang xử lý kết quả thanh toán...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-result-container">
      <div className="payment-result-card">
        <div className={`result-icon ${paymentData.status}`}>
          {paymentData.status === 'success' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          )}
          {paymentData.status === 'failed' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          )}
          {paymentData.status === 'cancelled' && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          )}
        </div>

        <h2 className={`result-title ${paymentData.status}`}>{paymentData.message}</h2>

        <div className="payment-details">
          <div className="detail-row">
            <span className="detail-label">Mã giao dịch:</span>
            <span className="detail-value">{paymentData.orderId || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Thông tin đơn hàng:</span>
            <span className="detail-value">{paymentData.orderInfo || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Số tiền:</span>
            <span className="detail-value amount">{paymentData.amount} VNĐ</span>
          </div>
          {paymentData.transactionNo && (
            <div className="detail-row">
              <span className="detail-label">Mã giao dịch VNPay:</span>
              <span className="detail-value">{paymentData.transactionNo}</span>
            </div>
          )}
          {paymentData.bankCode && (
            <div className="detail-row">
              <span className="detail-label">Ngân hàng:</span>
              <span className="detail-value">{paymentData.bankCode}</span>
            </div>
          )}
          {paymentData.payDate && (
            <div className="detail-row">
              <span className="detail-label">Thời gian:</span>
              <span className="detail-value">{formatPayDate(paymentData.payDate)}</span>
            </div>
          )}
        </div>

        <button className="btn btn-home" onClick={handleBackToHome}>
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
};

// Helper function to format payment date
const formatPayDate = (dateString) => {
  if (!dateString || dateString.length !== 14) return dateString;

  // Format: YYYYMMDDHHmmss
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  const hour = dateString.substring(8, 10);
  const minute = dateString.substring(10, 12);
  const second = dateString.substring(12, 14);

  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
};

export default PaymentResult;
