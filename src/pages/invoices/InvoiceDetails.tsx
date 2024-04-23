import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchInvoices } from '../../components/slices/invoiceSlice';
import store, { RootState } from '../../app/store';
import Navbar from '../../components/NavBar';
import HalfNavBar from '../../components/HalfNavBar';
import Footer from '../../components/Footer';



export type AppDispatch = typeof store.dispatch

const InvoiceDetailsPage = () => {

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
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow bg-mapi-neutral-3 ">
        <div className="mt-3 flex space-x-2">
          <HalfNavBar />
          <div className="bg-gradient-to-l from-mapi-neutral-3 to-white/5 rounded-lg shadow-lg p-8 w-11/12 border border-x-corner-1-300 space-y-4 " style={{ height: '500px', marginRight: '60px' }}>
            <h1 className="font-inter font-bold text-secondary-gray">Transaction History</h1>

            <p className="pt-6 text-xs text-mapi-neutral-5">Transaction Number: FD6567</p>
            <p className=" text-xs text-mapi-neutral-5">Payment Method: CIB</p>
            <p className=" text-xs text-mapi-neutral-5">Date of Creation: 15-02-2023</p>
            <p className="pb-6 text-xs text-mapi-neutral-5">Client's Full Name: John Doe</p>


            {/*The DataTable */}
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full ">
                <thead className="border-b-2 border-corner-1-300 bg-mapi-neutral-2 ">
                  <tr>
                    <th className='px-4 py-2  text-mapi-neutral-5 text-opacity-85 text-sm text-left  '>Description</th>
                    <th className="px-4 py-2  text-mapi-neutral-5 text-opacity-85 text-sm text-left">Amount</th>
                    <th className="px-4 py-2  text-mapi-neutral-5 text-opacity-85 text-sm text-left">Discount</th>
                    <th className="px-4 py-2  text-mapi-neutral-5 text-opacity-85 text-sm text-left">Total</th>

                  </tr>
                </thead>
                <tbody className="shadow-xl border-b-2 border-corner-1-300 space-y-5 bg-mapi-neutral-2 bg-opacity-40 ">
                  <tr>

                    <td className='px-4 py-2 text-xs text-mapi-neutral-5 '>A service that provides access to weather-related data and functionalities to developers and businesses. <br />It typically offers a range of weather-related information such as current conditions, forecasts, historical data, and more.</td>
                    <td className="px-4 py-2 text-xs text-mapi-neutral-5 ">500</td>
                    <td className="px-4 py-2 text-xs text-mapi-neutral-5 ">0%</td>
                    <td className="px-4 py-2 text-xs text-mapi-neutral-5 ">500 DA</td>
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

      <Footer />
    </div>
  );
};

export default InvoiceDetailsPage;




