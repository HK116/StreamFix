import React from "react"

interface NavbarItemsProps {
    onClick?: () => void;
    label: string;
}

const NavbarItem: React.FC<NavbarItemsProps > = ({
    onClick, label
}) => {
    return (
        <div 
            onClick={onClick}
            className="text-white cursor-pointer hover:text-gray-300 
            transition text-center flex items-center">
            {label}
        </div>
    )
}

export default NavbarItem;