
import Navbar from "@/components/NavbarProvider";

import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import SideBarPro from "@/components/apis_management/SideBarPro";
import { FaSearch } from "react-icons/fa";
import AddEndpointModal from "@/components/apis_management/AddEndpointModal";
import { useState } from "react";
import ListEndpoints from "@/components/apis_management/ListEndpoints";

export default function EndpointsApi() {
 
  const { id } = useParams<{ id: string }>();
  const [showAddEndpointModal,setShowAddEndpointModal]=useState(false);
 

  



  return (
    <div className="flex ">
      <SideBarPro />
      <div className="bg-mapi-neutral-2 flex-1 ">
        <Navbar id={id} />
        <div className="container px-5 flex-1 mt-8 pl-14 overflow-y-auto max-h-[80vh]  scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-secondary-blue scrollbar-track-[#3E3C52]">
          <h2 className="text-white text-2xl font-bold">Endpoints Configuration</h2>
          <div className="flex-col  mt-5">
            <h5 className="text-base text-[#9ABAE5] mb-7">Add and define your API endpoints.</h5>
            <div className="flex justify-between w-full items-center mb-5">
            <div className="flex items-center gap-3 rounded-md shadow-lg bg-mapi-secondary-1  border border-[#343B4F] text-mapi-neutral-5 px-2 py-1 w-60">
            <input type="text"  className='border-none outline-none bg-transparent' placeholder='Search'/>
            <FaSearch/>
            </div>
            <div className="flex flex-1 justify-end gap-2">
            <Link to="/add-enpoint">
            <button  className="bg-[#2C5EAF] bg-opacity-15 border border-[#616161] text-[#99BDE6] text-opacity-85 py-1 px-3 rounded text-sm  font-semibold w-fit">+ Add Endpoint </button>
            </Link>
            {showAddEndpointModal && <AddEndpointModal showModal={showAddEndpointModal} setShowModal={setShowAddEndpointModal} versionId={1}/>}
            <button onClick={()=>setShowAddEndpointModal(true)} className="bg-[#D53939]  border border-[#7E89AC] text-[#FFFFFF] border-opacity-30 py-1 px-4 rounded text-sm   w-fit">Delete </button>
            </div>
            </div>
            <ListEndpoints/>
            
          </div>
        </div>
      </div>
    </div>
  );
}
