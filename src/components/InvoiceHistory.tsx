import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchInvoices } from '../components/slices/invoiceSlice';
import store, { RootState } from '../store'; 
import Navbar from './NavBar';


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
      
      <h1 className="text-2xl font-bold mb-4">Invoice History</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className='px-4 py-2 bg-gray-200 text-gray-600 border'>API Name</th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">Status</th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">Total Amount</th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">Plan Name</th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">Created At</th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">Monthly statement</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            
            <td className='px-4 py-2 border'>Weather API</td>
            <td className="px-4 py-2 border">PAID</td>
            <td className="px-4 py-2 border">500</td>
            <td className="px-4 py-2 border">Basic</td>
            <td className="px-4 py-2 border">15-01-2023</td>
            <td className="px-4 py-2 border"><button>Views details</button></td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Stock Market API</td>
            <td className="px-4 py-2 border">PAID</td>
            <td className="px-4 py-2 border">800</td>
            <td className="px-4 py-2 border">Pro</td>
            <td className="px-4 py-2 border">01-12-2022</td>
            <td><button>Views details</button></td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Payment Gateway API</td>
            <td className="px-4 py-2 border">PAID</td>
            <td className="px-4 py-2 border">3000</td>
            <td className="px-4 py-2 border">Starter</td>
            <td className="px-4 py-2 border">20-02-2023</td>
            <td><button>Views details</button></td>
          </tr>
          
        </tbody>
          {/*
          <tbody>
            {invoices.map(invoice => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.apiName}</td>
                <td>{invoice.status}</td>
                <td>{invoice.totalAmount}</td>
                <td>{invoice.planName}</td>
                <td>{invoice.createdAt}</td>
              </tr>
            ))}
          </tbody>
            */}
        </table>
      </div>
    </div>
  );
};

export default InvoiceHistoryPage;
