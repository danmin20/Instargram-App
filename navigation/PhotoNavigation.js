import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { createStackNavigator } from "react-navigation-stack";
import styles from "../styles";
import { BorderlessButton } from "react-native-gesture-handler";

const PhotoTabs = createMaterialTopTabNavigator(
  {
    Select: {
      screen: SelectPhoto,
      navigationOptions: {
        tabBarLabel: "갤러리"
      }
    },
    Take: {
      screen: TakePhoto,
      navigationOptions: {
        tabBarLabel: "사진"
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: styles.blackColor
      },
      style: {
        backgroundColor: "#FAFAFA"
      },
      labelStyle: {
        color: styles.blackColor,
        fontSize: 15,
        fontWeight: "bold"
      }
    }
  }
);

export default createStackNavigator(
  {
    Tabs: {
      screen: PhotoTabs,
      navigationOptions: {
        title: "갤러리"
      }
    },
    UploadPhoto
  },
  {
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: "white" }
    }
  }
);
