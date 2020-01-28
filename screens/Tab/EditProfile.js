import React, { useState } from "react";
import styled from "styled-components";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { gql } from "apollo-boost";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import AuthInput from "../../components/AuthInput";

const EDIT_USER = gql`
    mutation editUser($username: String, $email: String, $firstName: String, $lastName: String, $bio: String){
        editUser(username: $username, email: $email, fistName: $firstName, lastName: $lastName, bio: $bio){
            id
        }
    }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default () => {
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const emailInput = useInput("");
  const usernameInput = useInput("");
  const bioInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [editUserMutation] = useMutation(EDIT_USER, {
    variables: {
      username: usernameInput.value,
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value,
      bio: bioInput.value
    }
  });
  const handleEdit = async () => {
    const { value: email } = emailInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("Fill out according to email form!");
    }
    try {
      setLoading(true);
      const {
        data: { editUser }
      } = await editUserMutation();
      if (editUser) {
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const updateFormData = (email, firstName, lastName, username, bio) => {
    emailInput.setValue(email);
    fNameInput.setValue(firstName);
    lNameInput.setValue(lastName);
    usernameInput.setValue(username);
    bioInput.setValue(bio);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fNameInput}
          placeholder="First name"
          onSubmitEditing={handleEdit}
          autoCapitalize="words"
        />
        <AuthInput
          {...lNameInput}
          placeholder="Last name"
          onSubmitEditing={handleEdit}
          autoCapitalize="words"
        />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          onSubmitEditing={handleEdit}
          autoCorrect={false}
        />
        <AuthInput
          {...usernameInput}
          placeholder="Username"
          onSubmitEditing={handleEdit}
          autoCorrect={false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
