import React from 'react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const SelectVersion = ({
    currentVersion,
    activeVersions,
    selectedVersion,
    setSelectedVersion
}) => {
    const { api_version_id, version_number, status } = selectedVersion;
    return (
        <Select>
            <SelectTrigger className="text-mapi-neutral-8 w-fit bg-mapi-neutral-3 border-corner-1-300 border-opacity-30 hover:border-opacity-100 transition-all">
                <SelectValue placeholder={`Version ${selectedVersion.version_number}`} />
                <div className='text-[#37A46E] text-[12px] bg-[#40BF7F] bg-opacity-15 px-2 py-[1px] mx-2 rounded-full'>
                    Current
                </div>


            </SelectTrigger>
            <SelectContent className='bg-mapi-neutral-3 border-corner-1-300 border-opacity-30 text-white'>
                <SelectGroup >
                    <SelectLabel>Active Versions</SelectLabel>
                    <SelectItem
                        onClick={() => {
                            setSelectedVersion(currentVersion);
                        }}
                        value={currentVersion.api_version_id}
                        className='transition-all text-opacity-85 cursor-pointer'>Version {currentVersion.version_number}</SelectItem>
                    {
                        activeVersions.map(
                            (version) => <SelectItem
                                key={version.api_version_id}
                                value={version.api_version_id}
                                onClick={() => {
                                    selectedVersion(version);
                                }}
                                className='transition-all text-opacity-85 cursor-pointer'>Version {version.version_number}</SelectItem>
                        )
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectVersion