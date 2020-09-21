import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import Loader from "../../components/Loader";
import constants from "../../constants";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import styles from "../../styles";

export default ({ navigation }) => {
  const cameraRef = useRef();
  const [loading, setLoading] = useState(true);

  const [canTakePhoto, setCanTakePhoto] = useState(true);
  const takePhoto = async () => {
    if (!canTakePhoto) {
      return;
    }
    try {
      setCanTakePhoto(false);
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1,
      });
      const asset = await MediaLibrary.createAssetAsync(uri);
      navigation.navigate("UploadPhoto", { photo: asset });
    } catch (e) {
      console.log(e);
      setCanTakePhoto(true);
    }
  };

  const [hasPermission, setHasPermission] = useState(false);
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    } finally {
      setLoading(false);
    }
  };

  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const toggleType = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const toggleFlash = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermission ? (
        <>
          <Camera
            ref={cameraRef}
            type={cameraType}
            style={{
              justifyContent: "flex-end",
              padding: 10,
              width: constants.width,
              height: constants.width,
            }}
          >
            <Buttons>
              <TouchableOpacity onPress={toggleType}>
                <SimpleLineIcons name={"refresh"} size={28} color={"white"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleFlash}>
                {flashMode === Camera.Constants.FlashMode.off ? (
                  <Ionicons name={"ios-flash"} size={28} color={"white"} />
                ) : (
                  <Ionicons name={"ios-flash-off"} size={28} color={"white"} />
                )}
              </TouchableOpacity>
            </Buttons>
          </Camera>
          <View>
            <TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto}>
              <Button />
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
};

const View = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Button = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border: 15px solid ${styles.lightGreyColor};
`;
const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
