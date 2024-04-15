import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-mapi-neutral-2 text-white py-4 fixed bottom-0 w-full border-t-2 border-corner-1-300">
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
            <FontAwesomeIcon icon={faDiscord} className="text-white opacity-70 text-lg hover:text-mapi-secondary-3" />
            <FontAwesomeIcon icon={faTwitter} className="text-white opacity-70 text-lg hover:text-mapi-secondary-3" />
            <FontAwesomeIcon icon={faInstagram} className="text-white opacity-70 text-lg hover:text-mapi-secondary-3" />
            <FontAwesomeIcon icon={faYoutube} className="text-white opacity-70 text-lg hover:text-mapi-secondary-3" />
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
            <li><a href="#" className="text-white hover:text-mapi-secondary-3">Explore</a></li>
            <li><a href="#" className="text-white hover:text-mapi-secondary-3">Articles</a></li>
            <li><a href="#" className="text-white hover:text-mapi-secondary-3">How it works</a></li>
            <li><a href="#" className="text-white hover:text-mapi-secondary-3">Help</a></li>
            </ul>
            <ul className="flex space-x-8">
            <li><a href="#" className="text-white hover:text-mapi-secondary-3">Tokens</a></li>
            <li><a href="#" className="text-white hover:text-mapi-secondary-3">API</a></li>
            <li><a href="#" className="text-white hover:text-mapi-secondary-3">BigBounty</a></li>
            <li><a href="#" className="text-white hover:text-mapi-secondary-3">Become Partners</a></li>
            </ul>
        </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
