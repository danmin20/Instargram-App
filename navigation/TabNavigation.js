import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from "../screens/Tab/Home";
import Search from "../screens/Tab/Search";
import Notifications from "../screens/Tab/Notifications";
import Profile from "../screens/Tab/Profile";
import { View } from "react-native";

export default createBottomTabNavigator(
  {
    Home,
    Search,
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("PhotoNavigation")
      }
    },
    Notifications,
    Profile
  },
  {
    headerMode: "none"
  }
);
