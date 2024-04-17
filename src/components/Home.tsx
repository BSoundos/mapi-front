import Navbar from './NavBar'
import loginBgFlipped from '../assets/loginBgFlipped.png'
import Footer from './Footer'
import uploadIcon from '../assets/icons/upload.svg'
import listIcon from '../assets/icons/list.svg'
import walletIcon from '../assets/icons/wallet.svg'
const Home = () => {
    return (
        <div className='bg-mapi-neutral-2 min-h-screen font-plus-jakarta-sans' >
            <div className="bg-center bg-cover" style={{ backgroundImage: `url(${loginBgFlipped})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} >
                <Navbar />
                <section className=' font-medium text-white text-7xl ml-40 mt-32'>
                    <h1 className='pb-4'>Discover</h1>
                    <h1 className='pb-4'>Sell & Buy</h1>
                    <h1 className='text-primary-normal font-extrabold pb-4'>Extraordinary</h1>
                    <h1 className='pb-4'>APIs</h1>
                </section>
                <div className=' font-medium text-white mt-4 mb-6 ml-20 w-1/3 flex gap-6 align-middle justify-center'>
                    <button className="bg-secondary-blue text-white opacity-75 w-1/3 px-4 py-2 rounded-md border border-corner-1-300 border-0.5 text-sm">
                        Explore
                    </button>
                    <button className="bg-mapi-secondary-1 text-white opacity-75 w-1/3 px-4 py-2 rounded-md border border-corner-1-300 border-0.5 text-sm">
                        Upload
                    </button>
                </div>
                {/* Stats + users */}
                <aside className='text-white ml-24 mb-16 w-1/3 flex justify-center'>
                    <div className='w-1/4 flex flex-col justify-center'>
                        <p className='text-2xl'>+1K</p>
                        <p className='text-xs w-fit'>Providers</p>
                    </div>
                    <div className='w-1/4 flex flex-col justify-center'>
                        <p className='text-2xl'>+50K</p>
                        <p className='text-xs w-fit'>Users</p>
                    </div>
                    <div className='w-1/4 flex flex-col justify-center'>
                        <p className='text-2xl'>+10K</p>
                        <p className='text-xs w-fit'>Community</p>
                    </div>
                </aside>

                <div className='bg-gradient-to-l from-mapi-neutral-3 to-white/5 rounded-lg shadow-lg w-3/4 m-auto px-8 py-6 font-plus-jakarta-sans text-white'>
                    <h1 className='font-semibold text-4xl text-center mb-6'>Create & Sell your API</h1>
                    <div className='flex gap-6 justify-between mb-16'>
                        <div className='text-center w-1/3'>
                            <img src={uploadIcon} alt="upload" className='h-12 w-12 m-auto mb-4' />
                            <h2 className='text-2xl mb-4'>Upload & Create Collection</h2>
                            <p className='text-xs opacity-75'>Upload your API then provide necessary details, descriptions and set a secondary sales fee.</p>
                        </div>
                        <div className='text-center w-1/3'>
                            <img src={listIcon} alt="list" className='h-12 w-12 m-auto mb-4' />
                            <h2 className='text-2xl mb-4'>List them for sale</h2>
                            <p className='text-xs opacity-75'>Set up the pricing policy for your API along with different payment methods that you find suitable</p>
                        </div>
                        <div className='text-center w-1/3'>
                            <img src={walletIcon} alt="wallet" className='h-12 w-12 m-auto mb-4' />
                            <h2 className='text-2xl mb-4'>Set up your wallet</h2>
                            <p className='text-xs opacity-75'>That's it! Each time your API is bought, you earn money!</p>
                        </div>

                    </div>
                </div>
                {/* Provider section */}
            </div>
            <hr className='w-2/3 m-auto mt-20 h-[1px] bg-secondary-gray rounded-md opacity-25' />
            {/* Popular apis */}
            {/* Get More Updates */}
            <Footer />
        </div>
    )
}

export default Home