import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PaymentForm from './components/PaymentForm';
import PaymentResult from './components/PaymentResult';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/vnpay-payment" element={<PaymentResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
