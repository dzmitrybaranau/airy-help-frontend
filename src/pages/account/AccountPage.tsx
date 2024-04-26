import React from "react";
import { Button, Input, SimpleGrid } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useCreateUserAccount } from "../../hooks/useCreateUserAccount";
import styles from "./AccountPage.module.scss";

export interface ICreateAccountFormProps {
  isOpen?: boolean;
}

/**
 *  Create account form
 */
function AccountPage() {
  const { form, handleCreateAccount, userExists } = useCreateUserAccount();

  const { birthday, email, firstName, goals } = form.getValues();
  const isCreateAccountDisabled =
    !birthday ||
    !email ||
    !firstName ||
    !goals.find((goal) => goal.description) ||
    !form.isTouched;

  return (
    <div className={styles.wrapper}>
      <form onSubmit={form.onSubmit(handleCreateAccount)}>
        <SimpleGrid cols={1} verticalSpacing="xs">
          <Input.Wrapper required label="First Name">
            <Input {...form.getInputProps("firstName")} />
          </Input.Wrapper>
          <Input.Wrapper required label="Last Name">
            <Input {...form.getInputProps("lastName")} />
          </Input.Wrapper>
          <Input.Wrapper required label="Email">
            <Input {...form.getInputProps("email")} type="email" />
          </Input.Wrapper>
          <Input.Wrapper label="Birthday" required mb="12px">
            <DateInput
              {...form.getInputProps("birthday")}
              valueFormat="YYYY/MM/DD"
              placeholder="2000/03/20"
              clearable
            />
          </Input.Wrapper>
          <Button
            mt={12}
            type="submit"
            variant="gradient"
            disabled={isCreateAccountDisabled}
          >
            {userExists ? "Edit Account" : "Create Account"}
          </Button>
        </SimpleGrid>
      </form>
    </div>
  );
}

export default AccountPage;
