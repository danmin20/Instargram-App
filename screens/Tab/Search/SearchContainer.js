import React from "react";
import SearchPresenter from "./SearchPresenter";
import SearchBar from "../../../components/SearchBar";

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: () => (
      <SearchBar
        value={navigation.getParam("term", "")}
        onChange={navigation.getParam("onChange", () => null)}
        onSubmit={navigation.getParam("onSubmit", () => null)}
      />
    )
  });
  //constructor 함수 : class가 만들어지기 전에 실행됨.
  constructor(props) {
    super(props);
    const { navigation } = props;
    //SearchBar component와 navigation이 상호작용하는 데 사용됨.
    this.state = {
      term: "",
      shouldFetch: false
    };
    navigation.setParams({
      term: this.state.term,
      onChange: this.onChange,
      onSubmit: this.onSubmit
    });
  }
  onChange = text => {
    const { navigation } = this.props;
    this.setState({ term: text, shouldFetch: false });
    navigation.setParams({
      term: text
    });
  };
  onSubmit = () => {
    this.setState({ shouldFetch: true });
  };
  render() {
    const { term, shouldFetch } = this.state;
    return <SearchPresenter term={term} shouldFetch={shouldFetch} />;
  }
}
