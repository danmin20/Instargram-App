import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import styles from "../../styles";
import { ActivityIndicator, Image, TouchableOpacity } from "react-native";
import constants from "../../constants";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../Tab/Profile";
import NavIcon from "../../components/NavIcon";
import options from "../../apollo";

const View = styled.View`
  justify-content: flex-start;
  flex: 1;
`;
const Container = styled.View`
  padding: 10px 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 0px solid ${styles.lightGreyColor};
  border-top-width: 2px;
  border-bottom-width: 1px;
`;
const Form = styled.View`
  padding: 15px 0;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
`;

const STextInput = styled.TextInput`
  margin-left: 15px;
  margin-right: auto;
`;

const Button = styled.TouchableOpacity`
  padding: 15px;
  align-items: flex-end;
`;
const Text = styled.Text`
  font-size: 15px;
  margin-left: 15px;
  margin-top: 3px;
  margin-bottom: 3px;
`;
const Upload = styled.Text`
  color: ${styles.blueColor};
  font-weight: bold;
  font-size: 15px;
`;
const Share = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 15px;
  margin-top: -15px;
  margin-bottom: -15px;
`;
const Setting = styled.Text`
  font-size: 12px;
  margin-left: 15px;
  margin-top: 10px;
  font-weight: bold;
  color: ${styles.darkGreyColor};
`;

export default ({ navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [facebook, setFacebook] = useState(false);
  const [twitter, setTwitter] = useState(false);
  const [tumbler, setTumbler] = useState(false);
  const { data } = useQuery(ME);
  const photo = navigation.getParam("photo");
  const captionInput = useInput("");
  const locationInput = useInput("");
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", {
      name: photo.filename,
      type: "image/jpeg",
      uri: photo.uri
    });
    try {
      setIsLoading(true);
      const {
        data: { location }
      } = await axios.post(options.uri.toString() + "/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      });
      console.log(location);
      setFileUrl(location);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  const toggleFacebook = () => setFacebook(i => !i);
  const toggleTwitter = () => setTwitter(i => !i);
  const toggleTumbler = () => setTumbler(i => !i);
  return (
    <View>
      <Button onPress={handleSubmit}>
        {loading ? (
          <ActivityIndicator color={constants.blueColor} />
        ) : (
          <Upload>공유</Upload>
        )}
      </Button>
      <Container>
        <Image
          source={{ uri: data.me.avatar }}
          style={{ height: 50, width: 50, borderRadius: 25 }}
        />
        <STextInput
          onChangeText={captionInput.onChange}
          value={captionInput.value}
          placeholder="문구 입력..."
          multiline={true}
          placeholderTextColor={styles.darkGreyColor}
        />
        <Image source={{ uri: photo.uri }} style={{ height: 60, width: 60 }} />
      </Container>
      <Form>
        <Text>위치 추가</Text>
      </Form>
      <Form>
        <STextInput
          onChangeText={locationInput.onChange}
          value={locationInput.value}
          placeholder="위치 입력..."
          multiline={true}
          placeholderTextColor={styles.darkGreyColor}
        />
      </Form>
      <Form>
        <Text>다른 미디어에도 게시</Text>
        <Share>
          <Text>Facebook</Text>
          <TouchableOpacity onPress={toggleFacebook}>
            <NavIcon
              name={facebook ? "toggle-switch" : "toggle-switch-off"}
              color={facebook ? styles.blueColor : styles.darkGreyColor}
              size={80}
            />
          </TouchableOpacity>
        </Share>
        <Share>
          <Text>Twitter</Text>
          <TouchableOpacity onPress={toggleTwitter}>
            <NavIcon
              name={twitter ? "toggle-switch" : "toggle-switch-off"}
              color={twitter ? styles.blueColor : styles.darkGreyColor}
              size={80}
            />
          </TouchableOpacity>
        </Share>
        <Share>
          <Text>Tumbler</Text>
          <TouchableOpacity onPress={toggleTumbler}>
            <NavIcon
              name={tumbler ? "toggle-switch" : "toggle-switch-off"}
              color={tumbler ? styles.blueColor : styles.darkGreyColor}
              size={80}
            />
          </TouchableOpacity>
        </Share>
      </Form>
      <TouchableOpacity>
        <Setting>고급 설정</Setting>
      </TouchableOpacity>
    </View>
  );
};
