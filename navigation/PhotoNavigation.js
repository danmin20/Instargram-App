import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import styles from "../styles";
import { SelectPhoto, TakePhoto, UploadPhoto } from "../screens/Photo";

const PhotoTabs = createMaterialTopTabNavigator(
  {
    Select: {
      screen: SelectPhoto,
      navigationOptions: {
        tabBarLabel: "갤러리",
      },
    },
    Take: {
      screen: TakePhoto,
      navigationOptions: {
        tabBarLabel: "사진",
      },
    },
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: styles.blackColor,
      },
      style: {
        backgroundColor: styles.greyColor,
      },
      labelStyle: {
        color: styles.blackColor,
        fontSize: 15,
        fontWeight: "bold",
      },
    },
  }
);

export default createStackNavigator(
  {
    Tabs: {
      screen: PhotoTabs,
    },
    UploadPhoto,
  },
  {
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: "white" },
      title: "",
    },
  }
);
