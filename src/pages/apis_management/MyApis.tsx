import React from 'react'
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/app/store';
import { RootState } from '@/app/store';
import { FaSearch } from 'react-icons/fa'
import { fetchAllApis } from '@/components/features/apis_management/apiSlice';
import { fetchCategories } from '@/components/features/apis/categoriesSlice';
import ApiCard from '@/components/apis_management/ApiCard';
import Loading from '@/components/ui/Loading';
import ErrorLoading from '@/components/ErrorLoading';
import AddApiModal from '@/components/apis_management/AddApiModal';
import SideBarPro from '@/components/apis_management/SideBarPro';

const MyApis = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const api = useSelector((state: RootState) => state.apiProvider);

  useEffect(() => {
    dispatch(fetchAllApis());
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
      <div className='flex'>
      <SideBarPro/>
      <div className="container flex-1 bg-mapi-neutral-2 pt-4 px-8 ">
        <div className="flex items-center  py-2 mb-6 gap-12">
            <div className="font-semibold text-xl text-white ">
                List of APis
            </div>
            <div className="flex items-center gap-3 rounded-md shadow-lg bg-mapi-secondary-1  border border-[#343B4F] text-mapi-neutral-5 p-2 w-96 ">
            <FaSearch/>
            <input type="text"  className='border-none outline-none bg-transparent' placeholder='Search'/>
            </div>
            <button onClick={() => setShowModal(true)} className='py-2 px-7 bg-mapi-secondary-2 text-white font-bold  text-sm border-none rounded'>
                Add New Api
            </button>
        </div>
      
      {!api.loading && api.apis.length > 0 ? (  
      <div className="list-apis pl-4 gap-5 w-full flex flex-wrap">
      {api.apis.map((api) => (
      <ApiCard api={api} />
      ))}
        </div>
        ) : api.loading ? (  
            <Loading/>
        ) : api.error ? (
            <ErrorLoading/>
        ) : null}
            
        <AddApiModal
        showModal={showModal}
        setShowModal={setShowModal}
        />
      </div>
    </div>
  )
}

export default MyApis
