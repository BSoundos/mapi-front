import React, { useState } from 'react';
import ParameterTable from './ParameterTable';
import ResponseSection from './ResponseSection';

interface AddEndpointFormProps {
  dataFormat: any[];
  options: Option[];
  onAddEndpoint: (formData: FormData) => void;
  onCancel: () => void;
}

interface FormData {
  name: string;
  description: string;
  isRequired: string;
  httpMethod: string;
  path: string;
  headerParams: any[];
  queryParams: any[];
  responseExamples: ResponseExample[];
}

interface ResponseExample {
  statusCode: string;
  payloadDescription: string;
  responseBody: any;
  headers: { name: string, value: string }[];
}

interface Option {
  value: string;
  label: string;
}

const AddEndpointModal: React.FC<AddEndpointFormProps> = ({
  dataFormat,
  options,
  onAddEndpoint,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isRequired: '',
    httpMethod: '',
    path: '',
    headerParams: [],
    queryParams: [],
    responseExamples: [],
  });
  const [activeSection, setActiveSection] = useState('query');

  const handleAddEndpointInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddResponseExample = (responseExample: ResponseExample) => {
    setFormData({
      ...formData,
      responseExamples: [...formData.responseExamples, responseExample],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEndpoint(formData);
  };

  return (
    <form className="mt-6 flex-1 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52] border border-[#343B4F] p-4 rounded" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 px-3">
        <div className="mb-1 flex gap-6 items-center">
          <label htmlFor="name" className="text-sm font-semibold text-mapi-text w-20">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleAddEndpointInputChange}
            className="add-plan w-60"
          />
        </div>
        <div className="mb-1 flex gap-6 items-center">
          <label htmlFor="description" className="text-sm font-semibold text-mapi-text w-20">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleAddEndpointInputChange}
            className="add-plan w-60 h-20"
          />
        </div>
        {/* ... (rest of the form inputs) */}
      </div>
      <div className="flex border-b border-b-[#292929] mt-4">
        <div
          className={`text-base pb-4 mr-8 px-2 cursor-pointer ${activeSection === 'headers' ? 'text-mapi-secondary-3 border-b-2 border-b-mapi-secondary-3' : 'text-mapi-text border-b-transparent'}`}
          onClick={() => setActiveSection('headers')}
        >
          Headers
        </div>
        <div
          className={`text-base pb-4 mr-8 px-2 cursor-pointer ${activeSection === 'query' ? 'text-mapi-secondary-3 border-b-2 border-b-mapi-secondary-3' : 'text-mapi-text border-b-transparent'}`}
          onClick={() => setActiveSection('query')}
        >
          Query
        </div>
        <div
          className={`text-base pb-4 px-2 cursor-pointer ${activeSection === 'body' ? 'text-mapi-secondary-3 border-b-2 border-b-mapi-secondary-3' : 'text-mapi-text border-b-transparent'}`}
          onClick={() => setActiveSection('body')}
        >
          Body
        </div>
        {activeSection === 'query' && (
  <ParameterTable
    rows={formData.queryParams}
    setRows={(updatedRows) =>
      setFormData({ ...formData, queryParams: updatedRows })
    }
  />
)}

{activeSection === 'headers' && (
  <ParameterTable
    rows={formData.headerParams}
    setRows={(updatedRows) =>
      setFormData({ ...formData, headerParams: updatedRows })
    }
  />
)}

<ResponseSection
  options={options}
  dataFormat={dataFormat}
  onAddResponseExample={handleAddResponseExample}
/>

<div className="flex gap-2 justify-end mt-5">
  <button
    onClick={onCancel}
    className="text-base py-2 px-4 text-white"
  >
    Cancel
  </button>
  <button
    type="submit"
    className="bg-primary-dark border border-[#616161] font-bold text-base py-2 px-16 rounded-md text-white"
  >
    Save
  </button>
</div>
</div>
</form>
);
}
export default AddEndpointModal;