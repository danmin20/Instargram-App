import React, { useState } from "react";
import { Image, TouchableOpacity, AsyncStorage } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import styles from "../styles";
import constants from "../constants";
import SquarePhoto from "./SquarePhoto";
import Post from "./Post";
import NavIcon from "./NavIcon";
import { useLogOut } from "../AuthContext";
import { withNavigation } from "react-navigation";

const View = styled.View`
  background-color: ${styles.greyColor};
`;

const ProfileHeader = styled.View`
  padding: 20px;
  padding-bottom: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const HeaderColumn = styled.View`
  margin-right: 20px;
`;

const ProfileStats = styled.View`
  flex-direction: row;
`;

const Stat = styled.View`
  align-items: center;
  margin-left: 40px;
`;

const Bold = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

const StatName = styled.Text`
  margin-top: 5px;
  font-size: 13px;
`;

const ProfileMeta = styled.View`
  padding: 0 20px;
`;

const Name = styled.Text``;
const Bio = styled.Text``;

const ButtonContainer = styled.View`
  padding: 5px 0;
  border: 1px solid ${styles.lightGreyColor};
  flex-direction: row;
  margin-top: 20px;
  background-color: ${styles.greyColor};
`;

const Button = styled.View`
  width: ${constants.width / 2}px;
  align-items: center;
`;

const Edit = styled.View`
  justify-content: center;
  align-items: center;
`;

const EditButton = styled.View`
  margin-top: 20px;
  padding: 6px;
  flex-direction: row;
  width: 95%;
  border: 1px solid ${styles.moderateGreyColor};
  border-radius: 5px;
  align-items: center;
  justify-content: space-around;
  background-color: white;
`;

const SquareContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Text = styled.Text``;

const UserProfile = ({
  avatar,
  postsCount,
  followersCount,
  followingCount,
  bio,
  fullName,
  posts,
  isSelf,
  navigation
}) => {
  const [isGrid, setIsGrid] = useState(true);
  const logout = useLogOut();
  const toggleGrid = () => setIsGrid(i => !i);
  return (
    <View>
      <ProfileHeader>
        <Image
          style={{
            height: 100,
            width: 100,
            borderRadius: 50,
            marginRight: 20
          }}
          source={{ uri: avatar }}
        />
        <HeaderColumn>
          <ProfileStats>
            <Stat>
              <Bold>{postsCount}</Bold>
              <StatName>게시물</StatName>
            </Stat>
            <Stat>
              <Bold>{followersCount}</Bold>
              <StatName>팔로워</StatName>
            </Stat>
            <Stat>
              <Bold>{followingCount}</Bold>
              <StatName>팔로잉</StatName>
            </Stat>
          </ProfileStats>
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <Name>{fullName}</Name>
        <Bio>{bio}</Bio>
      </ProfileMeta>
      {isSelf ? (
        <Edit>
          <EditButton>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Text>프로필수정</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
              <Text>로그아웃</Text>
            </TouchableOpacity>
          </EditButton>
        </Edit>
      ) : null}
      <ButtonContainer>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <NavIcon
              color={isGrid ? styles.blackColor : styles.darkGreyColor}
              size={32}
              name={"grid"}
            />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <NavIcon
              color={isGrid ? styles.darkGreyColor : styles.blackColor}
              size={32}
              name={"comment-account-outline"}
            />
          </Button>
        </TouchableOpacity>
      </ButtonContainer>
      <SquareContainer>
        {posts &&
          posts.map(p => (isGrid ? <SquarePhoto key={p.id} {...p} /> : null))}
      </SquareContainer>
      {posts && posts.map(p => (isGrid ? null : <Post key={p.id} {...p} />))}
    </View>
  );
};

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired,
  bio: PropTypes.string.isRequired,
  followingCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
  postsCount: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
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
      caption: PropTypes.string.isRequired,
      location: PropTypes.string,
      createdAt: PropTypes.string.isRequired
    })
  )
};
export default withNavigation(UserProfile);
