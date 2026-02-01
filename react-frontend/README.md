# VNPay React Frontend

React application để tích hợp thanh toán VNPay với Spring Boot backend.

## Công nghệ sử dụng

- **React 19** - UI framework
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **CSS3** - Styling

## Cài đặt

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình environment

Copy file `.env.example` thành `.env`:

```bash
cp .env.example .env
```

### 3. Chạy ứng dụng

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

## Cấu trúc dự án

```
src/
├── components/          # React components
│   ├── Home.jsx        # Trang chủ
│   ├── PaymentForm.jsx # Form thanh toán
│   └── PaymentResult.jsx # Kết quả thanh toán
├── services/           # API services
│   └── paymentService.js
├── config/            # Configuration
│   └── api.js
└── App.jsx           # Main App
```

## Tính năng

1. **Trang chủ** - Hiển thị gói dịch vụ và tạo thanh toán
2. **Form thanh toán** - Nhập thông tin và thanh toán
3. **Kết quả thanh toán** - Hiển thị kết quả từ VNPay

## API Endpoints

- `POST /api/create-payment` - Tạo thanh toán
- `GET /api/payment-callback` - Xử lý callback từ VNPay

## Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run preview` - Preview production build
