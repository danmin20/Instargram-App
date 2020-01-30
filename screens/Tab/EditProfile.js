import React, { useState } from "react";
import styled from "styled-components";
import {
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { gql } from "apollo-boost";
import useInput from "../../hooks/useInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import EditInput from "../../components/EditInput";
import { ME } from "./Profile";
import styles from "../../styles";
import NavIcon from "../../components/NavIcon";

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
    $email: String
    $firstName: String
    $lastName: String
    $bio: String
  ) {
    editUser(
      email: $email
      firstName: $firstName
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

const Button = styled.TouchableOpacity`
  padding: 15px;
  align-items: flex-end;
`;

const OK = styled.Text``;

export default ({ navigation }) => {
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const emailInput = useInput("");
  const bioInput = useInput("");
  const [loading, setLoading] = useState(false);
  const { data } = useQuery(ME);
  const { data: me } = useQuery(SEE_ME, {
    variables: { username: data.me.username }
  });
  const [editUserMutation] = useMutation(EDIT_USER, {
    variables: {
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value,
      bio: bioInput.value,
      fullName: `${fNameInput.value} ${lNameInput.value}`
    }
  });
  const handleEdit = async () => {
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
        <Type>Bio</Type>
        <EditInput
          {...bioInput}
          onSubmitEditing={handleEdit}
          autoCorrect={false}
          defaultValue={data.me.bio}
        />
        <Button onPress={handleEdit}>
          {loading ? (
            <ActivityIndicator color={styles.blueColor} />
          ) : (
            <NavIcon name={"check"} color={styles.blueColor} />
          )}
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};
