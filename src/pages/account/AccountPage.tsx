import React from "react";
import { Button, Input, Select, SimpleGrid } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useUserAccountEdit } from "../../hooks/useUserAccountEdit";
import styles from "./AccountPage.module.scss";

export interface ICreateAccountFormProps {}

/**
 *  Create account form
 */
function AccountPage() {
  const { form, handleCreateAccount, userExists } = useUserAccountEdit();

  const { birthday, email, firstName, lastName, gender, favoriteMusicGenre } =
    form.getValues();

  const isCreateAccountDisabled =
    !birthday ||
    !email ||
    !firstName ||
    !lastName ||
    !gender ||
    !favoriteMusicGenre;

  console.log({
    birthday,
    email,
    firstName,
    lastName,
    gender,
    favoriteMusicGenre,
    isCreateAccountDisabled,
  });

  return (
    <div className={styles.wrapper}>
      <form onSubmit={form.onSubmit(handleCreateAccount)}>
        <SimpleGrid cols={1} verticalSpacing="xs">
          <Input.Wrapper required label="First Name">
            <Input {...form.getInputProps("firstName")} value={firstName} />
          </Input.Wrapper>
          <Input.Wrapper required label="Last Name">
            <Input {...form.getInputProps("lastName")} value={lastName} />
          </Input.Wrapper>
          <Input.Wrapper required label="Email">
            <Input
              {...form.getInputProps("email")}
              type="email"
              value={email}
            />
          </Input.Wrapper>
          <Input.Wrapper required label="Gender">
            <Select
              {...form.getInputProps("gender")}
              data={[
                { label: "Male", value: "M" },
                { label: "Female", value: "F" },
                { label: "Can't tell", value: "N/A" },
              ]}
            />
          </Input.Wrapper>
          <Input.Wrapper required label="Favorite Music Genre">
            <Input
              {...form.getInputProps("favoriteMusicGenre")}
              placeholder="Hip-Hop, Rock, Jazz, (type 'none' if you got no preference)"
              value={favoriteMusicGenre}
            />
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
            disabled={Boolean(isCreateAccountDisabled)}
          >
            {userExists ? "Edit Account" : "Create Account"}
          </Button>
        </SimpleGrid>
      </form>
    </div>
  );
}

export default AccountPage;
