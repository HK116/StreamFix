import { useCallback, useEffect, useState } from "react";
import { CiCircleChevDown, CiSearch, CiBellOn } from "react-icons/ci";
import { useRouter } from "next/router";

import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav
      className={`w-full fixed z-40 flex gap-x-10 justify-center items-center
                ${showBackground ? " bg-zinc-900 bg-opacity-90" : ""} 
                transition duration-500
      `}
    >
      <div className="px-4 md:px-16 py-6 w-11/12 flex ">
        <div className="flex flex-row">
          <img 
            onClick={() => router.push("/")}
            className="h-6 lg:h-11 cursor-pointer" src="/images/logo.png" alt="Logo" 
          />
          <div className="flex-row ml-8 gap-7 hidden lg:flex">
            <NavbarItem onClick={() => router.push("/")} label="Home" />
            <NavbarItem onClick={() => router.push("/movies")} label="Movies" />
            <NavbarItem onClick={() => router.push("/favorites")} label="Favorites" />
          </div>
        </div>

        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <CiCircleChevDown
            className={`text-white transition w-6 h-6 ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>

        {/* <div className="flex flex-row ml-auto gap-7 items-center">
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          > */}
            {/* <CiCircleChevDown
              className={`text-white transition w-6 h-6 ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            /> */}
            <AccountMenu /*visible={showAccountMenu}*/ />
          {/* </div>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
