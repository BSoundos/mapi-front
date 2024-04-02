import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchInvoices } from './slices/invoiceSlice';
import store, { RootState } from '../store'; 
import Navbar from './NavBar';
import Footer from './Footer';


export type AppDispatch = typeof store.dispatch

const InvoiceHistoryPage = () => {
    
  const dispatch = useDispatch<AppDispatch>();
  const invoices = useSelector((state: RootState) => state.invoice.invoices);
  const loading = useSelector((state: RootState) => state.invoice.loading);
  const error = useSelector((state: RootState) => state.invoice.error);

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div >
      <Navbar/>
      
      <Footer/>
    </div>
  );
};

export default InvoiceHistoryPage;
