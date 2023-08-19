import { signOut } from "next-auth/react";

import React from "react";
import useCurrentUser from "../hooks/useCurrentUser";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data } = useCurrentUser();

  if (!visible) {
    return null;
  }
  return (
    <div
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
          <p className="text-white text-sm group-hover/item:underline">
            {data?.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px"/>
        <div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover:underline">
            Log Out
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
