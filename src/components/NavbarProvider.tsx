import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { getAllVersions } from './features/apis_management/versionSlice';
import { RootState, useAppDispatch } from '@/app/store';

function Navbar({ id }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch=useAppDispatch();
  const pathname = location.pathname;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);

  const { currentVersion, draftVersions, activeVersions } = useSelector(
    (state:RootState) => state.versions
  );

  useEffect(() => {
    if (currentVersion) {
      setSelectedVersion(currentVersion);
    }
  }, [currentVersion]);
 
  useEffect(() => {
    dispatch(getAllVersions(id)); 
  }, [dispatch, id]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleVersionClick = (version) => {
    if (version) {
      setSelectedVersion(version);
      setIsDropdownOpen(false);
      navigate(`${pathname}?versionId=${version.api_version_id}`);
    }
  };

  const items = [
    { text: 'General', path: `/general-api/${id}` },
    { text: 'Endpoints', path: `/endpoint-api/${id}`},
    { text: 'Pricing', path: `/pricing-api/public/${id}` },
    { text: 'Versions', path: `/version-api/${id}` },
  ];

  return (
    <div className="">
      <div className="bg-mapi-neutral-2 border-b-[#343B4F] border-b flex justify-between pl-12 pt-3 items-center">
        <div className="flex gap-5">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`text-base pb-4 mr-5 ${
                (item.text === 'Pricing' &&
               (pathname === '/pricing/public' || pathname.includes('pricing'))) ||
                 pathname === item.path
                  ? 'text-mapi-secondary-3 border-b-2 border-b-mapi-secondary-3 font-bold'
                  : 'text-white'
              }`}
            >
              <span className="">{item.text}</span>
            </Link>
          ))}
        </div>
        <div className="relative mr-20 bg-mapi-neutral-3  px-4 -mt-3 rounded-md h-10 flex items-center ">
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <span className="mr-2 text-mapi-neutral-8 ">
              Version v{selectedVersion ? selectedVersion.version_number : 'Current'}
            </span>
            <span className='py-0.5 px-2 bg-[#40BF7F] bg-opacity-15 text-[#37A46E] rounded-full'>
              {selectedVersion == currentVersion ? 'Current' : "" }
            </span>
            <IoIosArrowDown
              className={`transition-transform text-mapi-neutral-8 ml-2 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </div>
          {isDropdownOpen && (
            <div className="absolute z-10 top-[40px] w-full left-0 rounded-sm bg-mapi-neutral-3">
              <div className="px-4 py-2">
                <h6 className="text-mapi-neutral-8 font-medium">Current</h6>
                <div
                  onClick={() => handleVersionClick(currentVersion)}
                  className="text-mapi-text hover:bg-mapi-neutral-2 px-2 py-1 rounded-md cursor-pointer mb-1"
                >
                  v{currentVersion ? currentVersion.version_number : 'N/A'}
                </div>
              </div>
              <div className="px-4 py-2 border-t border-t-[#343B4F]">
                <h6 className="text-mapi-neutral-8 font-medium">Active</h6>
                {activeVersions.map((version) => (
                  <div
                    key={version.version_number}
                    onClick={() => handleVersionClick(version)}
                    className="text-mapi-text hover:bg-mapi-neutral-2 px-2 py-1 rounded-md cursor-pointer mb-1"
                  >
                    v{version ? version.version_number : 'N/A'}
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-t-[#343B4F]">
                <h6 className="text-neutral-2 font-medium">Draft</h6>
                {draftVersions.map((version) => (
                  <div
                    key={version.version_number}
                    onClick={() => handleVersionClick(version)}
                    className="text-mapi-text hover:bg-mapi-neutral-2 px-2 py -1 rounded-md cursor-pointer mb-1"
                  >
                    v{version ? version.version_number : 'N/A'}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;