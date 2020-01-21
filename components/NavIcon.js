import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";

const NavIcon = ({ name, color = styles.blackColor, size = 36 }) => (
  <MaterialCommunityIcons name={name} color={color} size={size} />
);

NavIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number
};

export default NavIcon;
