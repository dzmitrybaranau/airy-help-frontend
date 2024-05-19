import React from "react";
import { Helmet } from "react-helmet";
import CreateGoalForm from "../../components/CreateGoalForm";

export interface ICreateGoalPageProps {}

/**
 *
 */
function CreateGoalPage(props: ICreateGoalPageProps) {
  return (
    <div>
      <Helmet>
        <title>Create Goal</title>
      </Helmet>
      <CreateGoalForm />
    </div>
  );
}

export default CreateGoalPage;
