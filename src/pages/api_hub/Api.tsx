import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/NavBar';
import NavBar2 from '@/components/NavBar2';
import Review from '@/components/Review';

import AjouterReview from '@/components/AjouterReview';
import { Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { BACKEND_BASE_URL } from '@/data/constants';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const Api: React.FC = () => {

  const { id } = useParams();
  // const status = useSelector((state: RootState) => state.AboutSlice.status);
  // const error = useSelector((state: RootState) => state.AboutSlice.error);
  // const [data, setData] = useState<any>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${BACKEND_BASE_URL}/apis_exploitation/api/${id}`);
  //       const data = response.data;
  //       setData(data);
  //     } catch (error) {
  //       console.error('Une erreur s\'est produite lors de la récupération des données:', error);
  //     }
  //   };
  //   fetchData()
  // }, []);

  // useEffect(() => {
  //   if (id && !isNaN(parseInt(id))) {
  //     dispatch(fetchApiById(parseInt(id)));
  //   }
  // }, [dispatch, id]);

  // switch (status) {
  //   case 'loading':
  //     return <div>Chargement en cours...</div>;
  //   case 'failed':
  //     return <div>Une erreur est survenue : {error}</div>;
  //   case 'succeeded':
  // }

  return (
    <main>
      <Navbar></Navbar>
      <div className='bg-mapi-neutral-2 px-16 pt-4 pb-16 min-h-screen font-inter'>
        <div className='border border-opacity-30 border-[#7E89AC] rounded-[9px] shadow-md'>
          <NavBar2 />
          <section className=''>
            <Outlet />
          </section>
        </div>
      </div>
    </main>
  );
}

export default Api;
