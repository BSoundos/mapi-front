import { useState } from "react";
import { addFeature } from "@/components/features/apis_management/featureSlice";
import { fetchAllFeaturesStatusForSub } from "@/components/features/apis_management/featureStatusSlice";
import { useAppDispatch } from "@/app/store";
import { AddFeatureProps } from "@/types/AddFeatureProps";

const AddFeatureModal: React.FC<AddFeatureProps> = ({
  showModal,
  setShowModal,
  versionId,
}) => {
  const dispatch = useAppDispatch();
  const [addFeatureFormData, setAddFeatureFormData] = useState({
    name: "",
    description: "",
    endpoints: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const toggleAddFeatureModal = () => {
    setShowModal(!showModal);
    setAddFeatureFormData({ name: "", description: "", endpoints: [] });
  };

  const handleAddFeatureInputChange = (e) => {
    if (e.target.name === "endpoints") {
      const selectedOptions = Array.from(e.target.selectedOptions).map(
        (option) => option.value
      );
      setAddFeatureFormData({
        ...addFeatureFormData,
        [e.target.name]: selectedOptions,
      });
    } else {
      setAddFeatureFormData({
        ...addFeatureFormData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleAddFeature = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(addFeature({ id: versionId, data: addFeatureFormData }));
      await dispatch(fetchAllFeaturesStatusForSub(versionId));
      setShowModal(false);
    } catch (error) {
      console.error("Error adding feature:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form>
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-mapi-neutral-1 pt-6 pb-4 mt-3 px-6 rounded-md w-1/2 ">
            <h2 className="text-lg font-semibold mb-8 text-white pb-2 border-b-[#404040] border-b">
              Add Feature
            </h2>
            <div className="flex flex-col gap-2 px-3 ">
              <div className="mb-2 flex gap-6 items-center">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-mapi-text flex-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={addFeatureFormData.name}
                  onChange={handleAddFeatureInputChange}
                  className="add-plan w-4/5"
                />
              </div>
              <div className="mb-2 flex gap-6 items-center">
                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-mapi-text flex-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={addFeatureFormData.description}
                  onChange={handleAddFeatureInputChange}
                  className="add-plan w-4/5 h-40"
                />
              </div>
              <div className="mb-2 flex gap-6 items-center">
                <label
                  htmlFor="endpoint"
                  className="text-sm font-semibold text-mapi-text flex-1 "
                >
                  Associated Endpoints <span className="block">(optional)</span>
                </label>
                <select
                  id="endpoint"
                  multiple
                  multiselect-search="true"
                  multiselect-select-all="true"
                  name="endpoints"
                  onChange={handleAddFeatureInputChange}
                  className="add-plan w-4/5 multiselect"
                >
                  <option value="">Select Endpoints</option>
                  <option value="1">zouj</option>
                  <option value="2">tlata</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end mt-5">
                <button
                  onClick={toggleAddFeatureModal}
                  className="text-base py-2 px-4 text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFeature}
                  className="bg-primary-dark border border-[#616161] font-bold text-base py-2 px-16 rounded-md text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddFeatureModal;