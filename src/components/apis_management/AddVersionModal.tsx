import { useState } from 'react';
import { clearVersionError, createNewVersion } from '@/components/features/apis_management/versionSlice';
import { useAppDispatch } from '@/app/store';
import CheckBoxInput from '@/components/ui/CheckBoxInput';
import { useSelector } from 'react-redux';


const AddVersionModal = ({ toggleModal,id }) => {
  const dispatch=useAppDispatch();
  const [formData, setFormData] = useState({
    version_number: '',
    release_date: '',
    base_url: '',
    status: 'draft',
  });
  const versionError = useSelector((state) => state.versions.error); 
  const [error, setError] = useState("");
  const handleAddRequestInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (versionError || name === 'version_number') {
      dispatch(clearVersionError());
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
    setError("");
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.version_number || !formData.release_date || !formData.base_url) {
      setError('Please fill in all fields');
      return;
    }
  
    try {
      const response = await dispatch(createNewVersion({ id: id, data: formData }));
      setError('');
      setFormData({
        version_number: '',
        release_date: '',
        base_url: '',
        status: 'draft',
      });
      if (createNewVersion.fulfilled.match(response)) {
      toggleModal()
      }
      
    } catch (error) {
      setError(error.payload || 'Failed to create new version');
    }
  };

  return (
    <form>
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-mapi-neutral-1 pt-6 pb-4 mt-3 px-6 rounded-md w-1/2 ">
          <h2 className="text-lg font-semibold mb-8 text-white pb-2 border-b-[#404040] border-b">Add Version</h2>
          {(error || versionError) && ( 
              <p className="text-red-500 mb-4">{error ||versionError}</p>
            )}          
            <div className="flex flex-col gap-6 px-3 ">
            <div className="mb-2 flex gap-6 items-center w-full">
              <label htmlFor="version-number" className="text-sm font-semibold text-mapi-text w-40 text-start ">
                Version Number
              </label>
              <input
                id="version-number"
                type="number"
                name="version_number"
                min={0}
                value={formData.version_number}
                onChange={handleAddRequestInputChange}
                className="add-plan w-1/2"
                required
              />
            </div>
            <div className="mb-2 flex gap-6 items-center w-full">
              <label htmlFor="release-date" className="text-sm font-semibold text-mapi-text w-40 text-start ">
                Release Date
              </label>
              <input
                id="release-date"
                type="date"
                name="release_date"
                value={formData.release_date}
                onChange={handleAddRequestInputChange}
                className="add-plan w-1/2"
                required
              />
            </div>
            <div className="mb-2 flex gap-6 items-center w-full">
              <label htmlFor="base-url" className="text-sm font-semibold text-mapi-text w-40 text-start ">
                Base Url
              </label>
              <input
                id="base-url"
                name="base_url"
                value={formData.base_url}
                onChange={handleAddRequestInputChange}
                className="add-plan w-1/2"
                required
              />
            </div>
            <div className="mb-4 flex gap-6 items-center">
              <label htmlFor="quota-type" className="text-sm font-semibold text-mapi-text w-44">
                Status
              </label>
              <div className="flex flex-col justify-start items-start gap-3 w-[80%]">
                <CheckBoxInput
                  id="current"
                  name="status"
                  value="current"
                  checked={formData.status === 'current'}
                  label="Current"
                  onChange={handleAddRequestInputChange}
                  disabled={false}
                />
                <CheckBoxInput
                  id="active"
                  name="status"
                  value="active"
                  checked={formData.status === 'active'}
                  label="Active"
                  onChange={handleAddRequestInputChange}
                  disabled={false}
                />
                <CheckBoxInput
                  id="draft"
                  name="status"
                  value="draft"
                  checked={formData.status === 'draft'}
                  label="Draft"
                  onChange={handleAddRequestInputChange}
                  disabled={false}
                />
              </div>
            </div>
              <div className="flex gap-2 justify-end mt-5">
                <button
                  onClick={()=>{toggleModal(), dispatch(clearVersionError())}}
                  className="text-base py-2 px-4 text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFormSubmit}
                  className="bg-primary-dark border border-[#616161] font-bold text-base py-2 px-16 rounded-md text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
   };
   
   export default AddVersionModal;