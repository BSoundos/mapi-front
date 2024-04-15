// PlanDetailsPage.tsx
import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import store, { RootState } from '../store';
import { setPaymentMethod } from './slices/paymentMethodSlice';
import { confirmPayment} from './slices/paymentSlice';
import cibImage from '../assets/cib.png';
import edahabiyaImage from '../assets/edahabia.jpg';
export type AppDispatch = typeof store.dispatch

const PlanDetailsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const planDetails = useSelector((state: RootState) => state.plan.details);
    const paymentMethod = useSelector((state: RootState) => state.payment.method);
    if (planDetails && planDetails.objects) {
      const uniqueObjectNames = Array.from(new Set(planDetails.objects.flatMap(obj => obj.object_name)));
    }

  console.log(" planDetails", planDetails)

  const handlePaymentMethodChange = (method: string) => {
    dispatch(setPaymentMethod(method));
  };
  const handleConfirmPayment = () => {
    try {
      if (planDetails) {
        dispatch(confirmPayment({
          amount: planDetails.subscription_price,
          currency: 'dzd',
          payment_method: paymentMethod,
          id_plan : parseInt(planDetails.id),
          api_version : planDetails.api_version

        })).then((response) => {
            if (response.payload && response.payload) {
                const payloadString = JSON.stringify(response.payload);
                console.log(payloadString); 
                const payloadObject = JSON.parse(payloadString);
                console.log(payloadObject.checkout_url); 

                window.location.href = payloadObject.checkout_url;  //checkoutUrl pour le paiement en utilisant ChargilyAPI
                   } else  {
              console.error('Payment error:');
            } 
          })
      } else {
        console.error('Plan details not available.');
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
    }
  };

  useEffect(() => {
  }, []);
  if (!planDetails) {
    // Si planDetails est null
    return <div>Loading...</div>;

    
  }
  return (
    <div className="h-screen flex justify-center items-center bg-mapi-neutral-2 mx-auto  ">
<div className=" bg-mapi-neutral-2 w-full mx-auto my-8 sm:mx-4 flex flex-col items-center lg:w-3/4 xl:w-3/3 border border-gray-300 border-opacity-30 rounded-lg overflow-hidden shadow-2xl ">
<br/><br/><br/><br/><br/>
      <div className="payment-page-container flex justify-between space-x-8 shadow-xl lg:w-3/4 xl:w-2/3 border border-gray-300 border-opacity-30 rounded-lg overflow-hidden shadow-5xl ">
        <div className="selected-plan-container bg-primary-secondary-1 p-8 rounded-lg text-white ">
          <h2 className="text-2xl font-semibold mb-4 text-plus-jakarta-sans text-3xl text-neutral">You Selected The Plan</h2>
          <div className="flex flex-col space-y-4">
            <div className="plan-details-container-principal flex justify-between">
              <div className="plan-details-container bg-primary-secondary-1 p-4 rounded-lg text-neutral">
                <div className="border border-gray-300  p-4 border-opacity-30 rounded-lg ">
                  <p className="font-semibold text-plus-jakarta-sans text-lg text-neutral">{planDetails.name}</p>
                  <p>{planDetails.subscription_price} DA/mo</p>
                </div>
              </div>
              {planDetails.objects.map((obj, index) => (
                <div key={index} className="included-details bg-primary-secondary-1 p-4 rounded-lg text-white">
                  <p className="font-semibold text-plus-jakarta-sans text-lg text-neutral">What's Included?</p>
                  <p className=" text-plus-jakarta-sans text-sm text-neutral">{planDetails.rate_limit} requests per hour</p>
                  <p className=" text-plus-jakarta-sans text-sm text-neutral">
                    {obj.quota_type === 'monthly' && `${obj.quota_limit} DA / month`}
                    {obj.quota_type === 'daily' && `${obj.quota_limit} DA / day`}
                    {obj.quota_type === 'unlimited' && 'Unlimited'}
                  </p>
                </div>
              ))}
            </div>
            <hr className="separator border-t-2 border-neutral" />
            <div className="payment-methods flex justify-center space-x-4 ">
            <p className="font-semibold text-plus-jakarta-sans text-lg text-neutral">Choose Your Payment Method..</p>

                        <button
              className={`payment-method ${paymentMethod === 'cib' ? 'selectedButton' : ''} hover:border-mapi-secondary-3 transition-colors duration-300`}
              onClick={() => handlePaymentMethodChange('cib')}
            >
              <div className="flex flex-col items-center text-plus-jakarta-sans text-lg text-neutral">
                <img src={cibImage} alt="CIB" className="w-24 h-auto" />
                <span>CIB</span>
              </div>
            </button>
            <button
              className={`payment-method ${paymentMethod === 'edahabia' ? 'selectedButton' : ''} hover:border-mapi-secondary-3 transition-colors duration-300`}
              onClick={() => handlePaymentMethodChange('edahabia')}
            >
              <div className="flex flex-col items-center  text-plus-jakarta-sans text-lg text-neutral">
                <img src={edahabiyaImage} alt="Edahabia" className="w-24 h-auto"/>
                <span>Edahabia</span>
              </div>
            </button>



            </div>

          </div>
        </div>
        
        <div className="payment-summary-container bg-primary-secondary-1 p-8 rounded-lg text-white text-plus-jakarta-sans flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-plus-jakarta-sans text-neutral">Payment Summary</h2>

            <div className="plan-details text-plus-jakarta-sans font-semibold text-base text-neutral">
              <p>{planDetails.name} plan: 
              <span className="font-semibold text-plus-jakarta-sans text-base ml-14 text-neutral">{planDetails.subscription_price} DA</span></p>
            </div>
            <br/><br/>
            <hr className="separator border-t-2 border-neutral h-0.5 mt-4 mb-4 w-full mx-auto " />
            <div className="total-price">
              <p className="font-semibold text-plus-jakarta-sans text-base text-neutral">Total Price:
              <span className="font-semibold text-plus-jakarta-sans text-base ml-14 text-neutral">{planDetails.subscription_price} DA</span></p>
            </div>
            <br /><br />

            <button className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-mapi-secondary-5 hover:text-white transition-colors duration-300 text-plus-jakarta-sans" onClick={handleConfirmPayment}>Confirm & Pay</button>
          <div className="terms-of-use text-xs text-plus-jakarta-sans text-neutral">
            <p>By clicking Pay Now, you agree to the Mapi Terms of use.</p>
          </div>
        </div>
      </div>
      <br/><br/><br/><br/><br/>
    </div>
    </div>

  );
              }
  export default PlanDetailsPage;
  