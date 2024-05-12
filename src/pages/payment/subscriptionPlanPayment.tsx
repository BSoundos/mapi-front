// PlanDetailsPage.tsx
import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import store, { RootState } from '../../app/store';
import { setPaymentMethod } from '../../components/features/payments/paymentMethodSlice';
import { confirmPayment} from '../../components/features/payments/paymentSlice';
import cibImage from '../../assets/cib.png';
import edahabiyaImage from '../../assets/edahabia.jpg';

export type AppDispatch = typeof store.dispatch

const PlanDetailsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const planDetails = useSelector((state: RootState) => state.plan.details);
    if (planDetails){
    const subscriptionPrice = parseFloat(planDetails.subscription_price);}
    const paymentMethod = useSelector((state: RootState) => state.payment.method);
    if (planDetails && planDetails.objects) {
      const uniqueObjectNames = Array.from(new Set(planDetails.objects.flatMap(obj => obj.object_name)));
    }
    console.log(planDetails);


  const handlePaymentMethodChange = (method: string) => {
    dispatch(setPaymentMethod(method));
  };
  const handleConfirmPayment = (price: string) => {
    try {
      if (planDetails) {
       
        dispatch(confirmPayment({

          amount: price,
          currency: 'dzd',
          payment_method: paymentMethod,
          id_plan : parseInt(planDetails.id),
          api_version : planDetails.api_version,
          typeplan : planDetails.typeplan

        })).then((response) => {
            if (response.payload && response.payload) {
                const payloadString = JSON.stringify(response.payload);
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
    <div className=" bg-mapi-neutral-2 w-full h-full">
    <div className=" flex justify-center items-center bg-mapi-neutral-2 mx-auto  pb-20 ">
            <div className="payment-page-container flex justify-between space-x-8 shadow-xl  border border-gray-300 border-opacity-30 rounded-lg overflow-hidden shadow-5xl mb-8 mt-8">
        <div className="selected-plan-container bg-primary-secondary-1 p-8 rounded-lg text-white ">
          <h2 className="text-2xl font-semibold mb-4 text-plus-jakarta-sans text-xl text-mapi-neutral-5">You Selected The Plan</h2>
          <div className="flex flex-col space-y-4">
            <div className="plan-details-container-principal flex justify-between">
              <div className="plan-details-container bg-primary-secondary-1 p-4 rounded-lg text-mapi-neutral-5">
                <div className="border border-gray-300  p-4 border-opacity-30 rounded-lg ">
                  <p className="font-semibold text-plus-jakarta-sans text-lg text-mapi-neutral-5">{planDetails.name}</p>
                  <p>{planDetails.subscription_price} DA/mo</p>
                </div>
              </div>
              <div className="included-details bg-primary-secondary-1 p-4 rounded-lg text-white">
              <p className="font-semibold text-plus-jakarta-sans text-lg text-mapi-neutral-5">What's Included?</p>
              {planDetails.objects.map((obj, index) => (
                <div key={index} >
                  <p className=" text-plus-jakarta-sans text-sm text-mapi-neutral-5 font-semibold">{obj.object_name}</p>
                  <p className=" text-plus-jakarta-sans text-sm text-mapi-neutral-5">
                    {obj.quota_type === 'monthly' && `${obj.quota_limit} DA / month`}
                    {obj.quota_type === 'daily' && `${obj.quota_limit} DA / day`}
                    {obj.quota_type === 'unlimited' && 'Unlimited'}
                  </p>
                </div>
              ))}
            </div></div>
            <hr className="separator border-t-2 border-neutral h-0.5 mt-8 mb-1 w-full mx-auto " />
            <div className="payment-methods flex justify-center space-x-4 ">
            <p className="font-semibold text-plus-jakarta-sans text-lg text-mapi-neutral-5">Choose Your Payment Method..</p>

                        <button
              className={`payment-method ${paymentMethod === 'cib' ? 'selectedButton' : ''} hover:border-mapi-secondary-3 transition-colors duration-300`}
              onClick={() => handlePaymentMethodChange('cib')}
            >
              <div className="flex flex-col items-center text-plus-jakarta-sans text-lg text-mapi-neutral-5">
                <img src={cibImage} alt="CIB" className="w-24 h-auto" />
                <span>CIB</span>
              </div>
            </button>
            <button
              className={`payment-method ${paymentMethod === 'edahabia' ? 'selectedButton' : ''} hover:border-mapi-secondary-3 transition-colors duration-300`}
              onClick={() => handlePaymentMethodChange('edahabia')}
            >
              <div className="flex flex-col items-center  text-plus-jakarta-sans text-lg text-mapi-neutral-5">
                <img src={edahabiyaImage} alt="Edahabia" className="w-24 h-auto"/>
                <span>Edahabia</span>
              </div>
            </button>
            </div>
          </div>
        </div>
        
              <div className="payment-summary-container bg-primary-secondary-1 p-8 rounded-lg text-white text-plus-jakarta-sans flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4 text-plus-jakarta-sans text-mapi-neutral-5 pb-5">Payment Summary</h2>
        <div className="plan-details text-plus-jakarta-sans font-semibold text-base text-mapi-neutral-5 pb-5">
        {planDetails.promotion ? (
          <>
           <div className="relative">
           <span>{planDetails.name} plan:</span>

  <span className="font-semibold text-plus-jakarta-sans text-base ml-14 text-red-500" style={{ textDecoration: 'line-through' }}>
    {parseFloat(planDetails.subscription_price).toFixed(2)} DA
  </span>
  {planDetails.promotion && (
  <div className="absolute bottom-6 right-0 mt-2">
    <div className="relative bg-gray-300 rounded-md p-1">
      <span className="text-xs text-red-700">-{planDetails.promotion.discount_amount}%</span>
    </div>
  </div>
)}
</div>           
          </>
        ) : (
          <span>{planDetails.name} plan:
          <span className="font-semibold text-plus-jakarta-sans text-base ml-14 text-mapi-neutral-5">
            {parseFloat(planDetails.subscription_price).toFixed(2)} DA
          </span>
          </span>
        )}
      </div>
  
  <hr className="separator border-t-2 border-neutral h-0.5 mt-4 mb-4 w-full mx-auto" />
    <div className="total-price ">

  <span className="font-semibold text-plus-jakarta-sans text-base text-mapi-neutral-5 ml-12 ">New Price:</span>

  {planDetails.promotion ? (
    <>
      <span className="font-semibold text-plus-jakarta-sans text-base ml-14 text-mapi-neutral-5 text-green-500">
        {(parseFloat(planDetails.subscription_price) - (parseFloat(planDetails.subscription_price) * planDetails.promotion.discount_amount / 100)).toFixed(2)} DA
      </span>
      
      <button className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-mapi-secondary-5 hover:text-white transition-colors duration-300 text-plus-jakarta-sans mt-5" onClick={() => handleConfirmPayment((parseFloat(planDetails.subscription_price) - (parseFloat(planDetails.subscription_price) * planDetails.promotion.discount_amount / 100)).toFixed(2))}>
        Confirm & Pay
      </button>
      
    </>
  ) : (
    <>
      <span className="font-semibold text-plus-jakarta-sans text-base ml-14 text-mapi-neutral-5">
        {planDetails.subscription_price} DA
      </span>
      <button className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-mapi-secondary-5 hover:text-white transition-colors duration-300 text-plus-jakarta-sans mt-5" onClick={(event) => handleConfirmPayment(planDetails.subscription_price)}>
        Confirm & Pay
      </button>
    </>
  )}</div>
  <div className="terms-of-use text-xs text-plus-jakarta-sans text-mapi-neutral-5">
    <p>By clicking Pay Now, you agree to the Mapi Terms of use.</p>
  </div>
</div>

      </div>
    </div>
    </div>
  );
              }
  export default PlanDetailsPage;
  