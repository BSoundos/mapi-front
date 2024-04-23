import React from 'react';
import { useState } from 'react';
import "@/styles/index.css"
import NavBar2 from '../../components/NavBar2';
import Review from '../../components/Review';
import PaginationR from '../../components/PaginationR';
import AjouterReview from '../../components/AjouterReview';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import axios from 'axios';




const AboutPage: React.FC = () => {

  const { id } = useParams();

  const status = useSelector((state: RootState) => state.AboutSlice.status);
  const error = useSelector((state: RootState) => state.AboutSlice.error);
  const [data, setData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/apis_exploitation/api/${id}`);
        const data = response.data;
        // Utilisez les données récupérées ici
        setData(data);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données:', error);
      }
    };
    fetchData()
  }, []);

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
  const totalReviews = 5;
  const reviewsPerPage = 3; // le nmb de review par page 

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = Math.min(startIndex + reviewsPerPage, totalReviews);

  const renderReviews = () => {
    const reviews = [];
    for (let i = startIndex; i < endIndex; i++) {
      reviews.push(<Review key={i} />);
    }
    return reviews;
  };
  // const openAddReviewWindow = () => {
  //   const newWindow = window.open('', '_blank', 'width=600,height=400');
  //   if (newWindow) {
  //     newWindow.document.title = 'Add Review';

  //     newWindow.document.body.innerHTML = '<div id="root"></div>';
  //     ReactDOM.createRoot(document.getElementById('root')!).render(
  //       <React.StrictMode>
  //         <Provider store={store}>
  //         <AjouterReview />
  //         </Provider>
  //       </React.StrictMode>,
  //     )
  //   }
  // };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='bg-[#0B1739] pl-16 pr-8 pt-4 pb-32'>
      <div className='border border-opacity-30 border-[#7E89AC] rounded shadow-md'>
        <NavBar2 data={data} />
        <div className='pl-16 pr-8 py-2'>
          {data && (<p className='text-[#FFFFFF] opacity-80 pb-4'>{data.description}</p>)}

          <p className='text-[#FFFFFF] opacity-80 pb-4'>Chat with us live on Discord: https://discord.gg/wxJxGsZgha</p>
        </div>
        <div className='flex items-center justify-between pl-16 pr-8 py-2'>
          <p className='text-white font-Inter font-semibold text-2xl'>Reviews</p>
          <button onClick={handleOpenModal} className='text-[#21C3FC] bg-[#081028] w-fit py-1 px-2 border border-[#7E89AC] border-opacity-30 rounded-lg' >+ New Review</button>
          <AjouterReview isOpen={isModalOpen} onClose={handleCloseModal} />
          {/* onClick={openAddReviewWindow} */}
        </div>
        <div className='pl-16 pr-8 py-2'>
          {renderReviews()}
          {/* <Review/>
                  <Review/>
                  <Review/>
                  <Review/>
                  <Review/> */}
          <div className='flex items-center justify-center pt-8 pb-20'>
            <PaginationR
              currentPage={currentPage}
              totalPages={Math.ceil(totalReviews / reviewsPerPage)}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
