import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { ScrollView, RefreshControl } from "react-native";
import Loader from "../../../components/Loader";
import SquarePhoto from "../../../components/SquarePhoto";

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
  }
`;

export const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Text = styled.Text``;

const SearchPresenter = ({ term, shouldFetch }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: { term },
    skip: !shouldFetch,
    fetchPolicy: "network-only"
  });
  console.log(data, loading);
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
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.searchPost &&
        data.searchPost.map(post => (
          <SquarePhoto key={post.id} term={term} {...post} />
        ))
      )}
    </ScrollView>
  );
};

SearchPresenter.propTypes = {
  term: PropTypes.string.isRequired,
  shouldFetch: PropTypes.bool.isRequired
};

export default SearchPresenter;
