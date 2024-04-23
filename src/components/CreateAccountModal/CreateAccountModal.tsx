import React from "react";
import {
  Button,
  Group,
  Input,
  Modal,
  ModalBody,
  SimpleGrid,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useCreateUserAccount } from "../../hooks/useCreateUserAccount";

export interface ICreateAccountFormProps {
  isOpen?: boolean;
}

/**
 *  Create account form
 */
function CreateAccountModal() {
  const {
    form,
    handleSignInClose,
    isSignUpOpen,
    handleSignInOpen,
    handleCreateAccount,
    setGoal,
    addGoal,
    removeGoal,
    userExists,
  } = useCreateUserAccount();

  console.log({ userExists });

  return (
    <>
      <Button mt={8} onClick={handleSignInOpen}>
        {userExists ? "Edit Account" : "Create Account"}
      </Button>
      <Modal
        size="sm"
        title={userExists ? <div>Edit Account</div> : <div>Create Account</div>}
        opened={isSignUpOpen}
        onClose={handleSignInClose}
      >
        <ModalBody>
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
              <Input.Wrapper label="Goals (try to be concrete)" required>
                {form.getValues().goals.map((goal, index) => (
                  <Group key={index} mb={8} mt={4}>
                    <Input
                      style={{ flex: 1 }}
                      placeholder="Enter goal description"
                      value={goal.description}
                      onChange={(event) =>
                        setGoal(index, event.currentTarget.value)
                      }
                    />
                    <Button color="red" onClick={() => removeGoal(index)}>
                      Remove
                    </Button>
                  </Group>
                ))}
              </Input.Wrapper>
              <Button
                mt={-10}
                variant="outline"
                onClick={addGoal}
                disabled={Boolean(
                  form
                    .getValues()
                    .goals.find((goal) => goal.description === ""),
                )}
              >
                Add Goal
              </Button>

              <Button mt={12} type="submit" variant="gradient">
                {userExists ? "Edit Account" : "Create Account"}
              </Button>
            </SimpleGrid>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default CreateAccountModal;
