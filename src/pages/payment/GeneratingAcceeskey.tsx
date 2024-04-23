import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../../app/store';
import { generateAccessKey } from '../../components/slices/generateAccessKeySlice';
export type AppDispatch = typeof store.dispatch
import { useParams } from 'react-router-dom'; // Importer useParams




const GeneratingAccessKeyPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { apiVersion, planId } = useParams(); // Extraire les paramètres dynamiques de l'URL
  const { accessKey, loading, error } = useSelector((state: RootState) => state.accesskey);

  useEffect(() => {
    dispatch(generateAccessKey({ versionApiId: apiVersion || '', planId: planId || '' }));
  }, [dispatch, apiVersion, planId]);

  console.log(accessKey)
  return (

    <div className="h-screen flex justify-center items-center bg-mapi-neutral-2 mx-auto  ">
      <div className=" bg-mapi-neutral-2 w-full mx-auto my-8 sm:mx-4 flex flex-col items-center lg:w-3/4 xl:w-3/3 border border-gray-300 border-opacity-30 rounded-lg overflow-hidden shadow-2xl ">
        <br />

        <div className="access-key-container">
          {accessKey && (
            <div className="bg-mapi-neutral-2  w-full mx-auto flex flex-col items-center text-neutral text-plus-jakarta-sans font-plus-jakarta-sans">
              <h3 className="access-key-success-title text-plus-jakarta-sans text-3xl font-bold">Access Key Generated Successfully</h3>
              <br /><br />
              <div className="access-key-info-container">
                <p className="access-key-text text-2xl text-plus-jakarta-sans mx-10 text-center">
                  Congratulations! You have successfully subscribed to the API..
                </p>
                <p className="access-key-text text-xl text-plus-jakarta-sans mx-10 text-center">
                  Below is your access key , make sure to keep it secure.
                </p>

                <p className="access-key-value text-lg mt-5 mx-10 text-plus-jakarta-sans text-center">Your access key is:</p>
                <div className="bg-mapi-neutral-2 bg-opacity-60 border border-opacity-60 border-solid border-white rounded-md p-4 flex items-center w-30 h-12 mx-auto mb-8">
                  <div className="flex items-center w-full">
                    <span className="flex-none mr-4">
                      <i className="fas fa-key text-primary-normal"></i>
                    </span>
                    <span className="flex-grow">{accessKey}</span>
                    <button onClick={() => navigator.clipboard.writeText(accessKey)} className=" py-2 px-4 ml-5 mr-1 text-plus-jakarta-sans text-xs rounded-md font-medium hover:bg-mapi-secondary-5 hover:text-white transition-colors duration-300">Copy</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div></div></div>


  );

};

export default GeneratingAccessKeyPage;
