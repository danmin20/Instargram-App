import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Signup, AuthHome, Confirm, Login } from "../screens/Auth";

const AuthNavigaion = createStackNavigator(
  {
    AuthHome,
    Signup,
    Login,
    Confirm,
  },
  {
    navigationOptions: {
      cardStyle: { backgroundColor: "white" },
    },
    headerMode: "none",
  }
);

export default createAppContainer(AuthNavigaion);
