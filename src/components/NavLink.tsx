import React from 'react'
import { NavLink } from 'react-router-dom'

type NavlinkProps = {
    path: string;
    text: string;
}

const Navlink = ({ path, text }: NavlinkProps) => {
    return (
        <NavLink
            // className="opacity-85 hover:opacity-100 transition-opacity relative cursor-pointer h-full py-2
            //          after:content-[''] after:w-0 after:h-1 after:bg-[#007BFF] after:absolute after:top-[calc(100%_-_2px)] after:rounded-sm after:left-0
            //          hover:after:w-full hover:after:transition-[width] hover:after:duration-[0.15s] hover:after:ease-[ease-in] "
            className={isActive =>
                "opacity-85 hover:opacity-100 transition-opacity relative cursor-pointer h-full py-4" +
                    "after:content-['']" + isActive ? "after:w-full" : "after:w-0" + " after:h-1 after:bg-[#007BFF] after:absolute after:top-[calc(100%_-_2px)] after:rounded-sm after:left-0"
            }

            to={path}>
            {text}
        </NavLink>
    )
}

export default Navlink