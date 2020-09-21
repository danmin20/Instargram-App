import { createStackNavigator } from "react-navigation-stack";
import { Messages, Message } from "../screens/Messages";

export default createStackNavigator(
  {
    Messages,
    Message,
  },
  {
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: "white" },
    },
  }
);
