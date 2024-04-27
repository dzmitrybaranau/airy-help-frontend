import React, { useRef } from "react";
import { Button, Input, Select, SimpleGrid } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useMutateUserAccount } from "../../hooks/useMutateUserAccount";
import styles from "./AccountPage.module.scss";

export interface ICreateAccountFormProps {}

/**
 *  Create account form
 */
function AccountPage() {
  const { form, isSubmitting, handleCreateAccount, userExists } =
    useMutateUserAccount();
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const genderRef = useRef(null);
  const favoriteMusicGenreRef = useRef(null);
  const birthdayRef = useRef(null);

  const { birthday, email, firstName, lastName, gender, favoriteMusicGenre } =
    form.getValues();

  const isCreateAccountDisabled =
    !birthday ||
    !email ||
    !firstName ||
    !lastName ||
    !gender ||
    !favoriteMusicGenre;

  const handleKeyDown = (event, nextInput) => {
    if (event.key === "Enter") {
      // Prevent form submission
      event.preventDefault();

      // Focus the next input field
      nextInput.current.focus();
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={form.onSubmit(handleCreateAccount)}>
        <SimpleGrid cols={1} verticalSpacing="xs">
          <Input.Wrapper required label="First Name">
            <Input
              {...form.getInputProps("firstName")}
              disabled={isSubmitting}
              value={firstName}
              onKeyDown={(event) => handleKeyDown(event, lastNameRef)}
            />
          </Input.Wrapper>
          <Input.Wrapper required label="Last Name">
            <Input
              {...form.getInputProps("lastName")}
              disabled={isSubmitting}
              value={lastName}
              ref={lastNameRef}
              onKeyDown={(event) => handleKeyDown(event, emailRef)}
            />
          </Input.Wrapper>
          <Input.Wrapper required label="Email">
            <Input
              {...form.getInputProps("email")}
              disabled={isSubmitting}
              type="email"
              value={email}
              ref={emailRef}
              onKeyDown={(event) => handleKeyDown(event, genderRef)}
            />
          </Input.Wrapper>
          <Input.Wrapper required label="Gender">
            <Select
              {...form.getInputProps("gender")}
              disabled={isSubmitting}
              data={[
                { label: "Male", value: "M" },
                { label: "Female", value: "F" },
                { label: "Can't tell", value: "N/A" },
              ]}
              ref={genderRef}
              onKeyDown={(event) => handleKeyDown(event, favoriteMusicGenreRef)}
            />
          </Input.Wrapper>
          <Input.Wrapper required label="Favorite Music Genre">
            <Input
              {...form.getInputProps("favoriteMusicGenre")}
              disabled={isSubmitting}
              placeholder="Hip-Hop, Rock, Jazz, (type 'none' if you got no preference)"
              value={favoriteMusicGenre}
              ref={favoriteMusicGenreRef}
              onKeyDown={(event) => handleKeyDown(event, birthdayRef)}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Birthday" required mb="12px">
            <DateInput
              {...form.getInputProps("birthday")}
              disabled={isSubmitting}
              valueFormat="YYYY/MM/DD"
              placeholder="2000/03/20"
              clearable
              ref={birthdayRef}
            />
          </Input.Wrapper>
          <Button
            mt={12}
            type="submit"
            variant="gradient"
            disabled={Boolean(isCreateAccountDisabled) || isSubmitting}
          >
            {userExists ? "Edit Account" : "Create Account"}
          </Button>
        </SimpleGrid>
      </form>
    </div>
  );
}

export default AccountPage;
