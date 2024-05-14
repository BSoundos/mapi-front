import { useState } from "react";
import { RootState, useAppDispatch } from "@/app/store";
import { useSelector } from "react-redux";
import { AddObjectProps } from "@/types/AddObjectProps";
import { useParams } from "react-router-dom";
import SideBarPro from "@/components/apis_management/SideBarPro";
import Navbar from "@/components/NavbarProvider";
import CheckedBox from "@/components/ui/CheckedBox";

const AddEndpointPage = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const [addEndpointFormData, setAddEndpointFormData] = useState({
        name: '/',
        description: '',
        recommended:false,
        endpoints: [],
    });
    const [activeSection, setActiveSection] = useState('query');

    const toggleAddEndpointModal = () => {
        setAddEndpointFormData({
            name: '/',
            description: '',
            recommended:false,
            endpoints: [],
        });
    };

    const handleAddEndpointInputChange = (e) => {
        if (e.target.name === 'endpoints') {
            const selectedOptions = Array.from(
                e.target.selectedOptions
            ).map((option: HTMLOptionElement) => option.value);
            setAddEndpointFormData({ ...addEndpointFormData, [e.target.name]: selectedOptions });
        } else {
            setAddEndpointFormData({ ...addEndpointFormData, [e.target.name]: e.target.value });
        }
    };

    const endpoints = useSelector((state: RootState) => state.endpoints.endpoints);

    const handleAddEndpoint = (e: React.FormEvent) => {
        e.preventDefault();
        // dispatch(AddEndpoint({id:versionId,data:addEndpointFormData}))
    };
    const DATA_TYPE_CHOICES = [
        ['STRING', 'STRING'],
        ['ENUM', 'ENUM'],
        ['NUMBER', 'NUMBER'],
        ['BOOLEAN', 'BOOLEAN'],
        ['DATE(YYYY-MM-DD)', 'DATE(YYYY-MM-DD)'],
        ['TIME(24H-HH:MM)', 'TIME(24H-HH:MM)'],
        ['OBJECT', 'OBJECT'],
        ['ARRAY', 'ARRAY'],
    ];

    return (
        <div className="flex ">
            <SideBarPro />
            <div className="bg-mapi-neutral-2 flex-1 ">
                <Navbar id={id} />
                <div className="container px-5 flex-1 mt-8 pl-14 ">
                    <h2 className="text-white text-2xl font-bold">Add Endpoint</h2>
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
                                    value={addEndpointFormData.name}
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
                                    value={addEndpointFormData.description}
                                    onChange={handleAddEndpointInputChange}
                                    className="add-plan w-60 h-20"
                                />
                            </div>
                            <div className="mb-2 flex gap-2 items-center">
                                <select
                                    id="endpoint"
                                    name="endpoints"
                                    onChange={handleAddEndpointInputChange}
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
                                    value={addEndpointFormData.name}
                                    onChange={handleAddEndpointInputChange}
                                    className="border border-[#404040] p-1 outline-none bg-[#081028] text-[#BFBFBF] w-2/3"
                                />
                              <div className="text-sm text-mapi-text">Use &#123;curly braces&#125; to indicate path parameters if needed. e.g., /employees/&#123;id&#125;</div>                                </div>
                            </div>
                            {/* New navbar section */}
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
                                <div>
                                    <div className="mb-1 flex flex-col gap-6 items-center">
                                        <div className="flex bg-mapi-neutral-2 border-b border-b-[#7E89AC] bg-opacity-30 px-20 pt-2 pb-3 w-full justify-between text-sm">
                                            <div className="text-[#9ABAE5]">Name</div>
                                            <div className="text-[#9ABAE5]">Type</div>
                                            <div className="text-[#9ABAE5]">Example Value</div>
                                            <div className="text-[#9ABAE5]">Required</div>
                                        </div>
                                        <div className="flex justify-between w-full pl-4">
                                        <input
                                            type="text"
                                            id="queryParam"
                                            name="queryParam"
                                            className="border border-[#404040] p-1 outline-none bg-[#081028] text-[#BFBFBF] w-44"
                                            placeholder="Insert parameter name"
                                        />
                                        <select
                                            id="endpoint"
                                            name="endpoints"
                                            onChange={handleAddEndpointInputChange}
                                            className="w-20 border border-[#7E89AC] border-opacity-30 py-0.5 text-sm outline-none bg-[#081028] text-[#BFBFBF]"
                                        >
                                            {DATA_TYPE_CHOICES.map(([value, label]) => (
                                                <option key={value} value={value} className="text-sm">
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            id="queryParam"
                                            name="queryParam"
                                            className="border border-[#404040] p-1 outline-none bg-[#081028] text-[#BFBFBF] w-44"
                                            placeholder="Insert example value"
                                        />
                                         <input
                                                id="recommended"
                                                className="hidden"
                                                type="checkbox"
                                                checked={addEndpointFormData.recommended}
                                                name="recommended"
                                                onChange={handleAddEndpointInputChange}
                                         />
                                        <div
                                        className={`w-5 h-5 rounded border border-[#7E89AC] flex justify-center items-center cursor-pointer ${
                                            addEndpointFormData.recommended ? 'bg-primary-dark border-primary-dark' : ''
                                        }`}
                                        onClick={() => handleAddEndpointInputChange({
                                            target: {
                                            name: 'recommended',
                                            value: !addEndpointFormData.recommended,
                                            },
                                        })}
                                        >
                                        {addEndpointFormData.recommended && (
                                        <CheckedBox/>
                                        )}

                                        
                                         </div>
                                        </div>
                                    </div>
                                    {/* Add more fields for type, example, required, etc. */}
                                </div>
                            )}
                            {activeSection === 'headers' && (
                                <div>
                                    {/* Headers section content */}
                                    <div className="mb-1 flex gap-6 items-center">
                                        <label htmlFor="headerParam" className="text-sm font-semibold text-mapi-text w-20">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="headerParam"
                                            name="headerParam"
                                            className="add-plan w-60"
                                        />
                                    </div>
                                    {/* Add more fields for type, example, required, etc. */}
                                </div>
                            )}
                            {activeSection === 'body' && (
                                <div>
                                    {/* Body section content */}
                                    <div className="mb-1 flex gap-6 items-center">
                                        <textarea
                                            id="bodyContent" className="add-plan w-full h-40" placeholder="Enter body content here..."></textarea>
</div>
</div>
)}
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