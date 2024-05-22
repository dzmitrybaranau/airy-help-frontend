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
    if (!isTmaInfoLoading && userTmaInfo?.user?.id) {
      fetchUserAccount(userTmaInfo?.user?.id.toString());
    }
  }, [isTmaInfoLoading, userTmaInfo, fetchUserAccount]);
};

export default useLoadUserAccount;
