import React, { useState } from "react";
import { Button, Input, Modal, ModalBody, SimpleGrid } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { collection, doc, setDoc } from "@firebase/firestore";
import WebApp from "@twa-dev/sdk";
import { firestore } from "../../firebase/firebase-config";

export interface ICreateAccountFormProps {
  isOpen?: boolean;
}

export function getTmaUserInfo(): { id: string } {
  try {
    console.log("WebApp.initData:", WebApp.initData);
    const params = new URLSearchParams(WebApp.initData);
    const userJSON = params.get("user");
    console.log("userJSON:", userJSON);
    if (userJSON) {
      const user = JSON.parse(decodeURIComponent(userJSON));
      return { ...user };
    }
    return { id: null };
  } catch (e) {
    console.error("Error getting user info:", e);
    return { id: null };
  }
}
/**
 *  Create account form
 */
function CreateAccountModal({ isOpen }: ICreateAccountFormProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      birthday: "",
    },
  });

  const [isSignInOpen, setIsSignInOpen] = useState(isOpen);

  const handleOpen = () => {
    setIsSignInOpen(true);
  };

  const handleClose = () => {
    setIsSignInOpen(false);
  };

  const handleCreateAccount = async (values) => {
    // Add the user to Firestore
    try {
      const { id: chatId } = getTmaUserInfo();
      if (!chatId) {
        WebApp.showAlert("Chat ID is missing.");
        return;
      }

      const userDocRef = doc(collection(firestore, "users"), chatId.toString());
      await setDoc(userDocRef, {
        ...values,
        birthday: values.birthday ? values.birthday.toISOString() : null,
        chatId,
      });
      console.log("Document written with ID: ", chatId);
      WebApp.showAlert("Account created successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
      WebApp.showAlert("Error creating account.", e.toString());
    }
  };

  return (
    <>
      <Button mt={8} onClick={handleOpen}>
        Create Account
      </Button>
      <Modal
        size="sm"
        title={<div>Create Account</div>}
        opened={isSignInOpen}
        onClose={handleClose}
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
