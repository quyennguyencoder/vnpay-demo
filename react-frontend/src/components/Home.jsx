import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const sampleOrders = [
    { id: 1, name: 'Gói cơ bản', price: 100000, description: 'Gói dịch vụ cơ bản' },
    { id: 2, name: 'Gói nâng cao', price: 250000, description: 'Gói dịch vụ nâng cao' },
    { id: 3, name: 'Gói premium', price: 500000, description: 'Gói dịch vụ cao cấp' },
  ];

  const handlePayment = (order) => {
    navigate('/payment', {
      state: {
        amount: order.price,
        orderInfo: `${order.name} - ${order.description}`
      }
    });
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>VNPay Payment Demo</h1>
        <p>Tích hợp thanh toán VNPay với React & Spring Boot</p>
      </div>

      <div className="orders-grid">
        {sampleOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h3>{order.name}</h3>
              <div className="price-tag">
                {order.price.toLocaleString('vi-VN')} VNĐ
              </div>
            </div>
            <p className="order-description">{order.description}</p>
            <button
              className="btn btn-pay"
              onClick={() => handlePayment(order)}
            >
              Thanh toán ngay
            </button>
          </div>
        ))}
      </div>

      <div className="custom-payment-section">
        <h2>Hoặc tạo thanh toán tùy chỉnh</h2>
        <button
          className="btn btn-custom"
          onClick={() => navigate('/payment')}
        >
          Tạo thanh toán
        </button>
      </div>

      <div className="info-section">
        <h3>Thông tin thanh toán</h3>
        <div className="info-grid">
          <div className="info-item">
            <div className="info-icon">🔒</div>
            <h4>Bảo mật</h4>
            <p>Giao dịch được mã hóa SSL</p>
          </div>
          <div className="info-item">
            <div className="info-icon">⚡</div>
            <h4>Nhanh chóng</h4>
            <p>Xử lý thanh toán tức thì</p>
          </div>
          <div className="info-item">
            <div className="info-icon">💳</div>
            <h4>Đa dạng</h4>
            <p>ATM, Visa, MasterCard, QR</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
