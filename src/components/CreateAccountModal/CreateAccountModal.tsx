import React, { useState } from "react";
import { Button, Input, Modal, ModalBody, SimpleGrid } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { addDoc, collection, doc, setDoc } from "@firebase/firestore";
import { db } from "../../firebase-config";
import WebApp from "@twa-dev/sdk";

export interface ICreateAccountFormProps {}

/**
 *  Create account form
 */
function CreateAccountModal(props: ICreateAccountFormProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      birthday: "",
    },
  });

  const [isSignInOpen, setIsSignInOpen] = useState(true);

  const handleOpen = () => {
    setIsSignInOpen(true);
  };

  const handleClose = () => {
    setIsSignInOpen(false);
  };

  const handleCreateAccount = async (values) => {
    // Add the user to Firestore
    try {
      console.log(WebApp.initDataUnsafe);
      const chatId = WebApp.initDataUnsafe?.chat?.id || "123123";
      if (!chatId) {
        WebApp.showAlert("Chat ID is missing.");
        return;
      }

      const userDocRef = doc(collection(db, "users"), chatId.toString());
      await setDoc(userDocRef, {
        ...values,
        birthday: values.birthday ? values.birthday.toISOString() : null,
        chatId: WebApp.initDataUnsafe.chat.id,
      });
      console.log("Document written with ID: ", chatId);
      WebApp.showAlert("Account created successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
      WebApp.showAlert("Error creating account.");
    }
  };

  return (
    <>
      <Button mt={8} onClick={handleOpen}>
        Create Account
      </Button>
      <Modal
        size="sm"
        title={<h1>Create Account</h1>}
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
