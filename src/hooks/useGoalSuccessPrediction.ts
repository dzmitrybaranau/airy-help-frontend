import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { openAIGoalSuccessEstimationResponse } from "../types/user.type";
import { setGoalSuccessEstimation } from "../redux/userSlice";

export const useGoalSuccessPrediction = () => {
  const [isLoadingPrediction, setIsLoadingPrediction] = useState(false);
  const userAccount = useSelector((state: RootState) => state.user.userAccount);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPrediction = async () => {
      if (userAccount.onboarded) {
        setIsLoadingPrediction(true);
        const res = await axios
          .post(`${process.env.REACT_APP_API_ENDPOINT}/goal-success`, {
            chatId: userAccount.chatId,
          })
          .catch((e) => {
            console.error("Error getting goal success prediction", e);
            setIsLoadingPrediction(false);
          });
        const data = res?.data as typeof openAIGoalSuccessEstimationResponse;
        setIsLoadingPrediction(false);
        dispatch(
          setGoalSuccessEstimation({
            ...userAccount.goals[0],
            prediction: data,
          }),
        );
      }
    };
    getPrediction();
  }, []);

  return {
    isLoadingPrediction,
  };
};
