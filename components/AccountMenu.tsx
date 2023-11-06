import { signOut } from "next-auth/react";
import { AiOutlineLogout } from "react-icons/ai";

import React, { useCallback } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import ProfileModal from "./ProfileModal";
import useProfileModal from "../hooks/useProfileModal";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data } = useCurrentUser();
  const { isOpen, closeModal, openModal } = useProfileModal();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  // if (!visible) {
  //   return null;
  // }
  return (
    <>
      <ProfileModal onClose={closeModal} visible={isOpen} />
      <div className="flex flex-row ml-auto gap-7 items-center">
        <div 
          onClick={handleOpenModal}
          className="w-6 h-6 lg:w-10 lg:h-10 rounded-full overflow-hidden cursor-pointer">
          <img src="/images/default-user.png" alt="Profile" />
        </div>
        <div onClick={() => signOut()} className="">
          <AiOutlineLogout
            className="text-white cursor-pointer hover:text-gray-300"
            size={25}
          />
        </div>
      </div>
      {/* <div
        className="bg-black w-48 absolute top-14 right-0 py-3
            flex flex-col border-2 border-green-950"
      >
        <div className="flex flex-col gap-3">
          <div className="px-3 group/item flex flex-row gap-4 items-center w-full">
            <img
              className="w-8 rounded-full"
              src="/images/default-user.png"
              alt="Profile"
            />
            <div
              onClick={handleOpenModal}
              className="text-white text-sm group-hover/item:underline"
            >
              {data?.name}
            </div>
          </div>
          <hr className="bg-gray-600 border-0 h-px" />
          <div
            onClick={() => signOut()}
            className="px-3 text-center text-white text-sm hover:underline"
          >
            Log Out
          </div>
        </div>
      </div> */}
    </>
  );
};

export default AccountMenu;
