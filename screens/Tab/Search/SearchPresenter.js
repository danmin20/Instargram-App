import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { ScrollView, RefreshControl } from "react-native";
import Loader from "../../../components/Loader";
import SquarePhoto from "../../../components/SquarePhoto";
import SquareUser from "../../../components/SquareUser";
import Swiper from "react-native-swiper";
import constants from "../../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../../../styles";

const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
    searchUser(term: $term) {
      id
      avatar
      username
      isFollowing
      isSelf
      fullName
    }
  }
`;

const UserDisplay = styled.View`
  margin-bottom: 20px;
`;
const PostDisplay = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: -20px;
`;
const Text = styled.Text`
  font-weight: bold;
  font-size: 15px;
`;
const GreyText = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: ${styles.darkGreyColor};
`;
const ButtonContainer = styled.View`
  padding: 13px 0;
  border: 1px solid ${styles.lightGreyColor};
  flex-direction: row;
  background-color: ${styles.greyColor};
`;
const Button = styled.View`
  width: ${constants.width / 2}px;
  align-items: center;
`;

const SearchPresenter = ({ term, shouldFetch }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: { term },
    skip: !shouldFetch,
    fetchPolicy: "network-only"
  });
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  const [isPost, setIsPost] = useState(true);
  const toggleSearch = () => setIsPost(i => !i);
  console.log(data);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {loading && <Loader />}
      {!loading && (
        <>
          <ButtonContainer>
            <TouchableOpacity onPress={toggleSearch}>
              <Button>
                {isPost ? <Text>계정</Text> : <GreyText>계정</GreyText>}
              </Button>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleSearch}>
              <Button>
                {isPost ? <GreyText>게시물</GreyText> : <Text>게시물</Text>}
              </Button>
            </TouchableOpacity>
          </ButtonContainer>
          <UserDisplay>
            {!loading &&
              data &&
              data.searchUser &&
              data.searchUser.map(user =>
                isPost ? (
                  <SquareUser key={user.id} term={term} {...user} />
                ) : null
              )}
          </UserDisplay>
          <PostDisplay>
            {!loading &&
              data &&
              data.searchPost &&
              data.searchPost.map(post =>
                isPost ? null : (
                  <SquarePhoto key={post.id} term={term} {...post} />
                )
              )}
          </PostDisplay>
        </>
      )}
    </ScrollView>
  );
};

SearchPresenter.propTypes = {
  term: PropTypes.string.isRequired,
  shouldFetch: PropTypes.bool.isRequired
};

export default SearchPresenter;
