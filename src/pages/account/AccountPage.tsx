import React, { useRef } from "react";
import {
  Button,
  ComboboxData,
  Input,
  Select,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useMutateUserAccount } from "../../hooks/useMutateUserAccount";
import styles from "./AccountPage.module.scss";
import { useUserStore } from "../../store";

export interface ICreateAccountFormProps {}

/**
 *  Create account form
 */
function AccountPage() {
  const userExists = useUserStore((state) => state.userAccount);
  const { form, isSubmitting, handleCreateAccount } = useMutateUserAccount();
  const lastNameRef = useRef(null);
  const genderRef = useRef(null);
  const birthdayYearRef = useRef(null);
  const birthdayMonthRef = useRef(null);
  const birthdayDateRef = useRef(null);

  const errors = form.errors;

  const { birthdayYear, birthdayMonth, birthdayDay, firstName, lastName } =
    form.getValues();

  const isCreateAccountDisabled =
    !birthdayYear || !birthdayMonth || !birthdayDay || !firstName || !lastName;

  const handleKeyDown = (event, nextInput) => {
    if (event.key === "Enter") {
      // Prevent form submission
      event.preventDefault();

      // Focus the next input field
      nextInput.current.focus();
    }
  };

  const years: ComboboxData = Array.from(
    { length: new Date().getFullYear() - 1920 + 1 },
    (_, i) => ({ label: `${1920 + i}`, value: `${1920 + i}` }),
  ).reverse();
  const months: ComboboxData = [
    { label: "January", value: "0" },
    { label: "February", value: "1" },
    { label: "March", value: "2" },
    { label: "April", value: "3" },
    { label: "May", value: "4" },
    { label: "June", value: "5" },
    { label: "July", value: "6" },
    { label: "August", value: "7" },
    { label: "September", value: "8" },
    { label: "October", value: "9" },
    { label: "November", value: "10" },
    { label: "December", value: "11" },
  ];
  const days: ComboboxData = Array.from({ length: 31 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  }));

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
            {errors.firstName && (
              <Text color="red" size="sm">
                {errors.firstName}
              </Text>
            )}
          </Input.Wrapper>
          <Input.Wrapper required label="Last Name">
            <Input
              {...form.getInputProps("lastName")}
              disabled={isSubmitting}
              value={lastName}
              ref={lastNameRef}
              onKeyDown={(event) => handleKeyDown(event, genderRef)}
            />
            {errors.lastName && (
              <Text color="red" size="sm">
                {errors.lastName}
              </Text>
            )}
          </Input.Wrapper>
          <Input.Wrapper
            label="Birthday"
            required
            mb="12px"
            className={styles.birthdayWrapper}
          >
            <SimpleGrid cols={3} verticalSpacing="xs">
              <Select
                {...form.getInputProps("birthdayYear")}
                data={years}
                placeholder="Year"
                disabled={isSubmitting}
                onKeyDown={(event) => handleKeyDown(event, birthdayMonthRef)}
                ref={birthdayYearRef}
              />
              {errors.birthdayYear && (
                <Text color="red" size="sm">
                  {errors.birthdayYear}
                </Text>
              )}

              <Select
                {...form.getInputProps("birthdayMonth")}
                data={months}
                placeholder="Month"
                disabled={isSubmitting}
                onKeyDown={(event) => handleKeyDown(event, birthdayDateRef)}
                ref={birthdayMonthRef}
              />
              {errors.birthdayMonth && (
                <Text color="red" size="sm">
                  {errors.birthdayMonth}
                </Text>
              )}

              <Select
                {...form.getInputProps("birthdayDay")}
                data={days}
                placeholder="Day"
                disabled={isSubmitting}
                ref={birthdayDateRef}
              />
              {errors.birthdayDay && (
                <Text color="red" size="sm">
                  {errors.birthdayDay}
                </Text>
              )}
            </SimpleGrid>
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
