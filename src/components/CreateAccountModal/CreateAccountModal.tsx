import React from "react";
import { Button, Input, Modal, ModalBody, SimpleGrid } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useCreateUserAccount } from "../../hooks/useCreateUserAccount";

export interface ICreateAccountFormProps {
  isOpen?: boolean;
}

/**
 *  Create account form
 */
function CreateAccountModal({ isOpen }: ICreateAccountFormProps) {
  const {
    form,
    handleSignInClose,
    isSignUpOpen,
    handleSignInOpen,
    handleCreateAccount,
  } = useCreateUserAccount();

  return (
    <>
      <Button mt={8} onClick={handleSignInOpen}>
        Create Account
      </Button>
      <Modal
        size="sm"
        title={<div>Create Account</div>}
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
              <Input.Wrapper label="Birthday" required>
                <DateInput
                  {...form.getInputProps("birthday")}
                  valueFormat="YYYY/MM/DD"
                  placeholder="2000/03/20"
                  clearable
                />
              </Input.Wrapper>
              <Button mt={12} type="submit">
                Create Account
              </Button>
            </SimpleGrid>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default CreateAccountModal;
