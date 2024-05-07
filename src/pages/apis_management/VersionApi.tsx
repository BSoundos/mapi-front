import { IoIosArrowDown } from "react-icons/io";
import Navbar from "@/components/NavbarProvider";
import SidebarProvider from "@/components/SidebarProvider";
import { useState, useEffect } from "react";
import { useSelector} from "react-redux";
import { getAllVersions,updateExistingVersion } from "@/components/features/apis_management/versionSlice";
import { RootState, useAppDispatch } from "@/app/store";
import { useParams } from "react-router-dom";
import CheckBoxInput from "@/components/ui/CheckBoxInput";
import AddVersionModal from "@/components/apis_management/AddVersionModal";
import VersionListItem from "@/components/apis_management/VersionListItem";

export default function VersionsApi() {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [currentListOpen, setCurrentListOpen] = useState(false);
  const [activeListOpen, setActiveListOpen] = useState(false);
  const [draftListOpen, setDraftListOpen] = useState(false);
  const [showAddRequestModal, setShowAddRequestModal] = useState(false);
  const { id } = useParams<{ id: string }>();
  
  const toggleCurrentList = () => {
    setCurrentListOpen(!currentListOpen);
  };

  const toggleActiveList = () => {
    setActiveListOpen(!activeListOpen);
  };

  const toggleDraftList = () => {
    setDraftListOpen(!draftListOpen);
  };

  const handleVersionClick = (version) => {
    setSelectedVersion(version);
  };

  const { draftVersions, activeVersions, currentVersion } = useSelector((state: RootState) => state.versions);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllVersions(id));
  }, [dispatch, id]);

  const handleVersionStatusChange = async (newStatus) => {
    try {
      const updatedVersion = await dispatch(
        updateExistingVersion({
          id: selectedVersion.api_version_id,
          data: { status: newStatus },
        })
      );
      handleVersionClick(updatedVersion.payload);
      dispatch(getAllVersions(id));
    } catch (error) {
      console.error('Error updating version:', error);
    }
  };

  const toggleAddRequestModal = () => {
    setShowAddRequestModal(!showAddRequestModal);
  };

  return (
    <div className="flex ">
      <SidebarProvider />
      <div className="bg-mapi-neutral-2 flex-1 ">
        <Navbar id={id} />
        <div className="container px-5 flex-1 mt-8 pl-14 ">
          <h2 className="text-white text-2xl font-bold">Manage Versions</h2>
          <div className="flex">
            <div className="flex-col w-1/2 border-r border-[#7E89AC] border-opacity-30 pr-8">
              <div className="flex mt-8 justify-between items-center">
                <h5 className="text-mapi-text font-semibold text-base">Version</h5>
                <button  onClick={toggleAddRequestModal} className="bg-primary-dark border border-[#7E89AC] border-opacity-30 text-sm py-1 px-2 rounded-md text-mapi-text text-opacity-85 mt-4">
                  + add
                </button>
              </div>
              <div className="">
                <div className="flex flex-col mt-5">
                  <div
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => toggleCurrentList()}
                  >
                    <div
                      className={`bg-primary-dark border border-[#7E89AC] border-opacity-30 text-sm p-1.5  rounded-md text-mapi-text text-opacity-85 ${
                        currentListOpen ? "rotate-180" : ""
                      }`}
                    >
                      <IoIosArrowDown />
                    </div>
                    <h6 className="text-mapi-text font-medium text-sm">Current</h6>
                  </div>
                  {currentListOpen && currentVersion && (
                    <VersionListItem
                      version={currentVersion}
                      isSelected={currentVersion === selectedVersion}
                      onClick={() => handleVersionClick(currentVersion)}
                    />
                  )}
                </div>
                <div className="flex flex-col mt-3 ">
                  <div
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => toggleActiveList()}
                  >
                    <div
                      className={`bg-primary-dark border border-[#7E89AC] border-opacity-30 text-sm p-1.5  rounded-md text-mapi-text text-opacity-85 ${
                        activeListOpen ? "rotate-180" : ""
                      }`}
                    >
                      <IoIosArrowDown />
                    </div>
                    <h6 className="text-mapi-text font-medium text-sm">Active</h6>
                  </div>
                  {activeListOpen &&
                    activeVersions.map((version) => (
                      <VersionListItem
                        key={version.version_number}
                        version={version}
                        isSelected={version === selectedVersion}
                        onClick={() => handleVersionClick(version)}
                      />
                    ))}
                </div>
                <div className="flex flex-col mt-3 ">
                  <div
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => toggleDraftList()}
                  >
                    <div
                      className={`bg-primary-dark border border-[#7E89AC] border-opacity-30 text-sm p-1.5  rounded-md text-mapi-text text-opacity-85 ${
                        draftListOpen ? "rotate-180" : ""
                      }`}
                    >
                      <IoIosArrowDown />
                    </div>
                    <h6 className="text-mapi-text font-medium text-sm">Draft</h6>
                  </div>
                  {draftListOpen &&
                    draftVersions.map((version) => (
                      <VersionListItem
                        key={version.version_number}
                        version={version}
                        isSelected={version === selectedVersion}
                        onClick={() => handleVersionClick(version)}
                      />
                    ))}
                </div>
              </div>
            </div>
            {selectedVersion && (
              <div className="version-info flex flex-col gap-5 mt-12 pl-8">
                <h5 className="text-mapi-text font-semibold text-base ml-20">
                  v{selectedVersion.version_number}
                </h5>
                <form action="" className="flex flex-col gap-5">
                  <div className="flex flex-col">
                    <CheckBoxInput
                      id="version-status-current"
                      name="version-status"
                      value="current"
                      checked={selectedVersion.status === 'current'}
                      label="Current"
                      onChange={() => handleVersionStatusChange('current')}
                      disabled={false}
                    />
                    <p className="text-mapi-text text-[13px] pl-7 w-3/4 mt-1">
                      API displayed in the Hub when a developer searches for your API
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <CheckBoxInput
                      id="version-status-active"
                      name="version-status"
                      value="active"
                      checked={selectedVersion.status === 'active'}
                      label="Active"
                      onChange={() => handleVersionStatusChange('active')}
                      disabled={selectedVersion.status === 'current'}
                    />
                    <p className="text-mapi-text text-[13px] pl-7 w-3/4 mt-1">
                      Version developers can subscribe to
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <CheckBoxInput
                      id="version-status-draft"
                      name="version-status"
                      value="draft"
                      checked={selectedVersion.status === 'draft'}
                      label="Draft"
                      onChange={() => handleVersionStatusChange('draft')}
                      disabled={selectedVersion.status === 'current'}
                    />
                    <p className="text-mapi-text text-[13px] pl-7 w-3/4 mt-1">
                      Version initially created and visible only to the provider
                    </p>
                  </div>
                </form>
              </div>
            )}
            {showAddRequestModal && <AddVersionModal toggleModal={toggleAddRequestModal} id={id} />}
          </div>
        </div>
      </div>
    </div>
  );
}
