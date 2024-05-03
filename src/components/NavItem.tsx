import React from 'react'
import { NavLink } from 'react-router-dom'

type NavlinkProps = {
    path: string;
    text: string;
}

const NavItem = ({ path, text }: NavlinkProps) => {
    return (
        <NavLink
            className={({ isActive }) =>
                "opacity-85 hover:opacity-100 transition-opacity relative cursor-pointer h-full py-3 " +
                "after:content-['']  after:h-1 after:bg-[#007BFF] after:absolute after:top-[calc(100%_-_2px)] after:rounded-sm after:left-0 " +
                (!isActive ? " after:w-0 hover:after:w-full hover:after:transition-[width] hover:after:duration-[0.15s] hover:after:ease-[ease-in]" : "after:w-full")
            }
            to={path}>
            {text}
        </NavLink>
    )
}

export default NavItem