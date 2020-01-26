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

const PostDisplay = styled.View`
  margin-bottom: 20px;
`;
const UserDisplay = styled.View`
  flex-direction: row;
`;
const Header = styled.View`
  padding: 15px 0px;
  border: 2px solid white;
  border-bottom-color: ${props => props.theme.lightGreyColor};
  align-items: center;
`;
const Text = styled.Text`
  font-weight:bold;
  font-size: 15px;
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
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {loading && <Loader />}
      <Swiper style={{ height: constants.height * 0.75 }} loop={false}>
        <>
          <Header>
            <Text>계정</Text>
          </Header>
          <PostDisplay>
            {!loading &&
              data &&
              data.searchUser &&
              data.searchUser.map(user => (
                <SquareUser key={user.id} term={term} {...user} />
              ))}
          </PostDisplay>
        </>
        <>
          <Header>
            <Text>게시물</Text>
          </Header>
          <UserDisplay>
            {!loading &&
              data &&
              data.searchPost &&
              data.searchPost.map(post => (
                <SquarePhoto key={post.id} term={term} {...post} />
              ))}
          </UserDisplay>
        </>
      </Swiper>
    </ScrollView>
  );
};

SearchPresenter.propTypes = {
  term: PropTypes.string.isRequired,
  shouldFetch: PropTypes.bool.isRequired
};

export default SearchPresenter;
