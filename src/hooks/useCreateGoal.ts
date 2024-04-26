import { useForm } from "@mantine/form";
import { UserGoal } from "../redux/userSlice";

export const useCreateGoal = () => {
  const form = useForm<UserGoal>({
    initialValues: {
      description: "",
    },
  });

  return {
    form,
  };
};
