import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Loader from "../../components/Loader";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import constants from "../../constants";
import styles from "../../styles";

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();
  const changeSelected = (photo) => {
    setSelected(photo);
  };
  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync({
        sortBy: MediaLibrary.SortBy.creationTime,
      });
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const [hasPermission, setHasPermission] = useState(false);
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        setHasPermission(true);
        getPhotos();
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    }
  };

  const handleSelected = () => {
    navigation.navigate("UploadPhoto", { photo: selected });
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {hasPermission ? (
            <>
              <Image
                style={{ width: constants.width, height: constants.width }}
                source={{ uri: selected.uri }}
              />
              <Button onPress={handleSelected}>
                <Next>다음</Next>
              </Button>
              <ScrollView contentContainerStyle={{ flexDirection: "row" }}>
                {allPhotos.map((photo) => (
                  <TouchableOpacity
                    key={photo.id}
                    onPress={() => changeSelected(photo)}
                  >
                    <Images
                      style={{
                        width: constants.width / 4,
                        height: constants.width / 4,
                        opacity: photo.id === selected.id ? 0.3 : 1,
                      }}
                      source={{ uri: photo.uri }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : null}
        </View>
      )}
    </View>
  );
};

const View = styled.View`
  flex: 1;
`;
const Images = styled.Image`
  margin: 1.5px 0.75px;
`;
const Button = styled.TouchableOpacity`
  width: 50px;
  height: 30px;
  position: absolute;
  top: 5px;
  right: 5px;
  justify-content: center;
  background-color: white;
  align-items: center;
  border-radius: 5px;
`;
const Next = styled.Text`
  color: ${styles.blueColor};
  font-weight: bold;
  font-size: 15px;
`;
