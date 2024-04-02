import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-mapi-neutral-2 text-white py-4 fixed bottom-0 w-full">
      <div className="container mx-auto px-60 flex flex-col md:flex-row items-center justify-between">


        {/* Left Section */}
        <div className="flex flex-col ">
          {/* Logo and All Rights Reserved Text */}
          <div className="flex items-center">
            <img src="src/assets/logo.png" alt="Logo" className="h-8 w-auto mr-4" />
            <p className="mr-4 text-xs">© 2024 All Rights Reserved</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4 mt-2">
            <FontAwesomeIcon icon={faDiscord} className="text-white opacity-70 text-lg hover:text-secondary-blue" />
            <FontAwesomeIcon icon={faTwitter} className="text-white opacity-70 text-lg hover:text-secondary-blue" />
            <FontAwesomeIcon icon={faInstagram} className="text-white opacity-70 text-lg hover:text-secondary-blue" />
            <FontAwesomeIcon icon={faYoutube} className="text-white opacity-70 text-lg hover:text-secondary-blue" />
          </div>
        </div>



        {/* Right Section */}
        <div className="flex space-x-9 ">
        <div className="flex flex-col">
            <p className="mr-4  font-bold">Marketplace</p>
            <p className="mr-4 font-bold">Links</p>
        </div>
        <div className="flex flex-col">
            <ul className="flex  space-x-8">
            <li><a href="#" className="text-white hover:text-secondary-blue">Explore</a></li>
            <li><a href="#" className="text-white hover:text-secondary-blue">Articles</a></li>
            <li><a href="#" className="text-white hover:text-secondary-blue">How it works</a></li>
            <li><a href="#" className="text-white hover:text-secondary-blue">Help</a></li>
            </ul>
            <ul className="flex space-x-8">
            <li><a href="#" className="text-white hover:text-secondary-blue">Tokens</a></li>
            <li><a href="#" className="text-white hover:text-secondary-blue">API</a></li>
            <li><a href="#" className="text-white hover:text-secondary-blue">BigBounty</a></li>
            <li><a href="#" className="text-white hover:text-secondary-blue">Become Partners</a></li>
            </ul>
        </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
