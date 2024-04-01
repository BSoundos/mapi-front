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
          payment_method: paymentMethod
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
    <div className="payment-page-container">
      {}
      <div className="selected-plan-container">
        <h2>You Selected The Plan</h2>
        <div className="plan-details-container-principal">
        <div className="plan-details-container">
        <div className="plan-details">
          <p>{planDetails.name}</p>
          <p>{planDetails.subscription_price} Da/mo</p>
        </div>
      </div>
      <br></br>
      {planDetails.objects.map(obj => (
      <div className="included-details">
          <p>What's Included?</p>
          <p>{planDetails.rate_limit} requests per hour</p>
          <p>
          {obj.quota_type === 'monthly' && `${obj.quota_limit} DA / month`}
          {obj.quota_type === 'daily' && `${obj.quota_limit} DA / day`}
          {obj.quota_type === 'unlimited' && 'Unlimited'}
          </p>
         
      </div>
      ))}
      </div>
      
        <hr className="separator" />

        <div className="payment-methods">
          <p>Choose Your Payment Method..</p>
          <button
          className={paymentMethod === 'cib' ? 'selectedButton' : 'button'}
          onClick={() => handlePaymentMethodChange('cib')}
        ><div>
          <img src={cibImage} alt="CIB" />
          <span>CIB</span>
          </div>
        </button>
          <button
          className={paymentMethod === 'edahabia' ? 'selectedButton' : 'button'}
          onClick={() => handlePaymentMethodChange('edahabia')}
        >
          <div>
          <img src={edahabiyaImage} alt="edahabiya" />
          <span>Edahabia</span>
          </div>
        </button>
        </div>
      </div>

      {}
      <div className="payment-summary-container">
        <h2>Payment Summary</h2>
        <div className="plan-details">
          <p>Local Business Data</p>
          <p>{planDetails.name} plan : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{planDetails.subscription_price} DA</p>
          {}
        </div>
        <br></br>
        <hr className="separator" />

        <div className="total-price">
          <p>Total Price :  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {planDetails.subscription_price} DA</p>
        </div>
        <div className="confirm-payment">
          <button onClick={handleConfirmPayment}>Confirm & Pay</button>
        </div>
        <div className="terms-of-use">
          <p>By clicking Pay Now, you agree to the Mapi Terms of use.</p>
        </div>
      </div>
    </div>
  );
};
export default PlanDetailsPage;
