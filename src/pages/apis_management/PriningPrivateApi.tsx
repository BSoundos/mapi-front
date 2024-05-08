import Navbar from "@/components/NavbarProvider";
import { useState, useEffect,useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/app/store";
import { fetchAllObjectsByVersion } from "@/components/features/apis_management/objectSlice";
import PricingTypes from "@/components/apis_management/PricingTypes";
import { fetchAllFeaturesByVersion } from "@/components/features/apis_management/featureSlice";
import AddFeatureModal from "@/components/apis_management/AddFeatureModal";
import AddObjectModal from "@/components/apis_management/AddObjectModal";
import Loading from "@/components/ui/Loading";
import ErrorLoading from "@/components/ErrorLoading";

import PrivatePlanObject from "@/components/apis_management/PrivatePlanObject";
import PrivatePlanFeature from "@/components/apis_management/PrivatePlanFeature";
import EditPrivatePlan from "@/components/apis_management/EditPrivatePlan";
import { fetchAllPrivatePlansByVersion, removePrivatePlan } from "@/components/features/apis_management/privatePlanSlice";
import { fetchObjectPerUseUser } from "@/components/features/apis_management/objectPerUseSlice";
import { fetchObjectPerMonthUser } from "@/components/features/apis_management/objectPerMonthSlice";
import { fetchAllFeaturesStatusForUser } from "@/components/features/apis_management/featureStatusSlice";
import SideBarPro from "@/components/apis_management/SideBarPro";

export default function PricingPrivateApi() {
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [showModal, setShowModal] = useState(false);
  const [showAddFeatureModal, setShowAddFeatureModal] = useState(false);
  const [showAddObjectModal, setShowAddObjectModal] = useState(false);
  const { id } = useParams<{ id: string }>();
  const privatePlan = useSelector((state: RootState) => state.privatePlan);
  const [editing, setEditing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(privatePlan.privatePlans[0] || null);
  const object = useSelector((state: RootState) => state.object);
  const feature = useSelector((state: RootState) => state.feature);
  const currentVersion = useSelector((state: RootState) => state.versions.currentVersion);
  const versionId = new URLSearchParams(window.location.search).get('versionId');
  const fetchVersionId = versionId ? parseInt(versionId) : currentVersion?.api_version_id;

  useEffect(() => {
    console.log(selectedPlan);
    if (fetchVersionId) {
      dispatch(fetchAllPrivatePlansByVersion(fetchVersionId));
      dispatch(fetchAllObjectsByVersion(fetchVersionId));
      dispatch(fetchAllFeaturesByVersion(fetchVersionId));
      dispatch(fetchObjectPerMonthUser(fetchVersionId));
      dispatch(fetchObjectPerUseUser(fetchVersionId));
      dispatch(fetchAllFeaturesStatusForUser(fetchVersionId));
    }
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        const dropdownMenus = document.querySelectorAll('.dropdown-menu:not(.hidden)');
        dropdownMenus.forEach((menu) => {
          menu.classList.add('hidden');
        });
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dispatch, fetchVersionId]);

  const handlePlanSelection = (plan: any) => {
    setSelectedPlan(plan);
  };

  const handleEditPlan = (plan: any) => {
    handlePlanSelection(plan);
    setEditing(true);
    setShowModal(true);
  };

  const handleDeletePlan = (planId: number) => {
    dispatch(removePrivatePlan(planId));  };

  const handleAddPlan = () => {
    setSelectedPlan(null);
    setEditing(false);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPlan(null);
    setEditing(false);
  };


  return (
    <div className="flex">
      <SideBarPro/>
      <div className="bg-mapi-neutral-2 flex-1">
        <Navbar id={id} />
        <div className="overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52]">
          <div className="container px-12 mt-5">
            <h2 className=" text-white text-2xl font-bold">Pricing Plans</h2>
            <PricingTypes id={id} />
            {!object.loading && !feature.loading ? (
              <div className="flex  bg-mapi-secondary-1 mt-5 px-2 rounded-sm border border-[#404040] w-full mb-5">
              <div className="flex flex-col border-r border-r-[#7E89AC] border-opacity-30 w-[22%] p-2">
              <div className="flex items-center justify-between w-full">
                <h5 className="text-mapi-text font-semibold">Plans</h5>
                <button
                  onClick={handleAddPlan}
                  className="bg-mapi-neutral-2 rounded border border-[#616161] text-white text-xs font-medium p-2"
                >
                  Add Plan
                </button>
             </div>
             {!privatePlan.loading && privatePlan.privatePlans.length === 0 ? (
               <div className="text-mapi-text w-full h-[40%] flex justify-center items-center">
                <div>
                 No Plan found
                 </div>
                 </div>
                  ) : (
                    <div className="flex flex-col gap-2 mt-8" ref={dropdownRef}>
                      {privatePlan.privatePlans.map((plan) => (
                        <div
                          key={plan.id}
                          className={`flex px-1.5 pt-1 pb-1.5  rounded text-mapi-text font-semibold text-sm justify-between items-start ${
                            selectedPlan === plan ? "bg-[#2C5EAF] bg-opacity-10" : "bg-transparent"
                          }`}
                          onClick={() => handlePlanSelection(plan)}
                        >
                          <div className="mt-1">{plan.name}</div>
                          <div className="relative -mt-1">
                            <button
                              className="text-mapi-text hover:text-gray-700 focus:outline-none"
                              onClick={(e) =>
                                e.currentTarget.nextElementSibling?.classList.toggle("hidden")
                              }
                            >
                              <span className="flex flex-1 flex-col items-center justify-center border rounded px-2.5 py-1.5 border-[#616161] -mt-1 ">
                                <span className="block h-0.5 w-0.5 bg-mapi-text rounded-full mb-0.5"></span>
                                <span className="block h-0.5 w-0.5 bg-mapi-text rounded-full mb-0.5"></span>
                                <span className="block h-0.5 w-0.5 bg-mapi-text rounded-full"></span>
                              </span>
                            </button>
                            <div className="hidden absolute right-0 z-10 mt-2 w-20  text-mapi-text bg-mapi-neutral-2  rounded shadow-lg dropdown-menu">
                              <button
                                className="block px-4 py-2 text-sm text-mapi-text hover:bg-[#2C5EAF] bg-opacity-10 w-full rounded text-left"
                                onClick={() => handleEditPlan(plan)}
                              >
                                Edit
                              </button>
                              <button
                                className="block px-4 py-2 text-sm text-mapi-text hover:bg-[#2C5EAF] bg-opacity-10 w-full rounded text-left"
                                onClick={() => handleDeletePlan(plan.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                                
                  </div>
                    <div className="flex flex-col border-r border-r-[#404040] w-[53%] ">
                <div className="text-mapi-text bg-mapi-neutral-1 font-semibold px-2 py-2.5  border-b border-b-[#7E89AC] border-opacity-30">Plan’s Specifications</div>
                <div className="text-mapi-text  font-medium border-b border-b-[#7E89AC] border-opacity-30 px-2 py-2.5">Objects</div>
                <div className="px-2 flex flex-col ">
                  {object.objects.map((obj) => (
                      <PrivatePlanObject object={obj} selectedPlan={selectedPlan}/>
                      ))}
                <button onClick={()=>setShowAddObjectModal(true)} className="bg-[#2C5EAF] bg-opacity-15 border border-[#616161] text-[#99BDE6] text-opacity-85 py-1 px-3 rounded text-sm  font-semibold mb-4 w-full">+ Add Object </button>
                {showAddObjectModal && <AddObjectModal showModal={showAddObjectModal} setShowModal={setShowAddObjectModal} versionId={fetchVersionId}/>}
                <div className="text-mapi-text  font-medium border-b border-b-[#7E89AC] border-opacity-30 px-2 py-2.5">Features</div>
                <div className="px-2 flex flex-col ">
                {feature.features.map((feature) => (
                  <PrivatePlanFeature feature={feature} selectedPlan={selectedPlan}/>
                ))}
                {showAddFeatureModal && <AddFeatureModal showModal={showAddFeatureModal} setShowModal={setShowAddFeatureModal} versionId={fetchVersionId}/>}
                <button onClick={()=>setShowAddFeatureModal(true)} className="bg-[#2C5EAF] bg-opacity-15 border border-[#616161] text-[#99BDE6] text-opacity-85 py-1 px-3 rounded text-sm  font-semibold mb-4 w-full">+ Add Feature </button>
                </div>
                </div>
            </div>
            <div className="flex w-1/4 p-2 ">
                <div className="flex items-start justify-between w-full">
                <div className="text-mapi-text">Users</div>
                <button onClick={()=>setShowAddObjectModal(true)} className="bg-[#2C5EAF] bg-opacity-15 border border-[#616161] text-[#99BDE6] text-opacity-85 py-1 px-3 rounded text-sm  font-semibold ">+ Invite User </button>
                </div>
            </div>    
                  </div>
                ) : privatePlan.loading ? (
                  <Loading />
                ) : privatePlan.error ? (
                  <ErrorLoading />
                ) : null}
              </div>
            </div>
          </div>
      {showModal && (
        <EditPrivatePlan
          showModal={showModal}
          versionId={fetchVersionId}
          editing={editing}
          privatePlan={selectedPlan}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}