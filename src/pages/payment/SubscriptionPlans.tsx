import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSubscriptionPlans, fetchUserPlans} from '@/components/features/payments/subscriptionPlansSlice';
import { fetchPlanDetails, fetchUserPlanDetails} from '@/components/features/payments/selectedPlanSlice';
import { fetchSubscriptionPlansPerUse, fetchUserPlansPerUse} from '@/components/features/payments/subscriptionPlansPerUseSlice';
import { fetchUserPlanDetailsPerUse} from '@/components/features/payments/selectedPlanPerUseSlice';
import { fetchPlanDetailsPerUse} from '@/components/features/payments/selectedPlanPerUseSlice';
import { Link, useParams } from 'react-router-dom'; 
import { FaCheck, FaTimes } from 'react-icons/fa';
import { getAllVersions } from '@/components/features/apis_management/versionSlice';
import store, { RootState } from '@/app/store';

export type AppDispatch = typeof store.dispatch
const SubscriptionPlansPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {id} = useParams();
  const subscriptionPlans = useSelector((state: RootState) => state.subscriptionPlans.monthlyplans);
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
  const subscriptionPlansPerUse = useSelector((state: RootState) => state.subscriptionPlansPerUse.plans);
  const userPlansPerUse = useSelector((state: RootState) => state.subscriptionPlansPerUse.userplans); 
  const statusPerUse = useSelector((state: RootState) => state.subscriptionPlansPerUse.status);
  const errorPerUse = useSelector((state: RootState) => state.subscriptionPlansPerUse.error);
  const uniqueObjectNamesPerUse = Array.from(new Set(subscriptionPlansPerUse.flatMap(plan => plan.objects.map(obj => obj.object_name))));
  const allFeaturesPerUse= userPlansPerUse.flatMap(plan => plan.features)
  .concat(subscriptionPlansPerUse.flatMap(plan => plan.features));
  const uniqueFeatureNamesPerUse = Array.from(new Set(allFeaturesPerUse.map(obj => obj.feature_name))); 
  const currentVersion=useSelector((state:RootState)=>state.versions.currentVersion?.api_version_id);

  
  const objectPrices: { id: string, name: string, price: number }[] = [];
  subscriptionPlansPerUse.forEach(plan => {
      const prices = plan.objects.map(obj => ({ id: plan.id, name: obj.object_name, price: obj.price }));
      objectPrices.push(...prices);
  });
  useEffect(() => {
    dispatch(getAllVersions(id));

    const loadData = async () => {
      try {
        dispatch(fetchSubscriptionPlans(currentVersion));
        await dispatch(fetchUserPlans(currentVersion));
        await dispatch(fetchSubscriptionPlansPerUse(currentVersion));
        await dispatch(fetchUserPlansPerUse(currentVersion));
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [dispatch]);

  const handleSubscribe = (planId: number) => {
    dispatch(fetchPlanDetails({ planId }));
  };

  const handleSubscribeUserPlan = (planId: number) => {
    dispatch(fetchUserPlanDetails({ planId }));
  };
  const handleSubscribePerUse = (planId: string, objectPrices: { id: string, name: string, price: number }[]) => {
    // Filtrer objectPrices par id_plan
    const filteredObjectPrices = objectPrices.filter(obj => obj.id === planId);
    // Dispatch fetchPlanDetails avec le planId filtré et objectPrices filtré
    dispatch(fetchPlanDetailsPerUse({ planId , objectPrices: filteredObjectPrices }));
};
const handleSubscribeUserPlanPerUse = (planId: number) => {
  dispatch(fetchUserPlanDetailsPerUse({ planId }));
};
   return (
    <div className=" bg-mapi-neutral-2">
    <div className=" flex justify-center items-center bg-mapi-neutral-2">
    <div className="subscription-plans-container bg-mapi-neutral-2 w-full mx-2 my-4 sm:mx-4 flex flex-col items-center   border border-gray-300 border-opacity-30 rounded-lg overflow-hidden shadow-2xl ">
        <div className="plan-heading font-medium  leading-8 text-center w-11/12  mb-8 mt-4 text-xl text-mapi-neutral-5">
          Choose the Right Plan For You
        </div>
        
        <div className="flex">
          <div className="title-column">
            <div className="title-item"></div>
            
            <p className="object_title text-center   font-medium text-base mr-2 ml-2 text-mapi-neutral-5 pt-2 pb-24">Objects / Features</p>
          
            {uniqueObjectNames.map((objectName, index) => (
              <div key={index} className="object-item ">
                <p className="object_title text-center  font-medium text-base mr-2 ml-2 text-mapi-neutral-5 pb-2">{objectName}</p>
              </div>
              
            ))}
             {uniqueFeatureNames.map((objectName, index) => (
              <div key={index} className="object-item ">
                <p className="object_title text-center text-plus-jakarta-sans  font-medium  text-base mr-2 ml-2 text-mapi-neutral-5">{objectName}</p>
              </div>
              
            ))}
            
            <p className="object_title text-center text-plus-jakarta-sans  font-medium  text-base mr-2 ml-2 text-mapi-neutral-5 pt-12">Rate limit</p>
          </div>
          <p className="object_title font-semibold text-base mt-4 mr-2 ml-1 mb-1 text-mapi-neutral-5"></p>
          <div className="flex flex-wrap justify-center">
          {(() => {

                      return null; // Retourne null pour s'assurer qu'aucun contenu n'est rendu
                    })()}
          {subscriptionPlans.length > 0 && subscriptionPlans
              .filter(plan => plan.type === 'monthly')
              .map(plan => (
                
                <div key={`monthly_${plan.id}`}  className="plan-item mb-6 relative mr-2 bg-mapi-neutral-3">
                  <div className="plan-container rounded-lg p-5 bg-primary-secondary-1 min-w-[200px] max-w-[350px] cursor-pointer flex flex-col justify-center items-center relative shadow-xl group">
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
<h2 className="plan-title text-xl font-bold text-mapi-secondary-3 mb-2 pt-4 pb-6">{plan.name}</h2>
        <p className="subscription-price text-xl font-medium text-mapi-neutral-5 pb-2" >
          {plan.subscription_price} DA <sup className="text-sm text-mapi-neutral-5">per month</sup>
        </p>
        

        {plan.objects.map(obj => (
          <div key={obj.id} className="object-item flex flex-col items-center mb-1 ">
          <div className="rate-limit text-base font-inter  flex justify-center items-center font-medium text-mapi-neutral-5">
            {obj.quota_type === 'monthly' && `${obj.quota_limit} DA / month`}
            {obj.quota_type === 'daily' && `${obj.quota_limit} DA / day`}
            {obj.quota_type === 'unlimited' && 'Unlimited'}
          </div>
          <div className="rate-limit text-base font-inter  flex justify-center items-center text-mapi-neutral-5 pb-4">{obj.limit_type} limit</div>
        </div>
        
        ))}
      
        {uniqueFeatureNames.map(featureName => (
          <div key={featureName} className="object-item flex flex-col items-center ">
            <div className="rate-limit mb-1 text-base font-inter  flex justify-center items-center font-medium text-mapi-neutral-5">
              {plan.features.some(feature => feature.feature_name === featureName) ? (
                <FaCheck style={{ color: 'green' }} />
              ) : (
                <FaTimes style={{ color: 'red' }} />
              )}
            </div>
          </div>
        ))}
        <p className="rate-limit mb-3 text-base font-inter text-gray-300 flex justify-center items-center text-mapi-neutral-5 pt-4 pb-4">{plan.rate_limit} requests per hour</p>

        <Link to={`per-month/plan/${plan.id}`}>
         
          <button onClick={() => handleSubscribe(plan.id)} className="bg-white w-24 h-10 rounded-md text-sm text-mapi-neutral-5flex font-medium items-center justify-center hover:bg-mapi-secondary-5 transition-colors duration-300">
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
              <div key={plan.id} className="plan-item mb-6 relative mr-2 bg-mapi-neutral-3">
                <div className="plan-container rounded-lg p-5 bg-primary-secondary-1 min-w-[200px] max-w-[350px] cursor-pointer flex flex-col justify-center items-center relative shadow-xl group">
              
                <h2 className="plan-title text-xl font-bold text-mapi-secondary-3 mb-2 pt-4 pb-6">{plan.name}</h2>                 

                  <p className="subscription-price text-xl font-medium text-mapi-neutral-5 pb-2">
                    {plan.subscription_price} DA <sup className="text-sm text-mapi-neutral-5">per month</sup>
                  </p>        
                    
     
                  {plan.objects.map(obj => (
          <div key={obj.id} className="object-item flex flex-col items-center mb-1 ">
          <div className="rate-limit text-base font-inter  flex justify-center items-center font-medium text-mapi-neutral-5">
            {obj.quota_type === 'monthly' && `${obj.quota_limit} DA / month`}
            {obj.quota_type === 'daily' && `${obj.quota_limit} DA / day`}
            {obj.quota_type === 'unlimited' && 'Unlimited'}
          </div>
          <div className="rate-limit text-base font-inter  flex justify-center items-center text-mapi-neutral-5 pb-4">{obj.limit_type} limit</div>
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
                  <Link to={`per-month/plan/${plan.id}`}>
              
                    <button onClick={() => handleSubscribeUserPlan(plan.id)} className="bg-white w-24 h-10 rounded-md text-sm text-mapi-neutral-5flex font-medium items-center justify-center hover:bg-mapi-secondary-5 transition-colors duration-300">
                      Subscribe
                    </button>
                  </Link>
                </div>
                <div className="private-plan-indicator absolute top-0 left-0 bg-custom-color text-mapi-secondary-3 px-2 py-1 rounded-md flex items-center justify-center">
                  Private Plan
                </div>
              </div> 
            ))} 

{(() => {            
                      return null; // Retourne null pour s'assurer qu'aucun contenu n'est rendu
                    })()}
{subscriptionPlansPerUse.length>0 && subscriptionPlansPerUse
              .filter(plan => plan.type === 'pay_per_use')
              .map(plan => (
                <div key={plan.id} className="plan-item mb-6 relative mr-2 bg-mapi-neutral-3">
                <div className="plan-container rounded-lg p-5 bg-primary-secondary-1 min-w-[200px] max-w-[350px] cursor-pointer flex flex-col justify-center items-center relative shadow-xl group">
                    {/* Bulle d'information pour la promotion */}
                    {plan.promotion && plan.promotion.is_active && (
                     <div className="absolute top-0 left-auto right-0 mt-2">
                     <div className="relative bg-red-600 text-white px-2 py-1 rounded-md z-10">
                       <span className="text-xl font-bold">-{plan.promotion.discount_amount} %</span>
                       {/* Ajout de la div pour les dates de promotion */}
                       <div className="absolute left-15 bottom-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-custom-color text-mapi-secondary-3 px-2 py-1 rounded-md flex items-center justify-center whitespace-nowrap">
                        Available until {plan.promotion.end_date}
                      </div>
                     </div>
                   </div>
                    )}

                  <h2 className="plan-title text-xl font-bold text-mapi-secondary-3 mb-2 pt-4 pb-4">{plan.name}</h2>
                  
                  {plan.objects.map(obj => (
                  <p  key={obj.id} className="subscription-price text-lg font-medium text-mapi-neutral-5 mt-10">
                    { obj.price} DA <sup className="text-sm text-mapi-neutral-5">per use</sup>
                  </p> ))}      
                  <div  className="pb-6"></div>
 
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
                 
                  <p className="rate-limit mb-3 text-base font-inter text-gray-300 flex justify-center items-center text-mapi-neutral-5 pt-8 pb-4">{plan.rate_limit} requests per hour</p>
                  <Link to={`per-use/plan/${plan.id}`}>
                 
                    <button onClick={() => handleSubscribePerUse(plan.id , objectPrices)} className="bg-white w-24 h-10 rounded-md text-sm text-mapi-neutral-5flex font-medium items-center justify-center hover:bg-mapi-secondary-5 transition-colors duration-300">
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

              {userPlansPerUse.length > 0 && userPlansPerUse
                .filter(plan => plan.type === 'pay_per_use')
                .map((plan, index) => (
                  <div key={plan.id} className="plan-item mb-6 relative mr-2 bg-mapi-neutral-3">

                <div className="plan-container rounded-lg p-5 bg-primary-secondary-1 min-w-[200px] max-w-[350px] cursor-pointer flex flex-col justify-center items-center relative shadow-xl group">
                  <h2 className="plan-title text-3xl font-bold text-mapi-secondary-3 mb-2 pt-4 pb-12">{plan.name}</h2>
                  {plan.objects.map(obj => (
                  <p key={obj.id}  className="subscription-price text-xl font-medium text-mapi-neutral-5 pb-6">
                    { obj.price} DA <sup className="text-sm text-mapi-neutral-5">per use</sup>
                  </p> ))}       
                
                
                  <div  className="pb-6"></div>
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
                  <Link to={`per-use/plan/${plan.id}`}>
              
                    <button onClick={() => handleSubscribeUserPlanPerUse(plan.id)} className="bg-white w-24 h-10 rounded-md text-sm text-mapi-neutral-5flex font-medium items-center justify-center hover:bg-mapi-secondary-5 transition-colors duration-300">
                      Subscribe
                    </button>
                  </Link>
                </div>
                <div className="private-plan-indicator absolute top-0 left-0 bg-custom-color text-mapi-secondary-3 px-2 py-1 rounded-md flex items-center justify-center">
                  Private Plan
                </div>
              </div> 
            ))
            }              
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
export default SubscriptionPlansPage;