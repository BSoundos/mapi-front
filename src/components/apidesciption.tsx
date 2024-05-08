import React from "react";
import img2 from "@/assets/Development_Icon.png"
import "@/styles/index.css"
import { Link } from 'react-router-dom';

interface ApidescriptionProps {
      id: number;
      name: string;
      description: string;
      category_name: string
}
const Apidescription: React.FC<ApidescriptionProps> = ({ id, name, description, category_name }) => {
      return (
            <div className="bg-[#0B1739] m-2 p-4 border border-opacity-30 border-[#343B4F] rounded-xl shadow-md w-[30%] ">
                  <Link to={`/api/about/${id}`}><h2 className="font-semibold text-sm text-white py-3">{name}</h2></Link>
                  <p className="text-[#AEB9E1] text-xs pb-2 overflow-y-auto min-h-[50px] max-h-[50px] ">{description}</p>
                  <div className="flex items-center justify-between">
                        <div className="flex mt-4 py-0.5 px-1 bg-[#57C3FF] bg-opacity-30  border border-[#57C3FF] border-opacity-30 rounded-sm">
                              <img className="w-[10px]" src={img2} />
                              <p className="text-white text-xs font-semibold pl-2">{category_name}</p>
                        </div>

                  </div>
            </div>
      );
};

export default Apidescription;