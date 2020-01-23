import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TouchableOpacity, Image } from "react-native";
import constants from "../constants";
import { withNavigation } from "react-navigation";

const Container = styled.View`
  width: ${constants.width}px;
  height: 80px;
  flex-direction: row;
  padding: 15px 20px;
`;
const Info = styled.View`
  justify-content: center;
  margin-left: 20px;
`;
const Border = styled.Text`
  font-weight: bold;
`;
const Text = styled.Text`
font-weight: bold;
  opacity: 0.5;
`;

const SquareUser = ({
  navigation,
  id,
  avatar,
  username,
  fullName,
  isFollowing
}) => (
  <TouchableOpacity onPress={() => navigation.navigate("Profile", { id })}>
    <Container>
      <Image
        source={{ uri: avatar }}
        style={{ width: 55, height: 55, borderRadius: 25 }}
      />
      <Info>
        <Border>{username}</Border>
        <Text>
          {fullName}
          {isFollowing ? "・팔로잉" : null}
        </Text>
      </Info>
    </Container>
  </TouchableOpacity>
);

SquareUser.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired
};

export default withNavigation(SquareUser);
