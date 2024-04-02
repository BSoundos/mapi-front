import './App.css'
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Invoice from './components/InvoiceComponent';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Invoice />} />
      </Routes>
    </Router>
  );
};

export default App
