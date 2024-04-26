import { useLayoutEffect } from "react";
import { collection, doc, getDoc } from "@firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  setIsTmaInfoLoading,
  setIsUserAccountLoading,
  setUserAccount,
  setUserTmaInfo,
  UserAccount,
} from "../redux/userSlice";
import WebApp from "@twa-dev/sdk";

const useUserAccount = () => {
  const dispatch = useDispatch();
  const { userAccount, isUserLoading, userTmaInfo, isTmaInfoLoading } =
    useSelector((state: RootState) => state.user);

  useLayoutEffect(() => {
    if (!userTmaInfo?.user?.id && isTmaInfoLoading) {
      dispatch(setIsTmaInfoLoading(false));
      dispatch(
        setUserTmaInfo(
          WebApp?.initDataUnsafe?.user?.id ? WebApp?.initDataUnsafe : null,
        ),
      );
    }
  }, [dispatch, userTmaInfo, isTmaInfoLoading]);

  useLayoutEffect(() => {
    const fetchUserAccount = async () => {
      if (!isTmaInfoLoading) {
        const id = userTmaInfo?.user?.id?.toString();
        const userDocRef = doc(collection(firestore, "users"), id);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          dispatch(setUserAccount(userDoc.data() as UserAccount));
        }
        dispatch(setIsUserAccountLoading(false));
      }
    };

    fetchUserAccount();
  }, [dispatch, isTmaInfoLoading]);

  return {
    userAccount,
    isLoading: isTmaInfoLoading || isUserLoading,
    userExists: Boolean(userAccount?.chatId),
  };
};

export default useUserAccount;
