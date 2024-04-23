import { useForm } from "@mantine/form";
import { setIsUserInfoOpen, UserAccount, UserGoal } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useChangeUserInfo = () => {
  const dispatch = useDispatch();
  const userAccount = useSelector((state: RootState) => state.user.userAccount);
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
  const handleChangeUserInfo = () => {};

  return { form, handleUserInfoClose, isOpen, handleChangeUserInfo };
};
