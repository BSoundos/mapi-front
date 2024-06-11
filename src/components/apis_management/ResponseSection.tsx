import React, { useState } from 'react';
import HeaderInput from './HeaderInput';
import AddHeaderButton from './AddHeaderButton';

interface ResponseSectionProps {
  options: Option[];
  dataFormat: any[];
  onAddResponseExample: (responseExample: ResponseExample) => void;
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

const ResponseSection: React.FC<ResponseSectionProps> = ({ options, dataFormat, onAddResponseExample }) => {
  const [showInput, setShowInput] = useState(false);
  const [newParameterValue, setNewParameterValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [selectedMediaTypes, setSelectedMediaTypes] = useState([]);
  const [payloadAction, setPayloadAction] = useState('');
  const [headers, setHeaders] = useState([{ name: '', value: '' }]);
  const [bodyContent, setBodyContent] = useState('');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setIsCodeValid(false);
    if (selectedValue === 'add-new') {
      setShowInput(true);
      setSelectedOption('');
      setIsCodeValid(false);
    } else {
      setShowInput(false);
      setSelectedOption(selectedValue);
      setIsCodeValid(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewParameterValue(e.target.value);
  };

  const isValidStatusCode = (value: string) => {
    const statusCode = parseInt(value, 10);
    return (
      !isNaN(statusCode) &&
      ((statusCode >= 100 && statusCode < 200) ||
        (statusCode >= 200 && statusCode < 300) ||
        (statusCode >= 300 && statusCode < 400) ||
        (statusCode >= 400 && statusCode < 500) ||
        (statusCode >= 500 && statusCode < 600))
    );
  };

  const handleAddParameter = () => {
    if (newParameterValue.trim() && isValidStatusCode(newParameterValue)) {
      const optionExists = options.some((option) => option.value === newParameterValue);
      if (!optionExists) {
        const newOption: Option = {
          value: newParameterValue,
          label: newParameterValue,
        };
        setOptions([...options, newOption]);
      }
      setNewParameterValue('');
      setShowInput(false);
    }
  };

  const handleAddResponseExample = () => {
    const newExample: ResponseExample = {
      statusCode: selectedOption,
      payloadDescription: payloadAction,
      responseBody: JSON.parse(bodyContent),
      headers: headers.map(header => ({ name: header.name, value: header.value }))
    };
    onAddResponseExample(newExample);
    setSelectedOption('');
    setPayloadAction('');
    setBodyContent('');
    setHeaders([{ name: '', value: '' }]);
  };

  const handleHeaderChange = (index: number, updatedHeader: { name: string, value: string }) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index] = updatedHeader;
    setHeaders(updatedHeaders);
  };

  return (
    <div className="flex flex-col bg-mapi-neutral-2 rounded mt-4 border border-[#404040] px-4 pt-6 pb-3 w-full justify-center gap-3 text-sm">
      <div className="flex items-center gap-5">
        <div className="text-[#9ABAE5] font-bold">Response</div>
        <div className="text-[#9ABAE5] bg-mapi-neutral-1 border border-[#9ABAE5] py-1 px-2">Example Value</div>
      </div>
      <div className="flex gap-3 mt-4">
        <div>
          {!showInput && (
            <select
              onChange={handleSelectChange}
              value={selectedOption || ''}
              className="border border-[#404040] py-1 pl-1 outline-none bg-[#081028] text-[#BFBFBF]"
            >
              <option value="">Add parameter</option>
              {options && options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
              <option value="add-new">Select code response</option>
            </select>
          )}
          {showInput && (
            <div className="flex gap-3 items-center">
              <label htmlFor="description" className="text-sm font-semibold text-mapi-text w-10">
                Code<span className="text-red-500 -mt-3">*</span>
              </label>
              <input
                type="text"
                placeholder="XXX"
                value={newParameterValue}
                onChange={handleInputChange}
                className="border border-[#404040] p-1 outline-none bg-[#081028] text-[#BFBFBF]"
              />
              <button
                onClick={handleAddParameter}
                disabled={!isValidStatusCode(newParameterValue)}
                className={`bg-primary-dark border border-[#616161] font-semibold text-sm py-1 px-4 rounded-md text-white ${!isValidStatusCode(newParameterValue) ? `cursor-not-allowed` : `cursor-pointer`}`}
              >
                Add Response code
              </button>
            </div>
          )}
        </div>
        {isCodeValid && (
  <div className="flex flex-col mt-4">
    <div className="mb-2 flex gap-6 items-center">
      <label htmlFor="mediaTypes" className="text-sm font-semibold text-mapi-text w-24">
        Media Types
      </label>
      <select
        id="mediaTypes"
        name="mediaTypes"
        multiple
        value={selectedMediaTypes}
        onChange={(e) => setSelectedMediaTypes(Array.from(e.target.selectedOptions, (option) => option.value))}
        className="add-plan w-60 h-20"
      >
        {dataFormat && dataFormat.map((format) => (
          <option key={format.id} value={format.format_type} className="text-sm">
            {format.format_type}
          </option>
        ))}
      </select>
    </div>
    <div className="mb-2 flex gap-6 items-center">
      <label htmlFor="payloadAction" className="text-sm font-semibold text-mapi-text w-24">
        Payload Action
      </label>
      <textarea
        id="payloadAction"
        name="payloadAction"
        placeholder="Payload Description"
        value={payloadAction}
        onChange={(e) => setPayloadAction(e.target.value)}
        className="add-plan w-60 h-20"
      />
    </div>
    <div className="flex flex-col gap-2 items-start mt-2">
      <label htmlFor="headers" className="text-sm font-semibold text-mapi-text w-24">
        Headers
      </label>
      <div className="flex flex-wrap gap-3">
        {headers && headers.map((header, index) => (
          <HeaderInput
            key={index}
            header={header}
            index={index}
            onChange={handleHeaderChange}
          />
        ))}
        <AddHeaderButton onClick={() => setHeaders([...headers, { name: '', value: '' }])} />
      </div>
    </div>
    <div className="mb-1 mt-3 flex gap-6 items-center">
      <label htmlFor="bodyContent" className="text-sm font-semibold text-mapi-text w-24">
        Body <span className="text-red-500 -mt-3">*</span>
      </label>
      <textarea
        id="bodyContent"
        className="add-plan w-1/2 h-24"
        placeholder="Enter body content here..."
        value={bodyContent}
        onChange={(e) => setBodyContent(e.target.value)}
      ></textarea>
    </div>
  </div>
)}
<div className="flex justify-end w-full mt-3">
  <button
    onClick={(e) => {
      e.preventDefault();
      handleAddResponseExample();
    }}
    className="bg-primary-dark border border-[#616161] font-semibold text-sm py-1 px-4 rounded-md text-white"
  >
    Save
  </button>
</div>
</div>
</div>
  );
};
export default ResponseSection;