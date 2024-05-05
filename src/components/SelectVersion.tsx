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

const SelectVersion = () => {
    return (
        <Select>
            <SelectTrigger className="text-mapi-neutral-8 w-fit bg-mapi-neutral-3 border-corner-1-300 border-opacity-30 hover:border-opacity-100 transition-all">
                <SelectValue placeholder="Version v1" />
                <div className='text-[#37A46E] text-[12px] bg-[#40BF7F] bg-opacity-15 px-2 py-[1px] mx-2 rounded-full'>
                    Current
                </div>
            </SelectTrigger>
            <SelectContent className='bg-mapi-neutral-3 border-corner-1-300 border-opacity-30 text-white'>
                <SelectGroup >
                    <SelectLabel>Versions</SelectLabel>
                    <SelectItem value="v1" className='transition-all text-opacity-85 cursor-pointer'>Version 1</SelectItem>
                    <SelectItem value="v2" className='transition-all text-opacity-85 cursor-pointer'>Version 2</SelectItem>
                    <SelectItem value="v3" className='transition-all text-opacity-85 cursor-pointer'>Version 3</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectVersion