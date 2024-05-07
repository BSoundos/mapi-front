import { RootState } from "@/app/store";
import {useSelector } from "react-redux";
import { useState } from "react";
import EditObjectModal from "./EditObjectModal";
import { ObjectProps } from "@/types/ObjectProps";
import ObjectPerMonthRenderer from "./ObjectPerMonthRenderer";
import ObjectPerUseRenderer from "./ObjectPerUseRenderer";




const PrivatePlanObject: React.FC<ObjectProps> = ({object,selectedPlan}) => {
  const [showModal, setShowModal] = useState(false);
  const [editObjectFormData, setEditObjectFormData] = useState({
    name:object.name,
    description:object.description,
    endpoints:object.endpoint,
    });

  return (
    <>
      <div className="flex-col border-t border-t-[#404040]">
      <div className="flex my-5 px-2 py-2 pr-12 items-center w-full justify-between ">
        <div onClick={()=>setShowModal(true)} className="flex flex-col w-52 cursor-pointer">
          <div className="underline text-mapi-text font-semibold text-sm">
            {object.name}
          </div>
          <p className="text-mapi-text text-sm">{object.description}</p>
        </div>
        <div className="flex  items-center   ">    
        {selectedPlan?.type === "monthly" && (
                <ObjectPerMonthRenderer
                  object={object}
                  subscriptionPlan={selectedPlan}
                  isSubPlan={false}
                />
              )}
              {selectedPlan?.type === "pay_per_use" && (
                <ObjectPerUseRenderer
                object={object}
                  subscriptionPlan={selectedPlan}
                  isSubPlan={false}
                />
              )}    
        </div>
      </div>
    </div>
    {showModal && <EditObjectModal  setShowModal={setShowModal} editForm={editObjectFormData} setEditForm={setEditObjectFormData} objectId={object.id} />}
    </>
  );
};

export default PrivatePlanObject;