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

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: () => <Text>{navigation.getParam("username", "")}</Text>
  });
  constructor(props) {
    super(props);
    const { navigation } = props;
    const { loading, data } = useQuery(ME);
    this.state = { username: data.username };
    navigation.setParams({ username: this.state.username });
  }
  render() {
    return <ScrollView>{loading ? <Loader /> : null}</ScrollView>;
  }
}
