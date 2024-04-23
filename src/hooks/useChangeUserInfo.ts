import { useForm } from "@mantine/form";
import { setIsUserInfoOpen, UserAccount } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import useUserAccount from "./useUserAccount";

export const useChangeUserInfo = () => {
  const dispatch = useDispatch();
  const { userAccount } = useUserAccount();
  const form = useForm<UserAccount>({
    mode: "uncontrolled",
    initialValues: {
      ...userAccount,
    },
  });
  const isOpen = useSelector((state: RootState) => state.user.isUserInfoOpen);
  const handleUserInfoClose = () => {
    dispatch(setIsUserInfoOpen(false));
  };
  const handleUserIndoOpen = () => {
    dispatch(setIsUserInfoOpen(true));
  };
  const handleChangeUserInfo = () => {};

  return {
    form,
    handleUserInfoClose,
    handleUserIndoOpen,
    isOpen,
    handleChangeUserInfo,
  };
};
