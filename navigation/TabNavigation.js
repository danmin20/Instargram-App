import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from "../screens/Tab/Home";
import Search from "../screens/Tab/Search";
import Notifications from "../screens/Tab/Notifications";
import Profile from "../screens/Tab/Profile";
import { View } from "react-native";

const TabNavigation = createBottomTabNavigator({
  Home,
  Search,
  Add: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: () => {
        console.log("Add");
      }
    }
  },
  Notifications,
  Profile
});

export default createAppContainer(TabNavigation);
