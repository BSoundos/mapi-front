import Navbar from "@/components/NavbarProvider";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Switch from "react-switch";
import {useSelector } from "react-redux";
import { activateSubscriptionPlan,fetchAllSubscriptionPlansByVersion,hideSubscriptionPlan } from "@/components/features/apis_management/subPlanSlice";
import { RootState, useAppDispatch } from "@/app/store";
import { fetchAllObjectsByVersion } from "@/components/features/apis_management/objectSlice";
import PricingTypes from "@/components/apis_management/PricingTypes";
import EditSubPlan from "@/components/apis_management/EditSubPlan";
import Object from "@/components/apis_management/Object";
import { fetchAllFeaturesByVersion } from "@/components/features/apis_management/featureSlice";
import Feature from "@/components/apis_management/Feature";
import AddFeatureModal from "@/components/apis_management/AddFeatureModal";
import AddObjectModal from "@/components/apis_management/AddObjectModal";
import Loading from "@/components/ui/Loading";
import ErrorLoading from "@/components/ErrorLoading";
import { fetchObjectPerMonthData } from "@/components/features/apis_management/objectPerMonthSlice";
import { fetchObjectPerUseData } from "@/components/features/apis_management/objectPerUseSlice";
import { fetchAllFeaturesStatusForSub } from "@/components/features/apis_management/featureStatusSlice";
import SideBarPro from "@/components/apis_management/SideBarPro";
import { fetchEndpoints } from "@/components/features/apis/endpointSlice";
export default function PricingPublicApi() {

    const dispatch=useAppDispatch();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddFeatureModal, setShowAddFeatureModal] = useState(false);
    const [showAddObjectModal, setShowAddObjectModal] = useState(false);
    const { id } = useParams<{ id: string }>();
    const subscriptionPlan = useSelector((state: RootState) => state.subscriptionplan);
    const object =useSelector((state: RootState) => state.object);
    const feature =useSelector((state: RootState) => state.feature);
    const currentVersion=useSelector((state:RootState)=>state.versions.currentVersion);
    const versionId = new URLSearchParams(window.location.search).get('versionId');
      const fetchVersionId = versionId ? parseInt(versionId) : currentVersion?.api_version_id;
    useEffect(() => {
      if (fetchVersionId) {
        dispatch(fetchAllSubscriptionPlansByVersion(fetchVersionId));
        dispatch(fetchAllObjectsByVersion(fetchVersionId));
        dispatch(fetchAllFeaturesByVersion(fetchVersionId));
        dispatch(fetchAllFeaturesStatusForSub(fetchVersionId));
        dispatch(fetchObjectPerMonthData(fetchVersionId));
        dispatch(fetchObjectPerUseData(fetchVersionId));
        dispatch(fetchEndpoints(fetchVersionId));
      }
    }, [dispatch, fetchVersionId]);

    const [editPlanFormData, setEditPlanFormData] = useState({
        type: '',
        rate_limit: '',
        is_active:'',
        recommended:'',
        subscription_price:'',
      });
     
      const toggleEditPlanModal = (planId) => {
        setShowEditModal(!showEditModal);
        const plan = subscriptionPlan.subscriptionPlans.find((p) => p.id === planId);
      
        setEditPlanFormData({
          id:plan?.id,
          name: plan?.name,
          type: plan?.type,
          recommended:plan?.recommended,
          rate_limit: plan?.rate_limit,
          is_active: plan?.is_active,
          subscription_price: plan?.subscription_price,
        });
      };
 
  const handleSwitchChange = async (subId) => {
  const subPlan = subscriptionPlan.subscriptionPlans.find((plan) => plan.id === subId);
  const isActive = !subPlan.is_active;

  try {
    if (isActive) {
      // Call the "activateSubscriptionPlan" action
      await dispatch(activateSubscriptionPlan(subId));
    } else {
      // Call the "hideSubscriptionPlan" action
      await dispatch(hideSubscriptionPlan(subId));
    }

  } catch (error) {
    console.error('Error updating subscription plan:', error);
  }
};
  
  
  return (
    <div className="flex ">
    <SideBarPro/>
    <div className="bg-mapi-neutral-2 flex-1 ">
    <Navbar id={id}/>
   <div className="overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52]">
   <div className="container px-12 mt-5  ">
   <h2 className=" text-white text-2xl font-bold">Pricing Plans</h2>   
   <PricingTypes id={id}/>
   {!subscriptionPlan.loading && !object.loading && subscriptionPlan.subscriptionPlans.length > 0 ? (  
          <div className="flex flex-col bg-mapi-secondary-1 mt-5 p-2 rounded-sm border border-[#404040] w-full mb-5">
          <div  className="flex gap-5 w-full justify-end  px-2">
    {subscriptionPlan.subscriptionPlans.map((subPlan) => (
      <>
            <div key={subPlan.id} className="flex flex-col gap-2 items-center w-[18%] ">
                <Switch
                      checked={subPlan.is_active}
                      onChange={() => handleSwitchChange(subPlan.id)}
                      onColor="#3B73CE"
                      onHandleColor="#1F1F1F"
                      handleDiameter={8}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      height={15}
                      width={28}
                      className="react-switch"
                      id="material-switch"
                    />
                <div className="text-mapi-text uppercase font-bold text-xl">{subPlan.name}</div>
                <div className="text-mapi-text font-medium text-xs">{subPlan.subscription_price}<span>/Month</span></div>
                <button onClick={()=>{toggleEditPlanModal(subPlan.id)}}className="bg-mapi-neutral-2 rounded border border-[#616161] text-white text-xs font-medium w-full py-1">Edit</button>
                </div>
                {showEditModal && <EditSubPlan showModal={showEditModal} setShowModal={setShowEditModal} editForm={editPlanFormData} setEditForm={setEditPlanFormData} versionId={fetchVersionId}/>}
  
      
 </>
    ))}
        </div>
        <div className="flex flex-col mt-8">
  <div className="title border-b border-b-[#404040] w-full text-center text-white font-bold text-base pb-2">Objects</div>
  {object.objects.map((obj) => (
   <Object object={obj}/>
))}
{showAddObjectModal && <AddObjectModal showModal={showAddObjectModal} setShowModal={setShowAddObjectModal} versionId={fetchVersionId}/>}
</div>
<button onClick={()=>setShowAddObjectModal(true)} className="bg-[#2C5EAF] bg-opacity-15 border border-[#616161] text-[#99BDE6] text-opacity-85 py-1 px-3 rounded text-sm  font-semibold mb-4 w-32">+ Add Object </button>
<div className="flex flex-col mt-4">
            <div className="title border-b border-b-[#404040] w-full text-center text-white font-bold text-base pb-2 ">Features</div>
            {feature.features.map((feature) => (
            <Feature feature={feature}/>
          ))}
          {showAddFeatureModal && <AddFeatureModal showModal={showAddFeatureModal} setShowModal={setShowAddFeatureModal} versionId={fetchVersionId}/>}
</div>
<button onClick={()=>setShowAddFeatureModal(true)} className="bg-[#2C5EAF] bg-opacity-15 border border-[#616161] text-[#99BDE6] text-opacity-85 py-1 px-3 rounded text-sm  font-semibold mb-4 w-32">+ Add Feature </button>
</div>
      ) : subscriptionPlan.loading ? (  
         <Loading/>
        ) : subscriptionPlan.error ? (
         <ErrorLoading/>
        ) : null}
     
       
   </div>
   </div>
    </div>
  </div>
  )
}
