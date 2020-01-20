import React from "react"
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from "../screens/Tab/Home";
import Search from "../screens/Tab/Search";
import Notifications from "../screens/Tab/Notifications";
import Profile from "../screens/Tab/Profile";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import MessagesLink from "../components/MessagesLink";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    initialRoute: {
      screen: initialRoute,
      navigationOptions: { ...customConfig }
    }
  });

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        title: "Home",
        headerTitleAlign: "center",
        headerRight: () => <MessagesLink />
      })
    },
    Search: {
      screen: stackFactory(Search, {
        title: "Search",
        headerTitleAlign: "center"
      })
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("PhotoNavigation")
      }
    },
    Notifications: {
      screen: stackFactory(Notifications, {
        title: "Notifications",
        headerTitleAlign: "center"
      })
    },
    Profile: {
      screen: stackFactory(Profile, {
        title: "Profile",
        headerTitleAlign: "center"
      })
    }
  },
  {
    headerMode: "none"
  }
);
