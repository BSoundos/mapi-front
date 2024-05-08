import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchInvoices } from '@/components/features/invoices/invoiceSlice';
import store, { RootState } from '@/app/store';
import Navbar from '@/components/NavBar';
import HalfNavBar from '@/components/HalfNavBar';
import Footer from '@/components/Footer';
import { useParams } from 'react-router-dom';
import { fetchInvoiceDetail } from '@/components/features/invoices/invoiceDetailSlice';



export type AppDispatch = typeof store.dispatch

const InvoiceDetailsPage = () => {
    
  const dispatch = useDispatch<AppDispatch>();
  const invoiceDetail = useSelector((state: RootState) => state.invoiceDetail.invoiceD);
  const loading = useSelector((state: RootState) => state.invoiceDetail.loading);
  const error = useSelector((state: RootState) => state.invoiceDetail.error);
  const {id} = useParams(); // Extraire les paramètres dynamiques de l'URL

  useEffect(() => {
    dispatch(fetchInvoiceDetail(parseInt(id)));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>

      <div className="flex-grow bg-mapi-neutral-3 ">
        <div className="mt-3 flex space-x-2">
          <HalfNavBar/>
          <div className="bg-gradient-to-l from-mapi-neutral-3 to-white/5 rounded-lg shadow-lg p-8 w-11/12 border border-x-corner-1-300 space-y-4 " style={{ height: '500px', marginRight: '60px'}}>
            <h1 className="font-inter font-bold text-secondary-gray">Transaction History</h1>

            <p className="pt-6 text-xs text-mapi-neutral-5">Transaction Number: {invoiceDetail.trans_number}</p>

            <p className=" text-xs text-mapi-neutral-5">Date of Creation: {invoiceDetail.payment_date}</p>
            <p className="pb-6 text-xs text-mapi-neutral-5">Client's Full Name: {invoiceDetail.clientName}</p>


            {/*The DataTable */}
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full ">
              <thead className="border-b-2 border-corner-1-300 bg-mapi-neutral-2 ">
                <tr>
                <th className="px-4 py-2  text-mapi-neutral-5 text-opacity-85 text-sm text-left">API Name</th>
                  <th className='px-4 py-2  text-mapi-neutral-5 text-opacity-85 text-sm text-left  '>Description</th>
                  <th className="px-4 py-2  text-mapi-neutral-5 text-opacity-85 text-sm text-left">Amount</th>
                  
                  
                </tr>
              </thead>
              <tbody className="shadow-xl border-b-2 border-corner-1-300 space-y-5 bg-mapi-neutral-2 bg-opacity-40 ">
                <tr>
                  <td className="px-4 py-2 text-xs text-mapi-neutral-5 ">{invoiceDetail.apiName}</td>
                  <td className="px-4 py-2 text-xs text-mapi-neutral-5 ">{invoiceDetail.description}</td>
                  <td className="px-4 py-2 text-xs text-mapi-neutral-5 ">{invoiceDetail.amount} DA</td>
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
        </div>
      </div>
      
      <Footer/>
    </div>
  );
};

export default InvoiceDetailsPage;




