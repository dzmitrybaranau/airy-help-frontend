import React from "react";
import { Button, Input, Modal, ModalBody, SimpleGrid } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useChangeUserInfo } from "../../hooks/useChangeUserInfo";

export interface IAccountInfoModalProps {}

/**
 * Account info modal
 */
function UserInfoModal(props: IAccountInfoModalProps) {
  const { form, isOpen, handleUserInfoClose, handleChangeUserInfo } =
    useChangeUserInfo();

  return (
    <>
      <Modal
        size="sm"
        title={<div>Edit Info</div>}
        opened={isOpen}
        onClose={handleUserInfoClose}
      >
        <ModalBody>
          <form onSubmit={form.onSubmit(handleChangeUserInfo)}>
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

export default UserInfoModal;
