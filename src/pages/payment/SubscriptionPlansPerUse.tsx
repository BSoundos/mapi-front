import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSubscriptionPlans } from '../../components/slices/subscriptionPlansPerUseSlice';
import { fetchPlanDetails } from '../../components/slices/selectedPlanPerUseSlice';
import store, { RootState } from '../../app/store';
import { Link } from 'react-router-dom';

export type AppDispatch = typeof store.dispatch


const SubscriptionPlansPerUsePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const subscriptionPlans = useSelector((state: RootState) => state.subscriptionPlansPerUse.plans);
  const status = useSelector((state: RootState) => state.subscriptionPlansPerUse.status);
  const error = useSelector((state: RootState) => state.subscriptionPlansPerUse.error);
  const uniqueObjectNames = Array.from(new Set(subscriptionPlans.flatMap(plan => plan.objects.map(obj => obj.object_name))));

  const objectPrices: { id: string, name: string, price: number }[] = [];
  subscriptionPlans.forEach(plan => {
    const prices = plan.objects.map(obj => ({ id: plan.id, name: obj.object_name, price: obj.price }));
    objectPrices.push(...prices);
  });

  console.log("objectPrices", objectPrices)

  useEffect(() => {
    dispatch(fetchSubscriptionPlans(1));
    console.log("je suis dans useeffect")

  }, [dispatch]);

  console.log("Status:", status);
  console.log("Error:", error);
  console.log("Subscription Plans.map:", subscriptionPlans);
  console.log("uniqueObjectNames:", uniqueObjectNames);

  const handleSubscribe = (planId: string, objectPrices: { id: string, name: string, price: number }[]) => {
    // Filtrer objectPrices par id_plan
    const filteredObjectPrices = objectPrices.filter(obj => obj.id === planId);
    // Dispatch fetchPlanDetails avec le planId filtré et objectPrices filtré
    dispatch(fetchPlanDetails({ planId, objectPrices: filteredObjectPrices }));
  };

  return (
    <div className="h-screen flex justify-center items-center bg-mapi-neutral-2">
      <div className="subscription-plans-container bg-mapi-neutral-2 w-full mx-auto my-8 sm:mx-4 flex flex-col items-center lg:w-3/4 xl:w-3/3 border border-gray-300 border-opacity-30 rounded-lg overflow-hidden shadow-2xl ">

        <div className="plan-heading font-medium  leading-8 text-center text-mapi-neutral-8 w-11/12  mb-8 mt-8 text-3xl text-neutral">
          Choose the Right Plan For You
        </div>
        <br /><br />
        <div className="flex">
          <div className="title-column">
            <div className="title-item"></div>
            <br />
            <p className="object_title text-center text-plus-jakarta-sans  font-medium text-lg mr-8 ml-2 text-neutral">Objects</p>
            <br />
            {uniqueObjectNames.map((objectName, index) => (
              <div key={index} className="object-item ">
                <p className="object_title text-center text-plus-jakarta-sans  font-medium text-lg mr-8 ml-2 text-neutral">{objectName}</p>
              </div>

            ))}
            <br /><br />
            <p className="object_title text-center text-plus-jakarta-sans  font-medium text-lg mr-8 ml-2 text-neutral">Rate limit</p>
          </div>
          <p className="object_title font-semibold text-base mt-8 mr-4 ml-2 mb-2 text-mapi-neutral-8 text-neutral"></p>
          <div className="flex flex-wrap justify-center">
            {subscriptionPlans
              .filter(plan => plan.type === 'pay_per_use')
              .map(plan => (
                <div key={plan.id} className="plan-item mb-12 relative mr-4 bg-mapi-neutral-3">
                  <div className="plan-container rounded-lg p-5 bg-primary-secondary-1 min-w-[250px] max-w-[400px] cursor-pointer flex flex-col justify-center items-center relative shadow-xl group">
                    <h2 className="plan-title text-3xl font-bold text-mapi-secondary-3 mb-2 ">{plan.name}</h2>
                    <br />
                    {plan.objects.map(obj => (
                      <p className="subscription-price text-2xl font-medium text-neutral">
                        {obj.price} DA <sup className="text-sm text-neutral">per use</sup>
                      </p>))}
                    <br></br>
                    <p className="rate-limit mb-3 text-base font-inter text-gray-300 flex justify-center items-center text-neutral">{plan.rate_limit} requests per hour</p>
                    <Link to={`plan/${plan.id}`}>
                      <br></br><br></br>
                      <button onClick={() => handleSubscribe(plan.id, objectPrices)} className="bg-white w-36 h-12 rounded-lg text-lg text-neutralflex font-medium items-center justify-center hover:bg-mapi-secondary-5 transition-colors duration-300">
                        Subscribe
                      </button>

                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPlansPerUsePage;