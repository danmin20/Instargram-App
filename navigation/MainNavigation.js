import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";

const MainNavigation = createStackNavigator(
  {
    TabNavigation,
    PhotoNavigation
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(MainNavigation);
