import React, { use, useCallback, useEffect, useState } from "react";
import { AiOutlineClose, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";

import useProfileModal from "../hooks/useProfileModal";
import useCurrentUser from "../hooks/useCurrentUser";
import Input from "./Input";
import axios from "axios";
import useUpdatePassword from "../hooks/useUpdatePassword";

interface ProfileModalProps {
  visible?: boolean;
  onClose: any;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUsedPasword, setIsUsedPassword] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmPassword] = useState<boolean>(false);

  // const { userId } = useProfileModal();
  const { data, mutate } = useCurrentUser();
  const { mutate: updatePassword } = useUpdatePassword();

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }

  const handleClick = async () => {
    if (newPassword !== confirmPassword) {
      setIsConfirmPassword(false);
    }
    if(newPassword === currentPassword) {
      setIsUsedPassword(true);
    }

    let response = await axios.post('/api/updatePassword', { currentPassword, newPassword, confirmPassword });

    const hashedPassword = response?.data?.hashedPassword;

    mutate({
      ...data,
      hashedPassword: hashedPassword
    });

    updatePassword();

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div
      className={`${isVisible ? "scale-100" : "scale-0"}
  z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center 
  items-center overflow-x-hidden overflow-y-auto fixed inset-0`}
    >
      <div
        className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded 
                                    bg-black bg-opacity-70 flex items-center justify-center hover:bg-gray-700"
        onClick={handleClose}
      >
        <AiOutlineClose className="text-white" size={20} />
      </div>
      <div className="h-3/5 w-1/2 p-16 grid grid-cols-2 bg-gray-500 rounded">
        <div>
          <div className="w-24 h-24 lg:w-56 lg:h-56 rounded-full overflow-hidden cursor-pointer relative">
            <img src="/images/default-user.png" alt="Profile" />
            <BsFillPencilFill
              className="text-red-500 absolute top-[184px] right-[96px] z-100"
              size={30}
            />
          </div>
          <div>
            <p>{data.name}</p>
            <p>{data.email}</p>
            <p>{data.hashedPassword}</p>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <h4 className="text-3xl">Change password</h4>
          <div className="flex flex-col gap-6">
            <Input
              id={"currentPassword"}
              onChange={(event: any) => setCurrentPassword(event.target.value)}
              value={currentPassword}
              label="Current password"
              type="password"
            />
            <Input
              id={"newPassword"}
              onChange={(event: any) => setNewPassword(event.target.value)}
              value={newPassword}
              label="New password"
              type="password"
            />
            <Input
              id={"confirmPassword"}
              onChange={(event: any) => setConfirmPassword(event.target.value)}
              value={confirmPassword}
              label="Confirm password"
              type="password"
            />
          </div>
          <div>
            {!isConfirmed && (
              <span className="text-red-700">* Password miss match!!</span>
            )}
            {isUsedPasword && (
              <span className="text-red-700">
                * Previously used password. please use a new one.
              </span>
            )}
            <button
              onClick={handleClick}
              className="bg-green-800 py-3 my-4 text-white rounded-md w-full hover:bg-green-500 transition"
            >
              Change password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
