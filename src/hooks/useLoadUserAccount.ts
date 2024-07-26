import { useLayoutEffect } from "react";
import { useUserStore } from "../store";

const useLoadUserAccount = () => {
  const { userTmaInfo, isTmaInfoLoading, fetchUserAccount } = useUserStore();

  useLayoutEffect(() => {
    console.log("LOAD ACCOUNT");
    if (!isTmaInfoLoading && userTmaInfo?.user?.id) {
      console.log("CREATE ACCOUNT", userTmaInfo?.user?.id.toString());
      fetchUserAccount(userTmaInfo?.user?.id.toString());
    }
  }, [isTmaInfoLoading, userTmaInfo, fetchUserAccount]);
};

export default useLoadUserAccount;
