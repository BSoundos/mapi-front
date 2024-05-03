import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSubscriptionPlans, fetchUserPlans} from '../components/slices/subscriptionPlansSlice';
import { fetchPlanDetails, fetchUserPlanDetails} from '../components/slices/selectedPlanSlice';
import store, { RootState } from '../store'; 
import { Link } from 'react-router-dom'; 
import Navbar from './NavBar';
import Footer from './Footer';
import { FaCheck, FaTimes } from 'react-icons/fa';

export type AppDispatch = typeof store.dispatch
const SubscriptionPlansPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const subscriptionPlans = useSelector((state: RootState) => state.subscriptionPlans.plans);
  const userPlans = useSelector((state: RootState) => state.subscriptionPlans.userplans); 
  const status = useSelector((state: RootState) => state.subscriptionPlans.status);
  const error = useSelector((state: RootState) => state.subscriptionPlans.error);
  //Au cas ou il y une erreur de saisie des objets 
  // Fusionner les objets des userPlans et subscriptionPlans
  const allObjects = userPlans.flatMap(plan => plan.objects)
  .concat(subscriptionPlans.flatMap(plan => plan.objects));
  // Supprimer les doublons en utilisant un ensemble
  const uniqueObjectNames = Array.from(new Set(allObjects.map(obj => obj.object_name)));
  const allFeatures= userPlans.flatMap(plan => plan.features)
   .concat(subscriptionPlans.flatMap(plan => plan.features));
  const uniqueFeatureNames = Array.from(new Set(allFeatures.map(obj => obj.feature_name))); 

  useEffect(() => {
    dispatch(fetchSubscriptionPlans(1));
    dispatch(fetchUserPlans(1));

  }, [dispatch]);

  const handleSubscribe = (planId: number) => {
    dispatch(fetchPlanDetails({ planId }));
  };

  const handleSubscribeUserPlan = (planId: number) => {
    dispatch(fetchUserPlanDetails({ planId }));
  };
   return (
    <div className="h-screen bg-mapi-neutral-2">
    <Navbar/>
    <div className=" flex justify-center items-center bg-mapi-neutral-2">
    <div className="subscription-plans-container bg-mapi-neutral-2 w-full mx-6 my-8 sm:mx-4 flex flex-col items-center   border border-gray-300 border-opacity-30 rounded-lg overflow-hidden shadow-2xl ">
        <div className="plan-heading font-medium  leading-8 text-center w-11/12  mb-8 mt-8 text-3xl text-mapi-neutral-5">
          Choose the Right Plan For You
        </div>
        
        <div className="flex">
          <div className="title-column">
            <div className="title-item"></div>
            
            <p className="object_title text-center text-plus-jakarta-sans  font-medium text-lg mr-8 ml-2 text-mapi-neutral-5 pt-4 pb-20">Objects / Features</p>
          
            {uniqueObjectNames.map((objectName, index) => (
              <div key={index} className="object-item ">
                <p className="object_title text-center text-plus-jakarta-sans  font-medium text-lg mr-8 ml-2 text-mapi-neutral-5 pb-8">{objectName}</p>
              </div>
              
            ))}
             {uniqueFeatureNames.map((objectName, index) => (
              <div key={index} className="object-item ">
                <p className="object_title text-center text-plus-jakarta-sans  font-medium text-lg mr-8 ml-2 text-mapi-neutral-5">{objectName}</p>
              </div>
              
            ))}
            
            <p className="object_title text-center text-plus-jakarta-sans  font-medium text-lg mr-8 ml-2 text-mapi-neutral-5 pt-4">Rate limit</p>
          </div>
          <p className="object_title font-semibold text-base mt-8 mr-4 ml-2 mb-2 text-mapi-neutral-5"></p>
          <div className="flex flex-wrap justify-center">
          {subscriptionPlans
              .filter(plan => plan.type === 'monthly')
              .map(plan => (
                <div key={plan.id} className="plan-item mb-12 relative mr-4 bg-mapi-neutral-3">
                  <div className="plan-container rounded-lg p-5 bg-primary-secondary-1 min-w-[250px] max-w-[400px] cursor-pointer flex flex-col justify-center items-center relative shadow-xl group">
                    {/* Bulle d'information pour la promotion */}
                    {plan.promotion && plan.promotion.is_active && (
                     <div className="absolute top-0 left-auto right-0 mt-2">
                     <div className="relative bg-red-600 text-white px-2 py-1 rounded-md z-10">
                       <span className="text-xl font-bold text-mapi-neutral-5">-{plan.promotion.discount_amount} %</span>
                       {/* Ajout de la div pour les dates de promotion */}
                       <div className="absolute left-15 bottom-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-custom-color text-mapi-secondary-3 px-2 py-1 rounded-md flex items-center justify-center whitespace-nowrap">
                        Available until {plan.promotion.end_date}
                      </div>
                     </div>
                   </div>
                    )}
        <h2 className="plan-title text-3xl font-bold text-mapi-secondary-3 mb-2 pt-4">{plan.name}</h2>
        
        <p className="subscription-price text-2xl font-medium text-mapi-neutral-5 pb-4" >
          {plan.subscription_price} DA <sup className="text-sm text-mapi-neutral-5">per month</sup>
        </p>
        

        {plan.objects.map(obj => (
          <div key={obj.id} className="object-item flex flex-col items-center mb-1 ">
          <div className="rate-limit text-base font-inter text-gray-300 flex justify-center items-center font-medium text-mapi-neutral-5">
            {obj.quota_type === 'monthly' && `${obj.quota_limit} DA / month`}
            {obj.quota_type === 'daily' && `${obj.quota_limit} DA / day`}
            {obj.quota_type === 'unlimited' && 'Unlimited'}
          </div>
          <div className="rate-limit text-base font-inter text-gray-300 flex justify-center items-center text-mapi-neutral-5 pb-4">{obj.limit_type} limit</div>
        </div>
        
        ))}
      
        {uniqueFeatureNames.map(featureName => (
          <div key={featureName} className="object-item flex flex-col items-center ">
            <div className="rate-limit mb-3 text-base font-inter text-gray-300 flex justify-center items-center font-medium text-mapi-neutral-5">
              {plan.features.some(feature => feature.feature_name === featureName) ? (
                <FaCheck style={{ color: 'green' }} />
              ) : (
                <FaTimes style={{ color: 'red' }} />
              )}
            </div>
          </div>
        ))}
        <p className="rate-limit mb-3 text-base font-inter text-gray-300 flex justify-center items-center text-mapi-neutral-5 pt-4 pb-4">{plan.rate_limit} requests per hour</p>

        <Link to={`plan/${plan.id}`}>
         
          <button onClick={() => handleSubscribe(plan.id)} className="bg-white w-36 h-12 rounded-lg text-lg text-mapi-neutral-5flex font-medium items-center justify-center hover:bg-mapi-secondary-5 transition-colors duration-300">
            Subscribe
          </button>
        </Link>
      </div>

      {/* Ajouter le rectangle et le texte "Recommended" si plan.is_recommended est défini sur true */}
      {plan.is_recommended === true && (
        <div className="private-plan-indicator absolute top-0 left-0 bg-custom-color text-mapi-secondary-3 px-2 py-1 rounded-md flex items-center justify-center">
          Recommended
        </div>
      )}


  </div>
))}

    
            {userPlans.length > 0 && userPlans            
            .filter(plan => plan.type === 'monthly')
            .map(plan => (
              <div key={plan.id} className="plan-item mb-12 relative mr-4 bg-mapi-neutral-3">
                <div className="plan-container rounded-lg p-5 bg-primary-secondary-1 min-w-[250px] max-w-[400px] cursor-pointer flex flex-col justify-center items-center relative shadow-xl group">
              
                  <h2 className="plan-title text-3xl font-bold text-mapi-secondary-3 mb-2 pt-4">{plan.name}</h2>
                 

                  <p className="subscription-price text-2xl font-medium text-mapi-neutral-5 pb-4">
                    {plan.subscription_price} DA <sup className="text-sm text-mapi-neutral-5">per month</sup>
                  </p>        
                    
     
                  {plan.objects.map(obj => (
          <div key={obj.id} className="object-item flex flex-col items-center mb-1 ">
          <div className="rate-limit text-base font-inter text-gray-300 flex justify-center items-center font-medium text-mapi-neutral-5">
            {obj.quota_type === 'monthly' && `${obj.quota_limit} DA / month`}
            {obj.quota_type === 'daily' && `${obj.quota_limit} DA / day`}
            {obj.quota_type === 'unlimited' && 'Unlimited'}
          </div>
          <div className="rate-limit text-base font-inter text-gray-300 flex justify-center items-center text-mapi-neutral-5 pb-4">{obj.limit_type} limit</div>
        </div>
        
        ))}
        
        {uniqueFeatureNames.map(featureName => (
          <div key={featureName} className="object-item flex flex-col items-center ">
            <div className="rate-limit mb-3 text-base font-inter text-gray-300 flex justify-center items-center font-medium text-mapi-neutral-5">
              {plan.features.some(feature => feature.feature_name === featureName) ? (
                <FaCheck style={{ color: 'green' }} />
              ) : (
                <FaTimes style={{ color: 'red' }} />
              )}
            </div>
          </div>
        ))}
                 
                  <p className="rate-limit mb-3 text-base font-inter text-gray-300 flex justify-center items-center text-mapi-neutral-5 pt-4 pb-4">{plan.rate_limit} requests per hour</p>
                  <Link to={`plan/${plan.id}`}>
              
                    <button onClick={() => handleSubscribeUserPlan(plan.id)} className="bg-white w-36 h-12 rounded-lg text-lg text-mapi-neutral-5flex font-medium items-center justify-center hover:bg-mapi-secondary-5 transition-colors duration-300">
                      Subscribe
                    </button>
                  </Link>
                </div>
                <div className="private-plan-indicator absolute top-0 left-0 bg-custom-color text-mapi-secondary-3 px-2 py-1 rounded-md flex items-center justify-center">
                  Private Plan
                </div>
              </div> 
            ))}               
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}
export default SubscriptionPlansPage;