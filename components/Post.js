import React, { useState } from "react";
import { Image } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import { gql } from "apollo-boost";
import constants from "../constants";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import styles from "../styles";
import { useMutation } from "react-apollo-hooks";
import { withNavigation } from "react-navigation";

export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Container = styled.View``;
const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`
  margin-left: 10px;
  justify-content: center;
`;
const Bold = styled.Text`
  font-weight: bold;
`;
const Location = styled.Text`
  font-size: 12px;
`;
const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;
const IconContainer = styled.View`
  margin-right: 15px;
`;
const HeartIconContainer = styled.View`
  margin-right: 15px;
  margin-top: -2px;
`;
const InfoContainer = styled.View`
  margin-top: -50px;
  padding-top: 3px;
  padding-left: 15px;
`;
const MyCaption = styled.View`
  flex-direction: row;
`;
const Caption = styled.Text`
  margin-left: 5px;
`;
const CommentCount = styled.Text`
  margin-top: 7px;
  color: ${props => props.theme.darkGreyColor};
`;

const Post = ({
  id,
  user,
  location,
  files = [],
  likeCount: likeCountProp,
  caption,
  comments = [],
  isLiked: isLikedProp,
  navigation
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const handleLike = async () => {
    setIsLiked(p => !p);
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    try {
      await toggleLikeMutation();
    } catch (e) {}
  };
  return (
    <Container>
      <Header>
        <Touchable
          onPress={() =>
            navigation.navigate("UserDetail", { username: user.username })
          }
        >
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <Touchable
          onPress={() =>
            navigation.navigate("UserDetail", { username: user.username })
          }
        >
          <HeaderUserContainer>
            <Bold>{user.username}</Bold>
            {location && <Location>{location}</Location>}
          </HeaderUserContainer>
        </Touchable>
      </Header>
      <Swiper style={{ height: constants.width * 1.15 }}>
        {files.map(file => (
          <Image
            style={{
              width: constants.width,
              height: constants.width
            }}
            key={file.id}
            source={{ uri: file.url }}
          />
        ))}
      </Swiper>
      <InfoContainer>
        <IconsContainer>
          <Touchable onPress={handleLike}>
            <HeartIconContainer>
              <Ionicons
                color={isLiked ? styles.redColor : styles.blackColor}
                size={33}
                name={isLiked ? "ios-heart" : "ios-heart-empty"}
              />
            </HeartIconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <SimpleLineIcons size={28} name={"bubble"} />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <SimpleLineIcons size={28} name={"paper-plane"} />
            </IconContainer>
          </Touchable>
        </IconsContainer>
        <Touchable>
          <Bold>좋아요 {likeCount}개</Bold>
        </Touchable>
        <MyCaption>
          <Touchable>
            <Bold>{user.username}</Bold>
          </Touchable>
          <Caption>{caption}</Caption>
        </MyCaption>
        <Touchable>
          <CommentCount>댓글 {comments.length}개 모두 보기</CommentCount>
        </Touchable>
      </InfoContainer>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  createdAt: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string
};

export default withNavigation(Post);
