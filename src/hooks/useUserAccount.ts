import { useLayoutEffect } from "react";
import { collection, doc, DocumentSnapshot, getDoc } from "@firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import { getTmaUserInfo } from "../utils/getTmaUserInfo";
import { UseQueryResult } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  setIsUserAccountLoading,
  setUserAccount,
  setUserTmaInfo,
  UserAccount,
} from "../redux/userSlice";
import WebApp from "@twa-dev/sdk";

const useUserAccount = () => {
  const dispatch = useDispatch();
  const userAccount = useSelector((state: RootState) => state.user.userAccount);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const userTmaInfo = useSelector((state: RootState) => state.user.userTmaInfo);

  useLayoutEffect(() => {
    dispatch(setUserTmaInfo(WebApp.initDataUnsafe));
  }, [dispatch]);

  useLayoutEffect(() => {
    const fetchUserAccount = async () => {
      const id = userTmaInfo?.user?.id?.toString();
      if (id) {
        const userDocRef = doc(collection(firestore, "users"), id);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          dispatch(setUserAccount(userDoc.data() as UserAccount));
        }
      }
      dispatch(setIsUserAccountLoading(false));
    };

    fetchUserAccount();
  }, [dispatch, userTmaInfo]);

  return {
    userAccount,
    isLoading,
    userExists: Boolean(userAccount?.id),
  };
};

export default useUserAccount;
