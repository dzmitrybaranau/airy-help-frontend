import { useLayoutEffect } from "react";
import WebApp from "@twa-dev/sdk";
import { useUserStore } from "../store";

const useLoadUserAccount = () => {
  const { setUserTmaInfo, userTmaInfo, isTmaInfoLoading, fetchUserAccount } =
    useUserStore();

  useLayoutEffect(() => {
    if (!userTmaInfo?.user?.id && isTmaInfoLoading) {
      setUserTmaInfo(WebApp?.initDataUnsafe);
    }
  }, [userTmaInfo, isTmaInfoLoading, setUserTmaInfo]);

  useLayoutEffect(() => {
    console.log({ isTmaInfoLoading, userTmaInfo, fetchUserAccount });
    if (!isTmaInfoLoading && userTmaInfo?.user?.id) {
      console.log("FETCH", userTmaInfo?.user?.id.toString());
      fetchUserAccount(userTmaInfo?.user?.id.toString());
    }
  }, [isTmaInfoLoading, userTmaInfo, fetchUserAccount]);
};

export default useLoadUserAccount;
