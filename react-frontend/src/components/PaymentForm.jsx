import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import paymentService from '../services/paymentService';
import './PaymentForm.css';

const PaymentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    amount: '',
    orderInfo: '',
  });

  // Load data from navigation state if available
  useEffect(() => {
    if (location.state) {
      setFormData({
        amount: location.state.amount || '',
        orderInfo: location.state.orderInfo || '',
      });
    }
  }, [location.state]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate
      if (!formData.amount || formData.amount <= 0) {
        setError('Vui lòng nhập số tiền hợp lệ');
        setLoading(false);
        return;
      }

      if (!formData.orderInfo.trim()) {
        setError('Vui lòng nhập thông tin đơn hàng');
        setLoading(false);
        return;
      }

      // Call API to create payment
      const response = await paymentService.createPayment(
        parseInt(formData.amount),
        formData.orderInfo,
        window.location.origin
      );

      if (response.code === '00') {
        // Redirect to VNPay payment page
        window.location.href = response.paymentUrl;
      } else {
        setError(response.message || 'Có lỗi xảy ra khi tạo thanh toán');
        setLoading(false);
      }
    } catch (err) {
      setError('Không thể kết nối đến server. Vui lòng thử lại sau.');
      setLoading(false);
      console.error('Payment error:', err);
    }
  };

  return (
    <div className="payment-form-container">
      <div className="payment-form-card">
        <h2 className="payment-form-title">Thanh Toán VNPay</h2>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="amount">Số tiền (VNĐ)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Nhập số tiền"
              min="1000"
              step="1000"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="orderInfo">Thông tin đơn hàng</label>
            <textarea
              id="orderInfo"
              name="orderInfo"
              value={formData.orderInfo}
              onChange={handleChange}
              placeholder="Nhập mô tả đơn hàng"
              rows="4"
              required
              disabled={loading}
            />
          </div>

          <div className="button-group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Quay lại
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Thanh toán'}
            </button>
          </div>
        </form>

        <div className="payment-info">
          <h3>Thông tin thanh toán</h3>
          <ul>
            <li>Cổng thanh toán: VNPay</li>
            <li>Thời gian hiệu lực: 15 phút</li>
            <li>Phương thức: Thẻ ATM, Visa, MasterCard, QR Code</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
