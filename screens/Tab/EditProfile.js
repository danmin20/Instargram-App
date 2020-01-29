import React, { useState } from "react";
import styled from "styled-components";
import {
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity
} from "react-native";
import { gql } from "apollo-boost";
import useInput from "../../hooks/useInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import EditInput from "../../components/EditInput";
import { ME } from "./Profile";
import styles from "../../styles";

const SEE_ME = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      email
      firstName
      lastName
      fullName
    }
  }
`;

const EDIT_USER = gql`
  mutation editUser(
    $username: String
    $email: String
    $firstName: String
    $lastName: String
    $bio: String
  ) {
    editUser(
      username: $username
      email: $email
      fistName: $firstName
      lastName: $lastName
      bio: $bio
    ) {
      id
    }
  }
`;

const View = styled.View`
  align-items: center;
  flex: 1;
`;

const Type = styled.Text`
  margin-left: 25px;
  margin-right: auto;
  font-size: 12px;
  color: ${styles.moderateGreyColor};
`;

const EditImage = styled.Text`
  color: ${styles.blueColor};
  margin: 20px 0;
  font-size: 15px;
`;

export default ({ navigation }) => {
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const emailInput = useInput("");
  const usernameInput = useInput("");
  const bioInput = useInput("");
  const [loading, setLoading] = useState(false);
  const { data } = useQuery(ME);
  const { data: me } = useQuery(SEE_ME, {
    variables: { username: data.me.username }
  });
  console.log(me);
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
    const { value: fName } = fNameInput;
    const { value: lName } = lNameInput;
    const { value: username } = usernameInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("Fill out according to email form!");
    }
    if (fName === "" || lName === "" || username == "") {
      return Alert.alert("사용자 이름을 입력해야합니다");
    }
    try {
      setLoading(true);
      const {
        data: { editUser }
      } = await editUserMutation();
      if (editUser) {
        Alert.alert("Account edited");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  console.log(me.seeUser);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Image
          style={{ width: 100, height: 100, marginTop: 20, borderRadius: 50 }}
          source={{ uri: data.me.avatar }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("PhotoNavigation")}
        >
          <EditImage>프로필 사진 변경</EditImage>
        </TouchableOpacity>
        <Type>First Name</Type>
        <EditInput
          {...fNameInput}
          onSubmitEditing={handleEdit}
          autoCapitalize="words"
          defaultValue={me.seeUser.firstName}
        />
        <Type>Last Name</Type>
        <EditInput
          {...lNameInput}
          onSubmitEditing={handleEdit}
          autoCapitalize="words"
          defaultValue={me.seeUser.lastName}
        />
        <Type>이메일 주소</Type>
        <EditInput
          {...emailInput}
          onSubmitEditing={handleEdit}
          autoCorrect={false}
          defaultValue={me.seeUser.email}
        />
        <Type>Username</Type>
        <EditInput
          {...usernameInput}
          onSubmitEditing={handleEdit}
          autoCorrect={false}
          defaultValue={data.me.username}
        />
        <Type>Bio</Type>
        <EditInput
          {...bioInput}
          onSubmitEditing={handleEdit}
          autoCorrect={false}
          defaultValue={data.me.bio}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
