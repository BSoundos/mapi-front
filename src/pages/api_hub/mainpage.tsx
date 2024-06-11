import React from 'react';
import search from '@/assets/search.png';
import logo1 from '@/assets/logo_1.png'
import img from '@/assets/Img.png'
import Apidescription from "@/components/apidesciption"
import "@/styles/index.css"
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchPopularAPIs } from '@/components/features/apis/ApiSlice';
import { RootState, useAppDispatch } from '@/app/store';
import { searchAPIs, FilterCategorie, FilterFonctionnalite } from '@/components/features/apis/ApiSlice';
import { fetchCategories } from '@/components/features/apis/categoriesSlice';
import { fetchFunctionalities } from '@/components/features/apis/functionalitiesSlice';
import { functionality } from '@/types/functionality';
import { categorie } from '@/types/categorie';
import { Api } from '@/types/API';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Loading from '@/components/ui/Loading';

const MainPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const popularAPIs = useSelector((state: RootState) => state.api.popularAPIs);
   

    const [searchTerm, setSearchTerm] = useState('');
    const [categorieItem, setcategorieItem] = useState('');
    const [searchResults, setSearchResults] = useState<Api[]>([]);


    const allCategories = useSelector((state: RootState) => state.categories.categories);
    const allFunctionalities = useSelector((state: RootState) => state.functionalities.functionalities);
    const categoriesLoading = useSelector((state: RootState) => state.categories.loading);
    const functionalitiesLoading = useSelector((state: RootState) => state.functionalities.loading);


    const [Categories, setCategories] = useState<categorie[]>(allCategories);
    const [Fonctionnalities, setFonctionnalities] = useState<functionality[]>(allFunctionalities);
    const [showAllCategories, setShowAllCategories] = useState(false);


    const filteredCategories = showAllCategories ? Categories : Categories.slice(0, 4);



    useEffect(() => {
        dispatch(fetchPopularAPIs());
        dispatch(fetchCategories());
        dispatch(fetchFunctionalities());

    }, [dispatch]);

    useEffect(() => {
        setCategories(allCategories);
        setFonctionnalities(allFunctionalities);
    }, [allCategories, allFunctionalities]);

    useEffect(() => {
        setSearchResults(popularAPIs);
    }, [popularAPIs]);


    const handleSearch = async () => {
        const actionResult = await dispatch(searchAPIs(searchTerm));
        if (searchAPIs.fulfilled.match(actionResult)) {
            setSearchResults(actionResult.payload);
        }
    };


    const handleFilterCategorie = async (selectedCategory: string) => {
        const actionResult = await dispatch(FilterCategorie(selectedCategory));
        if (FilterCategorie.fulfilled.match(actionResult)) {
            setSearchResults(actionResult.payload);
        }
    };
    const handleFilterFonctionnalite = async (selectedCategory: string) => {
        const actionResult = await dispatch(FilterFonctionnalite(selectedCategory));
        if (FilterFonctionnalite.fulfilled.match(actionResult)) {
            setSearchResults(actionResult.payload);
        }
    };

    const handleSort = (attribute: keyof Api) => {

        if (!searchResults || searchResults.length === 0) {
            console.warn("searchResults is empty or not initialized.");
            return;
        }

        const sortedResults = [...searchResults];
        const firstResult = sortedResults[0];

        if (!firstResult) {
            console.warn("First element in sortedResults is undefined.");
            return;
        }


        if (!(attribute in firstResult)) {
            console.warn(`Attribute "${attribute}" does not exist in the first element.`);
            return;
        }

        sortedResults.sort((a, b) => {
            const valA = a[attribute];
            const valB = b[attribute];

            if (valA == null) {
                return valB == null ? 0 : 1;
            }
            if (valB == null) {
                return -1;
            }


            if (typeof valA === 'string' && typeof valB === 'string') {
                return -valA.localeCompare(valB);
            } else if (typeof valA === 'number' && typeof valB === 'number') {
                return valB - valA;
            }

            return 0;
        });

        setSearchResults(sortedResults);
    };



    // if (status === 'loading') {
    //     return <div>Loading...</div>;
    // }

    // if (status === 'failed') {
    //     return <div>Error: {error}</div>;
    // }


    const allLoading = categoriesLoading || functionalitiesLoading;

    if (allLoading) {
        return <Loading/>; 
    }



    return (
        <main>
            <Navbar />
            <div>
                <div className='bg-[#081028] min-h-screen p-10'>
                    <div className='flex flex-col  bg-[#FFFFFF] bg-opacity-5 py-4 items-center justify-center border border-opacity-30 border-[#7E89AC] rounded shadow-md'>
                        <div className='flex'><p className="font-semibold font-inter text-white text-3xl pr-4">Welcome To</p><img className='w-20' src={logo1} /></div>
                        <h4 className='font-inter text-[#BDBDBD] text-opacity-75 pb-4'>Discover and connect to thousands of APIs</h4>
                        <div className="flex items-center bg-[#0B1739] border border-opacity-30 border-[#7E89AC] w-[80%] rounded p-2">
                            <div className="mx-2 cursor-pointer">
                                <img src={search} height="24" width="24" />
                            </div>
                            <input type="text" value={searchTerm}
                                onChange={(e) => {setSearchTerm(e.target.value),setSearchResults(popularAPIs)}}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch();
                                        setSearchTerm('');
                                    }
                                }}
                                placeholder="Search for APIs" className="flex-grow bg-[#0B1739] text-[#FFFFFF] text-sm focus:outline-none" />

                        </div>

                        <div className=' flex justify-center space-between font-inter text-[#BDBDBD] py-5 '>
                            <div className='flex mr-20'>
                                <p className='mt-2 text-sm pr-2 '>Category:</p>
                                <select id="select1"
                                    onChange={(e) => {
                                        setSearchTerm("");
                                        const selectedCategory = e.target.value;
                                        handleFilterCategorie(selectedCategory);
                                    }}
                                    className='border border-opacity-30 border-[#7E89AC] rounded p-2 bg-[#0B1739] text-xs pr-20'>
                                    <option value="">Select a category</option>
                                    {Categories.map((category) => (
                                        <option key={category.id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex '>
                                <p className='mt-2 text-sm pr-2 '>Functionality:</p>
                                <select id="select2"
                                    onChange={(e) => {
                                        setSearchTerm("");
                                        const selectedFonctionnaliter = e.target.value;
                                        handleFilterFonctionnalite(selectedFonctionnaliter);
                                    }}
                                    className='border border-opacity-30 border-[#7E89AC] rounded p-2 bg-[#0B1739] text-xs pr-20'>
                                    <option value="">Select a Fonctionnalite</option>
                                    {Fonctionnalities.map((fonctionnaliter) => (
                                        <option key={fonctionnaliter.id} value={fonctionnaliter.name}>
                                            {fonctionnaliter.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex ml-20'>
                                <p className='mt-2 text-sm pr-2 '>Sort By:</p>
                                <select id="select3"
                                    onChange={(e) => {
                                        setSearchTerm("");
                                        const selectedFonctionnaliter = e.target.value as keyof Api;
                                        handleSort(selectedFonctionnaliter);
                                    }}
                                    className='border border-opacity-30 border-[#7E89AC] rounded p-2 bg-[#0B1739] text-xs pr-20'>
                                    <option value="">Select a attribut</option>
                                    <option value="popularity">popularity</option>
                                    <option value="votes">votes</option>
                                    <option value="latency">latency</option>
                                    <option value="service_level">service_level</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex py-4 '>
                        <div className="flex flex-col   bg-[#FFFFFF] bg-opacity-5 py-4  border border-opacity-30 border-[#7E89AC] rounded shadow-md  pl-4  w-[20%] ">
                            <h1 className=' font-semibold font-inter text-[#FFFFFF] pb-2 '>Categories</h1>
                            {filteredCategories.map((category, index) => (
                                <a key={index} href="#" onClick={() => {
                                    setcategorieItem(category.name);
                                    handleFilterCategorie(category.name);
                                }} className='font-inter text-[#007BFF] text-xs py-2' >{category.name}</a>
                            ))}



                            <div className='flex  '>
                                {!showAllCategories && (
                                    <div className='flex'>
                                        <img src={img} className='w-5' />
                                        <a className='font-inter text-[#007BFF] text-xs py-2 pl-2' onClick={() => setShowAllCategories(true)}>
                                            View All Categories
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* {searchResults.length < 0 && (
                            <div className=' bg-[#] border border-opacity-30 border-[#7E89AC] rounded shadow-md w-[80%] ml-4 p-4' >
                                <p className='font-semibold font-inter text-[#FFFFFF] pb-2 '>Popular APIs</p>
                                <div className='flex flex-wrap'>
                                    {popularAPIs.map(api => (
                                        <Apidescription key={api.api_id} id={api.api_id} name={api.name} description={api.description} category_name={api.category_name} />
                                    ))}
                                </div>

                            </div>
                        )} */}
                        {searchResults.length == 0 && (
                            <div className=' bg-[#] border border-opacity-30 border-[#7E89AC] rounded shadow-md w-[80%] ml-4 p-4' >
                               
                                <div className='flex flex-wrap w-full justify-center pt-6'>
                                    <p className=' font-inter text-[#FFFFFF] pb-2 '>No API matching the search query has been found.</p>
                                </div>

                            </div>
                        )}
                        {searchResults.length > 0 && (
                            <div className=' bg-[#] border border-opacity-30 border-[#7E89AC] rounded shadow-md w-[80%] ml-4 p-4' >
                                <div className='flex flex-wrap'>
                                    {searchResults.map(api => (
                                        <Apidescription key={api.api_id} id={api.api_id} name={api.name} description={api.description} category_name={api.category_name} />
                                    ))}
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default MainPage;
