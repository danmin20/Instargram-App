import React from "react";
import ProfilePresenter from "./ProfilePresenter"

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: () => <Text>{navigation.getParam("username", "")}</Text>
  });
  constructor(props) {
    const { username } = this.props.navigation.state.params;
    const { navigation } = props;
    this.state={username: props.username}
    navigation.setParams({username: this.state.username})
  }
  render() {
    return <ProfilePresenter />
  }
}
