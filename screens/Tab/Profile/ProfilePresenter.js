import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import { ScrollView } from "react-native";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";

const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

const ProfilePresenter = () => {
  const { data, loading } = useQuery(ME);
  return <ScrollView>{loading ? <Loader /> : null}</ScrollView>;
};

export default ProfilePresenter;
