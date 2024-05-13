import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchInvoices } from '@/components/features/invoices/invoiceSlice';
import store, { RootState } from '@/app/store';
import Navbar from '@/components/NavBar';
import HalfNavBar from '@/components/HalfNavBar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import SideBarUser from '@/components/SideBarUser';


export type AppDispatch = typeof store.dispatch

const InvoiceHistoryPage = () => {
    
  const dispatch = useDispatch<AppDispatch>();
  const invoices = useSelector((state: RootState) => state.invoiceHistory.invoices);
  const loading = useSelector((state: RootState) => state.invoiceHistory.loading);
  const error = useSelector((state: RootState) => state.invoiceHistory.error);

  useEffect(() => {
    dispatch(fetchInvoices(3));
  }, [dispatch]);

  useEffect(() => {
  }, [invoices]);

  if (loading) {
    return <div>Loading@.</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (

    <div className="flex flex-col min-h-screen">
      <Navbar/>

      <div className="flex-grow bg-mapi-neutral-3 ">
        <div className="mt-3 flex space-x-2">
          <SideBarUser/>
          <div className="bg-gradient-to-l from-mapi-neutral-3 to-white/5 rounded-lg shadow-lg p-8 w-11/12 border border-x-corner-1-300 space-y-4 " style={{ height: '500px', marginRight: '60px'}}>
            <h1 className="font-inter font-bold text-secondary-gray">Transaction History</h1>



            {/*The DataTable */}
            <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full ">
        <thead className="border-b-2 border-corner-1-300 bg-mapi-neutral-2 ">
          <tr>
            <th className='px-4 py-2  text-mapi-neutral-5 text-opacity-85 text-sm text-left  '>API Name</th>
            <th className="px-4 py-2  text-mapi-neutral-5 text-opacity-85 text-sm text-left">Plan Name</th>
            <th className="px-4 py-2  text-mapi-neutral-5 text-opacity-85 text-sm text-left">Created At</th>
            <th className="px-4 py-2  text-mapi-neutral-5 text-opacity-85 text-sm text-left">Monthly statement</th>

          </tr>
        </thead>
        <tbody className="shadow-xl border-b-2 border-corner-1-300 space-y-5 bg-mapi-neutral-2 bg-opacity-40 ">
          {invoices.map(invoice => (
            <tr key={invoice.id} className="text-mapi-neutral-5"> {/* Make sure to add a unique key for each row */}
             <td className='px-4 py-2  text-mapi-neutral-5 text-opacity-85 text-sm text-left  '>{invoice.apiName}</td>
              <td className='px-4 py-2  text-mapi-neutral-5 text-opacity-85 text-sm text-left  '>{invoice.planName}</td>
              <td className='px-4 py-2  text-mapi-neutral-5 text-opacity-85 text-sm text-left  '>{invoice.createdAt}</td>
              <td className="px-4 py-2 text-xs text-secondary-blue">
                <Link to={`/Transaction_details/${invoice.id}`}>
                  <button>View details</button>
                </Link>
              </td>
            </tr>
          ))}
      
        </tbody>
          
        </table>
      </div>


          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  );
};

export default InvoiceHistoryPage;