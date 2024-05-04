import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchInvoices } from '../../components/features/invoices/invoiceSlice';
import store, { RootState } from '../../app/store';
import Navbar from '../../components/NavBar';
import HalfNavBar from '../../components/HalfNavBar';
import Footer from '../../components/Footer';
import { Link, useParams } from 'react-router-dom';
import { fetchSubscriptions } from '@/components/features/subscriptions/SubscriptionsListSlice';
import { FaCheck, FaTimes } from 'react-icons/fa';


export type AppDispatch = typeof store.dispatch

const SubscriptionListPage = () => {
    
  const dispatch = useDispatch<AppDispatch>();
  const subscriptions = useSelector((state: RootState) => state.subscriptions.subscriptions);
  const loading = useSelector((state: RootState) => state.subscriptions.loading);
  const error = useSelector((state: RootState) => state.subscriptions.error);
  useEffect(() => {
    dispatch(fetchSubscriptions());
    console.log(subscriptions)
  }, [dispatch]);

  useEffect(() => {
    console.log(loading);
  }, [subscriptions]);

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
          <div className="bg-gradient-to-l from-mapi-neutral-3 to-white/2 rounded-lg shadow-lg p-8 w-11/12 border border-x-corner-1-300 space-y-4 " style={{ height: '500px', marginRight: '60px'}}>
            <h1 className="font-inter font-bold text-secondary-gray text-xl text-plus-jakarta-sans">Subscription & Usage</h1>
            <p className="text-mapi-neutral-5 text-opacity-85 text-base">Monitor API subscription and team usage of your subscribed APIs.</p>
            {/*The DataTable */}
            <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full rounded-md">
  <thead className=" bg-mapi-neutral-2">
    <tr >
      <th className='px-4 py-6  text-mapi-neutral-5 text-opacity-85 text-base text-left text-plus-jakarta-sans rounded-l-md'>API Name</th>
      <th className="px-4 py-6  text-mapi-neutral-5 text-opacity-85 text-base text-left text-plus-jakarta-sans ">Plan Name</th>
      <th className="px-4 py-6  text-mapi-neutral-5 text-opacity-85 text-base text-left text-plus-jakarta-sans ">Date Subscribed</th>
      <th className="px-4 py-6  text-mapi-neutral-5 text-opacity-85 text-base text-left text-plus-jakarta-sans ">Quota usage</th>
      <th className="px-4 py-6  text-mapi-neutral-5 text-opacity-85 text-base text-left text-plus-jakarta-sans ">Status</th>
      <th className="px-4 py-2  text-mapi-neutral-5 text-opacity-85 text-base text-left text-plus-jakarta-sans rounded-r-md ">Actions</th>
    </tr>
  </thead>
  <tbody className="shadow-xl  space-y-5 bg-mapi-neutral-2 bg-opacity-40">
    {subscriptions.map((subscription, index) => (
      <tr key={subscription.subscription_id} className="text-mapi-neutral-5 ">
        <td className='px-4 py-6 text-opacity-85 text-base text-left text-plus-jakarta-sans rounded-l-md '>{subscription.api_name}</td>
        <td className='px-4 py-6 text-opacity-85 text-base text-left text-plus-jakarta-sans '>{subscription.subscription_plan.name}</td>
        <td className='px-4 py-6 text-opacity-85 text-base text-left text-plus-jakarta-sans '>{subscription.subscription_date}</td>
        <td className='px-4 py-6 text-opacity-85 text-base text-left text-plus-jakarta-sans '>{subscription.subscription_plan.rate_limit}</td>
        <td className='px-4 py-6 text-opacity-85 text-base text-left text-plus-jakarta-sans '>
          {subscription.access_key.status === 1 ? (
            <FaCheck style={{ color: 'green' }} />
          ) : (
            <FaTimes style={{ color: 'red' }} />
          )}
        </td>
        <td className="px-4 py-2 text-xs text-secondary-blue">
          <div className="flex space-x-4">
            <Link to={`/Transaction_details/${subscription.access_key.access_key_id}`}>
              <button className='text-mapi-neutral-5 text-base'>Go to API</button>
            </Link>
            <Link to={`/Transaction_details/${subscription.access_key.access_key_id}`}>
              <button className='text-mapi-neutral-5 text-base'>Unsubscribe</button>
            </Link>
            <Link to={`/Transaction_details/${subscription.access_key.access_key_id}`}>
              <button className='text-mapi-neutral-5 text-base'>Manage key</button>
            </Link>
          </div>
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

export default SubscriptionListPage;