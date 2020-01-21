import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { SimpleLineIcons } from "@expo/vector-icons";

const Container = styled.TouchableOpacity`
  padding-right: 20px;
`;

export default withNavigation(({ navigation }) => (
  <Container onPress={() => navigation.navigate("MessageNavigation")}>
    <SimpleLineIcons name={"paper-plane"} size={28} />
  </Container>
));
