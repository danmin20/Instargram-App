import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from "../screens/Tab/Home";
import Search from "../screens/Tab/Search";
import Notifications from "../screens/Tab/Notifications";
import Profile from "../screens/Tab/Profile";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import styled from "styled-components";

const Icon = styled.View`
  margin-left: 20px;
`;

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    initialRoute: {
      screen: initialRoute,
      navigationOptions: {
        ...customConfig,
        headerStyle: { backgroundColor: "#FAFAFA" },
        cardStyle: { backgroundColor: "white" }
      }
    }
  });

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        headerTitleAlign: "center",
        headerLeft: () => (
          <Icon>
            <NavIcon name="instagram" />
          </Icon>
        ),
        headerRight: () => <MessagesLink />,
        headerTitle: () => (
          <Image
            style={{ height: 37, marginTop: 10, marginLeft: -190 }}
            resizeMode="contain"
            source={require("../assets/logo.png")}
          />
        )
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon name={focused ? "home" : "home-outline"} />
        )
      }
    },
    Search: {
      screen: stackFactory(Search, {
        title: "Search",
        headerTitleAlign: "center"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon name={focused ? "magnify-close" : "magnify"} />
        )
      }
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("PhotoNavigation"),
        tabBarIcon: <NavIcon name="plus-box-outline" />
      }
    },
    Notifications: {
      screen: stackFactory(Notifications, {
        title: "Notifications",
        headerTitleAlign: "center"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon name={focused ? "heart" : "heart-outline"} />
        )
      }
    },
    Profile: {
      screen: stackFactory(Profile, {
        title: "Profile",
        headerTitleAlign: "center"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon name={focused ? "account" : "account-outline"} />
        )
      }
    }
  },
  {
    headerMode: "none",
    tabBarOptions: {
      showLabel: false,
      tabStyle: { backgroundColor: "#FAFAFA" }
    }
  }
);
