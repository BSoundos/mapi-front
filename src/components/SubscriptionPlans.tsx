import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSubscriptionPlans} from '../components/slices/subscriptionPlansSlice';
import { fetchPlanDetails} from '../components/slices/selectedPlanSlice';
import store, { RootState } from '../store'; 
import { Link } from 'react-router-dom'; 

export type AppDispatch = typeof store.dispatch


const SubscriptionPlansPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const subscriptionPlans = useSelector((state: RootState) => state.subscriptionPlans.plans);
  const status = useSelector((state: RootState) => state.subscriptionPlans.status);
  const error = useSelector((state: RootState) => state.subscriptionPlans.error);
  const uniqueObjectNames = Array.from(new Set(subscriptionPlans.flatMap(plan => plan.objects.map(obj => obj.object_name))));

  useEffect(() => {
    dispatch(fetchSubscriptionPlans());
    console.log("je suis dans useeffect")

  }, [dispatch]);

  console.log("Status:", status);
  console.log("Error:", error);
  console.log("Subscription Plans.map:", subscriptionPlans);

  const handleSubscribe = (planId: string) => {
    dispatch(fetchPlanDetails(planId));

  };

  return (
    <div className="subscription-plans-container">
      <div className="plan-heading">
        Choose the Right Plan For You
      </div>
      <div className="plans-wrapper">
        <div className="title-column">
          <div className="title-item">
          </div>
          <br></br><br></br><br></br><br></br><br></br>
          {}
          {uniqueObjectNames.map((objectName, index) => (
            <div key={index} className="object-item">
              <p className ="object_title">{objectName}</p>
             
            </div>
          ))}
          
            <p className ="object_title">rate limit</p>
          
        </div>
        {subscriptionPlans.map(plan => (
          <div key={plan.id} className="plan-item">
            <div className="plan-container">
              <h2 className="plan-title">{plan.name}</h2>
              <p className="subscription-price">{plan.subscription_price} DA <br/> <span className="per-month">per month</span></p>
              {plan.objects.map(obj => (
                <div key={obj.id} className="object-item">
                  <p className="rate-limit">
                    {obj.quota_type === 'monthly' && `${obj.quota_limit} DA / month`}
                    {obj.quota_type === 'daily' && `${obj.quota_limit} DA / day`}
                    {obj.quota_type === 'unlimited' && 'Unlimited'}
                  </p>
                  <p className="rate-limit">{obj.limit_type} limit</p>
                  <br/>
                </div>
              ))}
              <p className="rate-limit">{plan.rate_limit} requests per hour</p>
              <br></br><br></br><br></br> 
              <Link to={`/plan/${plan.id}`}>
              <button onClick={() => handleSubscribe(plan.id)} className="subscribe-button">Subscribe</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlansPage;
