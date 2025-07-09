import React, { useContext, useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";

import colors from "../config/colors";
import {
  AppFormField,
  AppForm,
  AppErrorMasage,
  SubmitButton,
} from "../components/forms";
import AuthApi from "../api/auth";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen() {
  const [loginFailed, setLoginFailed] = useState(false);
  const authContext = useContext(AuthContext);

  // Function to handle the form submission for user login
  const handelSubmit = async ({ username, password }) => {
    const result = await AuthApi.login(username, password);
    if (!result.ok) {
      setLoginFailed(true);
      return;
    }

    setLoginFailed(false);
    const { access, refresh } = result.data;

    // 1. Store tokens
    await authStorage.storeTokens(access, refresh);

    // 2. Fetch full user profile (includes is_staff)
    const profileRes = await AuthApi.getMe(access);
    if (!profileRes.ok) {
      setLoginFailed(true);
      return;
    }

    const userProfile = profileRes.data;

    // 3. Set full user object in context
    authContext.setUser(userProfile);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // adjust if needed
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="account"
                size={150}
                color={colors.secondary}
              />
            </View>

            <AppErrorMasage
              error="Invalid username and/or password!"
              visible={loginFailed}
            />
            <AppForm
              initialValues={{ username: "", password: "" }}
              onSubmit={handelSubmit}
              validationSchema={validationSchema}
            >
              <AppFormField
                autoFocus
                autoCapitalize="none"
                autoCorrect={false}
                icon="account"
                name="username"
                placeholder="Username"
                //textContentType="emailAddress"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                name="password"
                placeholder="Password"
                secureTextEntry
                textContentType="password"
              />
              <SubmitButton title="login" />
            </AppForm>
            <Button title="Forgot Your Password?" />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  icon: {
    alignItems: "center",
    marginTop: 0,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },
});

export default LoginScreen;
