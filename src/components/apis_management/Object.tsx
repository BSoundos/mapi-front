import { RootState } from "@/app/store";
import {useSelector } from "react-redux";
import { useState } from "react";
import EditObjectModal from "./EditObjectModal";
import ObjectMonthlyRenderer from "@/components/apis_management/ObjectPerMonthRenderer";
import ObjectPerUseRenderer from "@/components/apis_management/ObjectPerUseRenderer";
import { ObjectProps } from "@/types/ObjectProps";




const Object: React.FC<ObjectProps> = ({object}) => {
  const subscriptionPlan = useSelector((state: RootState) => state.subscriptionplan);
  const [showModal, setShowModal] = useState(false);

  const [editObjectFormData, setEditObjectFormData] = useState({
    name:object.name,
    description:object.description,
    endpoints:object.endpoints,
    });

  return (
    <>
      <div className="flex-col border-t border-t-[#404040]">
      <div className="flex my-5 pl-2 items-center w-full">
        <div onClick={()=>setShowModal(true)} className="flex flex-col w-52 cursor-pointer">
          <div className="underline text-mapi-text font-semibold text-sm">
            {object.name}
          </div>
          <p className="text-mapi-text text-sm">{object.description}</p>
        </div>
        <div className="flex flex-1 items-center  ">
          {subscriptionPlan.subscriptionPlans.map((sub) => (
            <div key={sub.id} className="w-full" >
              {sub.type === "monthly" && (
                <ObjectMonthlyRenderer
                  key={sub.id}
                  object={object}
                  subscriptionPlan={sub}
                  isSubPlan={true}
                />
              )}
              {sub.type === "pay_per_use" && (
                <ObjectPerUseRenderer
                  key={sub.id}
                  object={object}
                  subscriptionPlan={sub}
                  isSubPlan={true}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    {showModal && <EditObjectModal  setShowModal={setShowModal} editForm={editObjectFormData} setEditForm={setEditObjectFormData} objectId={object.id} />}
    </>
  );
};

export default Object;