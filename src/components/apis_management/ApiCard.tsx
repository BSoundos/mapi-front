import { Link } from "react-router-dom"

export default function ApiCard({api}) {
  return (
    <Link  to={`/general-api/${api.api_id}`} className="flex p-4 rounded-md bg-mapi-secondary-1 w-[30%]  border border-[#343B4F]  flex-col  ">
          <h4 className='font-semibold text-white mb-4'>{api.name}</h4>
          <p className='text-mapi-neutral-5 font-medium text-xs mb-6 h-1/2'>{api.description}
          </p>
          <div className="flex justify-between  items-center">
           <div className="flex gap-1  items-center p-1  border-blue-500 border-opacity-20 bg-blue-500 bg-opacity-20 rounded-sm border">
            <p className='text-white font-medium text-[10px]'>{api.category.name}</p>
           </div>     
            </div>
         </Link>
  )
}
