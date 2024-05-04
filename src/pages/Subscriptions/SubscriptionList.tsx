import { useState } from 'react';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSubscriptions } from '@/components/features/subscriptions/SubscriptionsListSlice';
import store, { RootState } from '../../app/store';
import Navbar from '../../components/NavBar';
import HalfNavBar from '../../components/HalfNavBar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import Popup from '../../components/AccessKeyPopup';
export type AppDispatch = typeof store.dispatch

const SubscriptionListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const subscriptions = useSelector((state: RootState) => state.subscriptions.subscriptions);
  const loading = useSelector((state: RootState) => state.subscriptions.loading);
  const error = useSelector((state: RootState) => state.subscriptions.error);
  const [selectedKey, setSelectedKey] = useState(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState<'all' | 'public' | 'private'>('all');

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  const handleManageKey = (keyInfo) => {
    setSelectedKey(keyInfo);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleClosePopup = () => {
    setSelectedKey(null);
  };

  const handleToggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedSubscriptions = [...subscriptions].sort((a, b) => {
    const dateA = new Date(a.subscription_date);
    const dateB = new Date(b.subscription_date);

    if (sortOrder === 'asc') {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  });

  const filteredSubscriptions = sortedSubscriptions.filter((subscription) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'public') {
      return !!subscription.subscription_plan;
    } else if (filter === 'private') {
      return !subscription.subscription_plan;
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


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
          <div className="p-8 w-11/12 space-y-4 flex flex-col bg-[#FFFFFF] bg-opacity-5 py-4 border border-opacity-30 border-[#7E89AC] rounded shadow-md pl-4 " style={{ height: '500px', marginRight: '60px' }}>
            <h1 className="font-inter font-bold text-secondary-gray text-xl text-plus-jakarta-sans">Subscription & Usage</h1>
            <p className="text-mapi-neutral-5 text-opacity-85 text-base">Monitor API subscription and team usage of your subscribed APIs.</p>
            <div className="flex justify-end mb-4">
              <label htmlFor="planFilter" className="mr-2 text-mapi-neutral-5 text-opacity-85 text-base">Filter by Plan:</label>
              <select id="planFilter" value={filter} onChange={handleFilterChange} className="border border-secondary-gray rounded-md px-3 py-1 bg-mapi-neutral-3 text-secondary-gray text-plus-jakarta-sans">
                  <option value="all" className="text-secondary-gray text-plus-jakarta-sans">All</option>
                  <option value="public" className="text-secondary-gray text-plus-jakarta-sans">Public</option>
                  <option value="private" className="text-secondary-gray text-plus-jakarta-sans">Private</option>
              </select>

            </div>
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full rounded-md">
                <thead className="bg-mapi-neutral-2">
                  <tr>
                    <th className='px-4 py-6 text-mapi-neutral-5 text-opacity-85 text-base text-left text-plus-jakarta-sans rounded-l-md'>API Name</th>
                    <th className="px-4 py-6 text-mapi-neutral-5 text-opacity-85 text-base text-left text-plus-jakarta-sans">Plan Name</th>
                    <th className="px-4 py-6 text-mapi-neutral-5 text-opacity-85 text-base text-left text-plus-jakarta-sans">Plan Type</th>
                    <th className="px-4 py-6 text-mapi-neutral-5 text-opacity-85 text-base text-left text-plus-jakarta-sans">
                      Date Subscribed
                      <button onClick={handleToggleSortOrder}>
                        {sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />}
                      </button>
                    </th>
                    <th className="px-4 py-6 text-mapi-neutral-5 text-opacity-85 text-base text-left text-plus-jakarta-sans">Status</th>
                    <th className="px-4 py-2 text-mapi-neutral-5 text-opacity-85 text-base text-left text-plus-jakarta-sans rounded-r-md">Actions</th>
                  </tr>
                </thead>
                <tbody className="shadow-xl space-y-5 bg-mapi-neutral-2 bg-opacity-40">
                  {filteredSubscriptions.map((subscription) => (
                    <tr key={subscription.subscription_id} className="text-mapi-neutral-5">
                      <td className='px-4 py-6 text-opacity-85 text-base text-left text-plus-jakarta-sans rounded-l-md'>{subscription.api_name}</td>
                      <td className='px-4 py-6 text-opacity-85 text-base text-left text-plus-jakarta-sans'>
                        {subscription.subscription_plan ?
                          subscription.subscription_plan.name :
                          subscription.user_plan.name}
                      </td>
                      <td className='px-4 py-6 text-opacity-85 text-base text-left text-plus-jakarta-sans'>
                        {subscription.subscription_plan ?
                          "Public plan" :
                          "Private plan"}
                      </td>
                      <td className='px-4 py-6 text-opacity-85 text-base text-left text-plus-jakarta-sans'>{subscription.subscription_date}</td>
                      <td className='px-4 py-6 text-opacity-85 text-base text-left text-plus-jakarta-sans'>
                        {subscription.access_key && subscription.access_key.status === 1 ? (
                          <span className="inline-block px-4 py-0.25 border border-customGreen text-customTextGreen bg-customBackground">Active</span>
                        ) : (
                          <span className="inline-block px-4 py-0.25 border border-customRed text-customTextRed bg-customBackground">Paused</span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-xs text-secondary-blue">
                        <div className="flex space-x-4">
                          <Link to={`/about/${subscription.api_version}`}>
                            <button className='text-mapi-neutral-5 text-base underline'>Go to API</button>
                          </Link>
                          <Link to={`/Transaction_details/${subscription.access_key.access_key_id}`}>
                            <button className='text-mapi-neutral-5 text-base underline'>Unsubscribe</button>
                          </Link>
                          <button onClick={() => handleManageKey(subscription.access_key)} className="text-mapi-neutral-5 text-base underline">Manage key</button>
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
      <Footer />
      {selectedKey && <Popup keyInfo={selectedKey} onClose={handleClosePopup} />} {/* Afficher le Popup si une clé est sélectionnée */}
    </div>
  );
};

export default SubscriptionListPage;