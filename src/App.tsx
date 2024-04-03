import './App.css'
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Invoices from './components/InvoicesHistory';
import InvoiceDetails from './components/InvoiceDetails';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Transaction_history" element={<Invoices />} />
        <Route path="/Transaction_details" element={<InvoiceDetails />} />
      </Routes>
    </Router>
  );
};

export default App
