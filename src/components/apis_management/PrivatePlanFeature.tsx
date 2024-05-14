import { RootState, useAppDispatch } from "@/app/store";
import {useSelector } from "react-redux";
import { useState } from "react";
import EditFeatureModal from "@/components/apis_management/EditFeatureModal";
import Switch from "react-switch";
import { updateFeatureStatus } from "@/components/features/apis_management/featureStatusSlice";
import { FeatureProps } from "@/types/FeatureProps";





const PrivatePlanFeature: React.FC<FeatureProps> = ({ feature,selectedPlan }) => {
  const dispatch = useAppDispatch();
  const featureStatusUser = useSelector((state: RootState) => state.featureStatus.featuresUser);
  const [showModal, setShowModal] = useState(false);
  const [editfeatureFormData, setEditfeatureFormData] = useState({
    name: feature.name,
    description: feature.description,
    endpoints: feature.endpoints,
  });

 
  const handleSwitchChange = async (planId, featureId, isActive, featureStatusId) => {
    try {
      const data = {
        user_plan: planId,
        feature: featureId,
        is_active: isActive,
      };
      if (featureStatusId) {
        await dispatch(updateFeatureStatus({ id: featureStatusId, data,planType:"user" }));
      } 
    } catch (error) {
      console.error('Error updating feature status:', error);
    }
  };

  const getFeatureStatus = (subPlanId) => {
    const featureStatusObj = featureStatusUser.find(
      (featureObj) => featureObj.feature_id === feature.id
    );
    if (featureStatusObj) {
      return featureStatusObj.feature_status.find(
        (fs) => fs.user_plan === subPlanId
      );
    }

    return null;
  };
  
  const featureStatusObj = getFeatureStatus(selectedPlan?.id);
  const featureStatusId = featureStatusObj ? featureStatusObj.id : null;

  return (
    <>
      <div className="flex-col border-t border-t-[#404040]">
        <div className="flex my-5 pr-12 items-center w-full">
          <div onClick={() => setShowModal(true)} className="flex flex-col w-40 cursor-pointer">
            <div className="underline text-mapi-text font-semibold text-sm">{feature.name}</div>
            <p className="text-mapi-text text-sm">{feature.description}</p>
          </div>
          <div className="flex flex-1 justify-end gap-4">
                <div key={selectedPlan?.id} className="w-[25%] text-center pl-5">
                  <Switch
                    checked={featureStatusObj?.is_active || false}
                    onChange={() =>
                      handleSwitchChange(
                        selectedPlan?.id,
                        feature.id,
                        !featureStatusObj?.is_active,
                        featureStatusId
                      )
                    }
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
                </div>
           
          </div>
        </div>
      </div>
      {showModal && (
        <EditFeatureModal
          setShowModal={setShowModal}
          editForm={editfeatureFormData}
          setEditForm={setEditfeatureFormData}
          featureId={feature.id}
        />
      )}
    </>
  );
};
export default PrivatePlanFeature;