import React from "react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      className="bg-black w-48 absolute top-8 left-0 
            flex-col flex border-2 border-green-950
        "
    >
      <div className="flex flex-col">
        <div
          className="border-b-2 border-green-950 px-3 
                py-2 text-white hover:underline"
        >
          Home
        </div>
        <div
          className="border-b-2 border-green-950 px-3 
                py-2 text-white hover:underline"
        >
          TV Series
        </div>
        <div
          className="border-b-2 border-green-950 px-3 
                py-2 text-white hover:underline"
        >
          Movies
        </div>
        <div
          className="border-b-2 border-green-950 px-3 
                py-2 text-white hover:underline"
        >
          Trending
        </div>
        <div
          className="border-b-2 border-green-950 px-3 
                py-2 text-white hover:underline"
        >
          Favorites
        </div>
        <div
          className="px-3 py-2 text-white hover:underline"
        >
          Explore Languages
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
