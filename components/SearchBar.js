import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "react-native";
import constants from "../constants";
import NavIcon from "./NavIcon";
import styled from "styled-components";
import styles from "../styles";

const Search = styled.View`
  flex-direction: row;
`;
const Icon = styled.View`
  margin-top: 8px;
`;

const SearchBar = ({ onChange, value, onSubmit }) => (
  <Search>
    <Icon>
      <NavIcon size={30} name={"magnify"} />
    </Icon>
    <TextInput
      style={{
        width: constants.width - 40,
        padding: 10,
        fontSize: 18
      }}
      returnKeyType="search"
      onChangeText={onChange}
      onEndEditing={onSubmit}
      value={value}
      placeholder={"검색"}
      placeholderTextColor={styles.darkGreyColor}
    />
  </Search>
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SearchBar;
