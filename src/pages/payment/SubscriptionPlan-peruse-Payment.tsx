import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import store, { RootState } from '../../app/store';
import { setPaymentMethod } from '../../components/features/payments/paymentMethodSlice';
import { confirmPayment} from '../../components/features/payments/paymentSlice';
import cibImage from '../../assets/cib.png';
import edahabiyaImage from '../../assets/edahabia.jpg';
export type AppDispatch = typeof store.dispatch
import { useParams } from 'react-router-dom'; 
import Navbar from '../../components/NavBar';
import HalfNavBar from '../../components/HalfNavBar';
import Footer from '../../components/Footer';

const PlanDetailsPerusePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const planDetails = useSelector((state: RootState) => state.plan_peruse.details);
    const paymentMethod = useSelector((state: RootState) => state.payment.method);
    const { apiVersion, planId } = useParams(); 

    
    let objectPrices: { id: number, object_name: string, price: string }[] = [];
    let totalPrice: number = 0;

    
    if (planDetails && planDetails.objects) {
        objectPrices = planDetails.objects;
        console.log("objectPrices",objectPrices)
        totalPrice = objectPrices.reduce((total, obj) => total + parseFloat(obj.price), 0);
    }



    const handlePaymentMethodChange = (method: string) => {
        dispatch(setPaymentMethod(method)); //changer la methode de paiement 
    };

    //confirmation du paiement
    const handleConfirmPayment = (price: number) => {
        try {
          if (planDetails && planId && apiVersion) {
            dispatch(confirmPayment({
              amount: String(price),
              currency: 'dzd',
              payment_method: paymentMethod,
              id_plan : parseInt(planId),
              api_version : parseInt(apiVersion),
              typeplan : planDetails.typeplan 

    
            })).then((response) => {
                if (response.payload && response.payload) {
                    const payloadString = JSON.stringify(response.payload);
                    const payloadObject = JSON.parse(payloadString);
                    window.location.href = payloadObject.checkout_url;  //checkoutUrl pour le paiement en utilisant ChargilyAPI
                       } else  {
                  console.error('Payment error:');
                } 
              })
          } else {
            console.error('Plan details or ids not available.');
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
    else{
        console.log("planDetails.objectPrices;",planDetails);
    }

    return (
        <div className=" bg-mapi-neutral-2">

        <Navbar/>
        <div className="h-screen flex justify-center items-center bg-mapi-neutral-2 mx-auto  pb-20">
            <div className=" bg-mapi-neutral-2 w-full mx-auto my-8 sm:mx-4 flex flex-col items-center lg:w-3/4 xl:w-3/3 border border-gray-300 border-opacity-30 rounded-lg overflow-hidden shadow-2xl ">
                <div className="payment-page-container flex justify-between space-x-8 shadow-xl lg:w-3/4 xl:w-2/3 border border-gray-300 border-opacity-30 rounded-lg overflow-hidden shadow-5xl mb-8 mt-8">
                    <div className="selected-plan-container bg-primary-secondary-1 p-8 rounded-lg text-white ">
                        <h2 className="text-2xl font-semibold mb-4 text-plus-jakarta-sans text-3xl text-mapi-neutral-5">You Selected The Plan</h2>
                        <div className="flex flex-col space-y-4">
                            <div className="plan-details-container-principal flex justify-between">
                                <div className="plan-details-container bg-primary-secondary-1 p-4 rounded-lg text-mapi-neutral-5">
                                    <div className="border border-gray-300  p-4 border-opacity-30 rounded-lg ">
                                        <p className="font-semibold text-plus-jakarta-sans text-lg text-mapi-neutral-5">{planDetails.name}</p>
                                        <p className="font-semibold text-plus-jakarta-sans text-lg text-mapi-neutral-5">Plan</p>
                                    </div>
                                </div>
                                <div className="included-details bg-primary-secondary-1 p-4 rounded-lg text-white">
                                <p className="font-semibold text-plus-jakarta-sans text-lg text-mapi-neutral-5">What's Included?</p>
                                {objectPrices.map((obj , index ) => (  
                                                                     
                                    <p key={index} className=" text-plus-jakarta-sans text-sm text-mapi-neutral-5">{obj.object_name }</p>

                                ))}
                                </div></div>

                            <hr className="separator border-t-2 border-neutral" />
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
                        <h2 className="text-2xl font-semibold mb-4 text-plus-jakarta-sans text-mapi-neutral-5">Payment Summary</h2>
                        {objectPrices.map((obj , index) => (
                            <div key={index} className="font-semibold text-plus-jakarta-sans text-base text-mapi-neutral-5 ">
                                <p>{obj.object_name}: <span className="font-semibold text-plus-jakarta-sans text-base ml-14 text-mapi-neutral-5">{obj.price} DA</span></p>
                            </div>
                        ))}
                        <hr className="separator border-t-2 border-neutral h-0.5 mt-8 mb-1 w-full mx-auto " />
                        {planDetails.promotion ? (
                        <>
                        {planDetails.promotion && (
                                <>
                                    <div className="total-price">
                                        <p className="font-semibold text-plus-jakarta-sans text-base text-mapi-neutral-5">Total Price: <span className="font-semibold text-plus-jakarta-sans text-base ml-14 text-red-500" style={{ textDecoration: 'line-through' }}>{totalPrice}.00 DA</span></p>
                                    </div>
                                    <div className="discount-amount">
                                        <p className="font-semibold text-plus-jakarta-sans text-base text-mapi-neutral-5"> <span className="font-semibold text-plus-jakarta-sans text-base ml-20 text-green-500">-{planDetails.promotion.discount_amount}%</span></p>
                                    </div>
                                    <div className="new-total-price">
                                        <p className="font-semibold text-plus-jakarta-sans text-base text-mapi-neutral-5">New Price: <span className="font-semibold text-plus-jakarta-sans text-base ml-14 text-green-500 ">{(totalPrice- totalPrice* planDetails.promotion.discount_amount / 100).toFixed(2)} DA</span></p>
                                    </div>
                                    <button 
                                        className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-mapi-secondary-5 hover:text-white transition-colors duration-300 text-plus-jakarta-sans mt-5" 
                                        onClick={() => handleConfirmPayment((totalPrice - totalPrice * planDetails.promotion.discount_amount / 100))}
                                    >
                                        Confirm & Pay
                                    </button>
                                </>
                            )}        
                        </>
                        ) : (
                            <>
                            <div className="total-price">
                                <p className="font-semibold text-plus-jakarta-sans text-base text-mapi-neutral-5">Total Price: <span className="font-semibold text-plus-jakarta-sans text-base ml-14 text-mapi-neutral-5 pb-5">{totalPrice}.00 DA</span></p>
                                <button className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-mapi-secondary-5 hover:text-white transition-colors duration-300 text-plus-jakarta-sans mt-5"   onClick={() => handleConfirmPayment(totalPrice)}>Confirm & Pay</button>
                            </div> 
                            
                            </>

                         )}
                                               
                        <div className="terms-of-use text-xs text-plus-jakarta-sans text-mapi-neutral-5">
                            <p>By clicking Pay Now, you agree to the Mapi Terms of use.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
    );
};

export default PlanDetailsPerusePage;
