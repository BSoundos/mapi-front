import React from "react";

const VersionListItem = ({ version, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`text-mapi-text mt-4 pl-24 py-2 w-3/4 rounded-md cursor-pointer ${
        isSelected ? "bg-[#2C5EAF] bg-opacity-15" : ""
      }`}
    >
      v{version.version_number}
    </div>
  );
};

export default VersionListItem;
