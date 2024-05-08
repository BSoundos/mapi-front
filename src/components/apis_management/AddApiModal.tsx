import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "@/app/store";
import { createApi } from "@/components/features/apis_management/apiSlice";
import CategorySelect from "@/components/CategorySelect";
import { AddApiProps } from "@/types/AddApiProps";


const AddApiModal: React.FC<AddApiProps> = ({
  showModal,
  setShowModal,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    base_url: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddApi = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.description || !formData.base_url) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      const response = await dispatch(createApi(formData));
      if (createApi.fulfilled.match(response)) {
        navigate(`/general-api/${response.payload.api.api_id}`);
        setShowModal(false);
        setFormData({
          name: "",
          category: "",
          description: "",
          base_url: "",
        });
        setErrorMessage("");
      } else {
        setErrorMessage(response.error.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred while creating the API.");
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormData({
      name: "",
      category: "",
      description: "",
      base_url: "",
    });
    setErrorMessage("");
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white pt-6 py-10 mt-3 px-16 rounded-md w-2/5 ">
            <h2 className="text-xl font-bold mb-2">Add New API</h2>
            <h2 className="text-md text-[#09101D] text-opacity-80 font-bold mb-5">Basic informations</h2>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <div className="flex flex-col gap-2 px-3 ">
              <div className="mb-2 flex flex-col gap-1">
                <label htmlFor="name" className="block pl-2 text-sm font-semibold text-[#09101D] ">
                  Name<span className="text-red-500 -mt-3">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name of api"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full add-api-input text-dark-text text-sm"
                />
              </div>
              <div className="mb-2 flex flex-col gap-1">
                <label htmlFor="category" className="block pl-2 text-sm font-semibold text-[#09101D]">
                  Category<span className="text-red-500 -mt-3">*</span>
                </label>
                <CategorySelect
                  value={formData.category}
                  onChange={(value) => setFormData({ ...formData, category: value })}
                  style="add-api-input text-dark-text"
                />
              </div>
              <div className="mb-2 flex flex-col gap-1">
                <label htmlFor="description" className="block pl-2 text-sm font-semibold text-[#09101D]">
                  Description<span className="text-red-500 -mt-3">*</span>
                </label>
                <textarea
                  id="description"
                  placeholder="Describe your API here"
                  name="description"
                  value={formData.description}
                  required
                  onChange={handleInputChange}
                  className="mt-1 block w-full add-api-input text-dark-text text-sm"
                />
              </div>
              <div className="mb-5 flex flex-col gap-1">
                <label htmlFor="base_url" className="block pl-2 text-sm font-semibold text-[#09101D]">
                  Settings<span className="text-red-500 -mt-3">*</span>
                </label>
                <input
                  type="text" id="base_url"
                  placeholder="Base url"
                  name="base_url"
                  value={formData.base_url}
                  required
                  onChange={handleInputChange}
                  className="mt-1 block w-full add-api-input text-dark-text text-sm "
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className=" bg-white border border-[#858C94] text-[#858C94] font-medium text-base py-2 px-4 rounded-2xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddApi}
                  className="bg-secondary-blue text-white font-bold text-base py-2 px-4 rounded-2xl flex-1"
                >
                  Add API Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddApiModal;