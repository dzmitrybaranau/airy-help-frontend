import { useLayoutEffect } from "react";
import { useUserStore } from "../store";

const useLoadUserAccount = () => {
  const { userTmaInfo, isTmaInfoLoading, fetchUserAccount } = useUserStore();

  useLayoutEffect(() => {
    if (!isTmaInfoLoading && userTmaInfo?.user?.id) {
      fetchUserAccount(userTmaInfo?.user?.id.toString());
    }
  }, [isTmaInfoLoading, userTmaInfo, fetchUserAccount]);
};

export default useLoadUserAccount;
