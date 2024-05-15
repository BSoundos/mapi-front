import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "@/app/store";
import { useSelector } from "react-redux";
import { AddObjectProps } from "@/types/AddObjectProps";
import { useParams } from "react-router-dom";
import SideBarPro from "@/components/apis_management/SideBarPro";
import Navbar from "@/components/NavbarProvider";

import ParameterTable from "@/components/apis_management/ParameterTable";
import { addEndpoint, fetchDataFormat } from "@/components/features/apis/endpointSlice";

const AddEndpointPage = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    useEffect(()=>{
      dispatch(fetchDataFormat());
    },[dispatch])
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        httpMethod: '',
        path: '',
        headerParams: [],
        queryParams: [],
        responseExamples: [],
      });
    const [activeSection, setActiveSection] = useState('query');
    const [isCodeValid, setIsCodeValid] = useState(false);
    const [selectedMediaTypes, setSelectedMediaTypes] = useState([]);
    const [payloadAction, setPayloadAction] = useState('');
    const [headers, setHeaders] = useState([{ name: '', value: '' }]);
    const [bodyContent, setBodyContent] = useState('');
    const [responseExamples, setResponseExamples] = useState([]);

    const toggleAddEndpointModal = () => {
        setFormData({
            name: '/',
            description: '',
            recommended: false,
            endpoints: [],
        });
    };
    const handleAddResponseExample = () => {
        const newExample = {
            statusCode: selectedOption,
            payloadDescription: payloadAction,
            responseBody: JSON.parse(bodyContent),
            headers: headers.map(header => ({ name: header.name, value: header.value }))
        };
        setResponseExamples([...responseExamples, newExample]);
    };
    

    const handleAddEndpointInputChange = (e) => {
        if (e.target.name === 'endpoints') {
            const selectedOptions = Array.from(
                e.target.selectedOptions
            ).map((option: HTMLOptionElement) => option.value);
            setFormData({ ...formData, [e.target.name]: selectedOptions });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const dataFormat = useSelector((state: RootState) => state.endpoints.dataFormat);

    const handleAddEndpoint = (e) => {
        e.preventDefault();
        const requestBody = {
            ...formData,
            responseExamples: responseExamples
        };
    
       
        console.log(requestBody);
        dispatch(addEndpoint({ id: id, data: requestBody }));
    };
 
    const [options, setOptions] = useState<Option[]>([]);  
    const [showInput, setShowInput] = useState(false);
    const [newParameterValue, setNewParameterValue] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
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
            (statusCode >= 100 && statusCode < 200) ||
            (statusCode >= 200 && statusCode < 300) ||
            (statusCode >= 300 && statusCode < 400) ||
            (statusCode >= 400 && statusCode < 500) ||
            (statusCode >= 500 && statusCode < 600)
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
    
    return (
        <div className="flex ">
            <SideBarPro />
            <div className="bg-mapi-neutral-1 flex-1 ">
                <Navbar id={id} />
                <div className="container px-5 flex-1 mt-8 pl-14 ">
                    <h2 className="text-white text-xl font-bold">Add Endpoint</h2>
                    <form className=" mt-6 flex-1 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52] border border-[#343B4F] p-4 rounded">
                        <div className="flex flex-col gap-2 px-3 ">
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
                            <div className="mb-2 flex gap-2 items-center">
                                <select
                                    id="httpMethod"
                                    name="httpMethod"
                                    onChange={handleAddEndpointInputChange}
                                    value={formData.httpMethod}
                                    className="w-24 border border-[#7E89AC] border-opacity-30 py-1 outline-none bg-[#081028] text-[#BFBFBF] "
                                >
                                    <option value="GET">GET</option>
                                    <option value="POST">POST</option>
                                    <option value="DELETE">DELETE</option>
                                    <option value="PUT">PUT</option>
                                    <option value="PATCH">PATCH</option>
                                </select>
                                <div className="flex flex-col mt-6   gap-1 ">
                                <input
                                    type="text"
                                    id="path"
                                    name="path"
                                    required
                                    value={formData.path}
                                    onChange={handleAddEndpointInputChange}
                                    className="border border-[#404040] p-1 outline-none bg-[#081028] text-[#BFBFBF] w-2/3"
                                />
                              <div className="text-sm text-mapi-text">Use &#123;curly braces&#125; to indicate path parameters if needed. e.g., /employees/&#123;id&#125;</div>                                </div>
                            </div>
                            <div className="flex border-b border-b-[#292929] mt-4 "> 
                                <div
                                    className={`text-base pb-4 mr-8 px-2 cursor-pointer ${activeSection === 'headers' ? 'text-mapi-secondary-3 border-b-2 border-b-mapi-secondary-3 ' : 'text-mapi-text border-b-transparent'}`}
                                    onClick={() => setActiveSection('headers')}
                                >
                                    Headers
                                </div>
                                <div
                                      className={`text-base pb-4 mr-8 px-2 cursor-pointer  ${activeSection === 'query' ? 'text-mapi-secondary-3 border-b-2 border-b-mapi-secondary-3 ' : 'text-mapi-text border-b-transparent'}`}
                                    onClick={() => setActiveSection('query')}
                                >
                                    Query
                                </div>
                                <div
                                 className={`text-base pb-4 px-2 cursor-pointer  ${activeSection === 'body' ? 'text-mapi-secondary-3 border-b-2 border-b-mapi-secondary-3 ' : 'text-mapi-text border-b-transparent'}`}                                    onClick={() => setActiveSection('body')}
                                >
                                    Body
                                </div>
                            </div>
                            {activeSection === 'query' && (
                                <ParameterTable rows={formData.queryParams}  setRows={(updatedRows) =>
                                    setFormData({ ...formData, queryParams: updatedRows })
                                  } />
                                )}

                                {activeSection === 'headers' && (
                                <ParameterTable rows={formData.headerParams}  setRows={(updatedRows) =>
                                    setFormData({ ...formData, headerParams: updatedRows })
                                  }  />
                                )}
        <div className="flex flex-col bg-mapi-neutral-2 rounded mt-4 border border-[#404040] px-4 pt-6 pb-3 w-full justify-center gap-3 text-sm">
      <div className="flex items-center gap-5  ">
        <div className="text-[#9ABAE5] font-bold">Response</div>
        <div className="text-[#9ABAE5] bg-mapi-neutral-1 border border-[#9ABAE5] py-1 px-2">Example Value</div>
      </div>
      <div className="flex gap-3 mt-4">
       
      <div >
      {!showInput && (
    <select
        onChange={handleSelectChange}
        value={selectedOption || ''}
        className="border border-[#404040] py-1 pl-1 outline-none bg-[#081028] text-[#BFBFBF]"
    >
        <option value="">Add parameter</option>
        {options.map((option, index) => (
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
                                                    <button onClick={handleAddParameter}  disabled={!isValidStatusCode(newParameterValue)} className={`bg-primary-dark border border-[#616161] font-semibold text-sm  py-1 px-4 rounded-md text-white ${!isValidStatusCode(newParameterValue) ? `cursor-not-allowed` : `cursor-pointer`}`} >
                                                        Add Response code
                                                    </button>
                                                </div>
                                            )}
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
                                            onChange={(e) =>
                                                setSelectedMediaTypes(Array.from(e.target.selectedOptions, (option) => option.value))
                                            }
                                            className="add-plan w-60 h-20"
                                        >
                                              {dataFormat.map((format) => (
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
    <div className="flex flex-wrap gap-3  ">
        {headers.map((header, index) => (
            <div key={index} className="flex gap-6 items-center   pl-[116px]">
                <input
                    type="text"
                    placeholder="Name"
                    value={header.name}
                    onChange={(e) => {
                        const updatedHeaders = [...headers];
                        updatedHeaders[index].name = e.target.value;
                        setHeaders(updatedHeaders);
                    }}
                    className="add-plan w-30"
                />
                <input
                    type="text"
                    placeholder="Value"
                    value={header.value}
                    onChange={(e) => {
                        const updatedHeaders = [...headers];
                        updatedHeaders[index].value = e.target.value;
                        setHeaders(updatedHeaders);
                    }}
                    className="add-plan w-30"
                />
            </div>
        ))}
        <button
            onClick={(e) => {e.preventDefault(); setHeaders([...headers, { name: '', value: '' }])}}
            className="bg-primary-dark border border-[#616161] font-semibold text-sm py-1 px-4 rounded-md text-white"
        >
            Add Header
        </button>
    </div>
</div>
                                    <div className="mb-1 mt-3 flex gap-6 items-center">
                                        <label htmlFor="bodyContent" className="text-sm font-semibold text-mapi-text w-24">
                                            Body <span className="text-red-500 -mt-3">*</span>  </label>
                                        <textarea
                                            id="bodyContent"
                                            className="add-plan w-1/2 h-24 "
                                            placeholder="Enter body content here..."
                                            value={bodyContent}
                                            onChange={(e) => setBodyContent(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                            )}
        <div className="flex justify-end w-full mt-3">
                             <button
            onClick={(e) => {e.preventDefault(); handleAddResponseExample();}}
            className="bg-primary-dark border border-[#616161] font-semibold text-sm py-1 px-4 rounded-md text-white"
        >
            Save
        </button>
        </div>
    </div>
   
      </div>
    </div>

                                                            {/* {activeSection === 'query' && (
                                <div>
                                 <div className="mb-1 flex flex-col gap-6 items-center">
    <div className="flex bg-mapi-neutral-2 border-b border-b-[#7E89AC] bg-opacity-30 px-20 pt-2 pb-3 w-full justify-between text-sm">
        <div className="text-[#9ABAE5]">Name</div>
        <div className="text-[#9ABAE5] pl-3">Type</div>
        <div className="text-[#9ABAE5]">Example Value</div>
        <div className="text-[#9ABAE5]">Required</div>
    </div>
    {tableRows.map((row, index) => (
        <div
            key={index}
            className="flex justify-between w-full pl-4 pr-16"
        >
            <input
                type="text"
                value={row.name}
                onChange={(e) => {
                    const updatedRows = [...tableRows];
                    updatedRows[index].name = e.target.value;
                    setTableRows(updatedRows);
                }}
                className="border border-[#404040] py-1 pl-1 outline-none bg-[#081028] text-[#BFBFBF] w-44"
                placeholder="Insert parameter name"
            />
            <select
                value={row.type}
                onChange={(e) => {
                    const updatedRows = [...tableRows];
                    updatedRows[index].type = e.target.value;
                    setTableRows(updatedRows);
                }}
                className="w-36 border border-[#7E89AC] border-opacity-30 py-1 text-sm outline-none bg-[#081028] text-[#BFBFBF]"
            >
                {DATA_TYPE_CHOICES.map(([value, label]) => (
                    <option key={value} value={value} className="text-sm">
                        {label}
                    </option>
                ))}
            </select>
            <input
                type="text"
                value={row.exampleValue}
                onChange={(e) => {
                    const updatedRows = [...tableRows];
                    updatedRows[index].exampleValue = e.target.value;
                    setTableRows(updatedRows);
                }}
                className="border border-[#404040] p-1 outline-none bg-[#081028] text-[#BFBFBF] w-44"
                placeholder="Insert example value"
            />
            <div className="flex gap-2 w-20 ml-8">
                <input
                    id={`recommended-${index}`}
                    className="hidden"
                    type="checkbox"
                    checked={row.required}
                    onChange={(e) => {
                        const updatedRows = [...tableRows];
                        updatedRows[index].required = e.target.checked;
                        setTableRows(updatedRows);
                    }}
                />
                <div
                    className={`w-5 h-5 rounded border border-[#7E89AC] flex justify-center items-center cursor-pointer ${
                        row.required ? 'bg-primary-dark border-primary-dark' : ''
                    }`}
                    onClick={() => {
                        const updatedRows = [...tableRows];
                        updatedRows[index].required = !row.required;
                        setTableRows(updatedRows);
                    }}
                >
                    {row.required && <CheckedBox />}
                </div>
                <div className="text-mapi-text text-sm">Required</div>
            </div>
        </div>
    ))}
    <div className="flex justify-end w-full">
    <button
        onClick={(e)=>{e.preventDefault();handleAddRow(); console.log(tableRows)}}
        className="bg-primary-dark border border-[#616161] font-semibold text-sm py-1 px-4 rounded-md text-white"
    >
        Add a parameter
    </button>
    </div>
</div>

   <div className="flex flex-col bg-mapi-neutral-2 rounded mt-4 border border-[#404040] px-4 pt-6 pb-3 w-full justify-center gap-3 text-sm">
      <div className="flex items-center gap-5  ">
        <div className="text-[#9ABAE5] font-bold">Response</div>
        <div className="text-[#9ABAE5] bg-mapi-neutral-1 border border-[#9ABAE5] py-1 px-2">Example Value</div>
      </div>
      <div className="flex gap-3 mt-4">
       
      <div >
      {!showInput && (
    <select
        onChange={handleSelectChange}
        value={selectedOption || ''}
        className="border border-[#404040] py-1 pl-1 outline-none bg-[#081028] text-[#BFBFBF]"
    >
        <option value="">Add parameter</option>
        {options.map((option, index) => (
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
                                                    <button onClick={handleAddParameter}  disabled={!isValidStatusCode(newParameterValue)} className={`bg-primary-dark border border-[#616161] font-semibold text-sm  py-1 px-4 rounded-md text-white ${!isValidStatusCode(newParameterValue) ? `cursor-not-allowed` : `cursor-pointer`}`} >
                                                        Add Response code
                                                    </button>
                                                </div>
                                            )}
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
                                            onChange={(e) =>
                                                setSelectedMediaTypes(Array.from(e.target.selectedOptions, (option) => option.value))
                                            }
                                            className="add-plan w-60 h-20"
                                        >
                                            <option value="application/json">application/json</option>
                                            <option value="application/xml">application/xml</option>
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
    <div className="flex flex-wrap gap-3  ">
        {headers.map((header, index) => (
            <div key={index} className="flex gap-6 items-center   pl-[116px]">
                <input
                    type="text"
                    placeholder="Name"
                    value={header.name}
                    onChange={(e) => {
                        const updatedHeaders = [...headers];
                        updatedHeaders[index].name = e.target.value;
                        setHeaders(updatedHeaders);
                    }}
                    className="add-plan w-30"
                />
                <input
                    type="text"
                    placeholder="Value"
                    value={header.value}
                    onChange={(e) => {
                        const updatedHeaders = [...headers];
                        updatedHeaders[index].value = e.target.value;
                        setHeaders(updatedHeaders);
                    }}
                    className="add-plan w-30"
                />
            </div>
        ))}
        <button
            onClick={(e) => {e.preventDefault(); setHeaders([...headers, { name: '', value: '' }])}}
            className="bg-primary-dark border border-[#616161] font-semibold text-sm py-1 px-4 rounded-md text-white"
        >
            Add Header
        </button>
    </div>
</div>
                                    <div className="mb-1 mt-3 flex gap-6 items-center">
                                        <label htmlFor="bodyContent" className="text-sm font-semibold text-mapi-text w-24">
                                            Body <span className="text-red-500 -mt-3">*</span>  </label>
                                        <textarea
                                            id="bodyContent"
                                            className="add-plan w-1/2 h-24 "
                                            placeholder="Enter body content here..."
                                            value={bodyContent}
                                            onChange={(e) => setBodyContent(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                            )}
    </div>
      </div>
    </div>
                                </div>
                            )}
                            {activeSection === 'headers' && (
  <div>
    <div className="mb-1 flex flex-col gap-6 items-center">
      <div className="flex bg-mapi-neutral-2 border-b border-b-[#7E89AC] bg-opacity-30 px-20 pt-2 pb-3 w-full justify-between text-sm">
        <div className="text-[#9ABAE5]">Name</div>
        <div className="text-[#9ABAE5]">Value</div>
      </div>
      {headerRows.map((row, index) => (
        <div key={index} className="flex justify-between w-full pl-4 pr-16">
          <input
            type="text"
            value={row.name}
            onChange={(e) => {
              const updatedRows = [...headerRows];
              updatedRows[index].name = e.target.value;
              setHeaderRows(updatedRows);
            }}
            className="border border-[#404040] py-1 pl-1 outline-none bg-[#081028] text-[#BFBFBF] w-44"
            placeholder="Insert header name"
          />
          <input
            type="text"
            value={row.value}
            onChange={(e) => {
              const updatedRows = [...headerRows];
              updatedRows[index].value = e.target.value;
              setHeaderRows(updatedRows);
            }}
            className="border border-[#404040] py-1 pl-1 outline-none bg-[#081028] text-[#BFBF BF] w-44"
            placeholder="Insert header value"
          />
        </div>
      ))}
      <div className="flex justify-end w-full">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddHeaderRow();
          }}
          className="bg-primary-dark border border-[#616161] font-semibold text-sm py-1 px-4 rounded-md text-white"
        >
          Add a header
        </button>
      </div>
    </div>
  </div>
)} */}
                            {/* {activeSection === 'body' && (
                                <div>
                                  
                                    <div className="mb-1 flex gap-6 items-center">
                                        <textarea
                                            id="bodyContent" className="add-plan w-full h-40" placeholder="Enter body content here..."></textarea>
</div>
</div>
)} */}
<div className="flex gap-2 justify-end mt-5">
<button
                                    onClick={toggleAddEndpointModal}
                                    className="text-base py-2 px-4 text-white"
                                >
Cancel
</button>
<button
                                    onClick={handleAddEndpoint}
                                    className="bg-primary-dark border border-[#616161] font-bold text-base py-2 px-16 rounded-md text-white "
                                >
Save
</button>
</div>
</div>
</form>
</div>
</div>
</div>
);
};
export default AddEndpointPage;