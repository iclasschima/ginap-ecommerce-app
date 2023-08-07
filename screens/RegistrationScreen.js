import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Text,
  Box,
  Input,
  Button,
  Image,
  Pressable,
  FormControl,
} from "native-base";
import { Formik } from "formik";
import { registrationValidationSchema } from "../utils/helpers";
import { useRegistration } from "../services/query/auth.query";
import { showToast } from "../utils/toast";
import LabeledInput from "../components/LabeledInput";

const RegistrationScreen = ({ navigation }) => {
  const { mutate, isLoading } = useRegistration({
    onSuccess: () => {
      showToast(
        "success",
        "Registration Successful!",
        "You can now login with your credentials."
      );
      navigation.navigate("Login");
    },
    onError: (error) => {
      showToast("error", "Error!", error.response?.data?.message);
    },
  });

  const handleRegistration = (values) => {
    mutate(values);
  };

  return (
    <Box style={styles.container}>
      <Formik
        initialValues={{
          fullName: "",
          username: "",
          password: "",
        }}
        validationSchema={registrationValidationSchema}
        onSubmit={handleRegistration}
      >
        {({ handleChange, handleSubmit, values, errors, isValid, touched }) => (
          <>
            <Box style={styles.formContainer}>
              <Image
                source={require("../assets/logo.png")}
                alt="logo"
                style={styles.logo}
              />
              <Text style={styles.heading} mb={10}>
                Register
              </Text>

              <LabeledInput
                label="Full Name"
                placeholder="Enter your full name"
                iconSource={require("../assets/Profile.png")}
                error={touched.fullName && errors.fullName}
                value={values.fullName}
                onChangeText={handleChange("fullName")}
              />

              <LabeledInput
                label="Username"
                placeholder="Enter your username"
                iconSource={require("../assets/Message.png")}
                error={touched.username && errors.username}
                value={values.username}
                onChangeText={handleChange("username")}
              />
              
              <LabeledInput
                label="Password"
                placeholder="Enter secured password"
                iconSource={require("../assets/Lock.png")}
                secureTextEntry
                error={touched.password && errors.password}
                value={values.password}
                onChangeText={handleChange("password")}
              />

              <Button
                block
                onPress={handleSubmit}
                style={[
                  styles.registerButton,
                  !isValid && styles.disabledButton,
                ]}
                isLoading={isLoading}
                disabled={!isValid}
                accessibilityLabel="Register Button"
                onChangeText={handleChange("password")}
              >
                <Text style={styles.btnText}>Register</Text>
              </Button>
            </Box>
          </>
        )}
      </Formik>

      <Box style={styles.horizontalRuleContainer}>
        <Box style={styles.horizontalRule} />
        <Text style={styles.orText}>or</Text>
        <Box style={styles.horizontalRule} />
      </Box>

      <Box style={styles.socialLoginContainer}>
        <Box style={styles.socialIcon}>
          <Image source={require("../assets/fb.png")} alt="fb-icon" />
        </Box>
        <Box style={styles.socialIcon}>
          <Image source={require("../assets/google.png")} alt="google-icon" />
        </Box>
      </Box>

      <Box style={styles.signupTextContainer}>
        <Text style={styles.subText}>Already have an account?</Text>{" "}
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signupText}>Log In</Text>
        </Pressable>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBFBFD",
  },
  formContainer: {
    width: "90%",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 35,
    fontFamily: "satoshi-bold",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputIcon: {
    position: "absolute",
    left: 10,
    top: 10,
    zIndex: 2,
    width: 20,
    height: 20,
  },
  registerButton: {
    marginTop: 25,
    backgroundColor: "#F67952",
    height: 45,
    width: "60%",
    alignSelf: "center",
    borderRadius: 133,
  },
  label: {
    marginBottom: 10,
    fontFamily: "satoshi-md",
  },
  btnText: {
    color: "#fff",
    fontFamily: "satoshi-bold",
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
    fontFamily: "satoshi-md",
  },
  logo: {
    alignSelf: "center",
    marginBottom: 40,
  },
  horizontalRuleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    width: "80%",
    alignSelf: "center",
    gap: 3,
  },
  socialLoginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    gap: 20,
  },
  socialIcon: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    shadowColor: "#333",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  signupTextContainer: {
    width: "80%",
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "center",
  },
  subText: {
    fontFamily: "satoshi-md",
    fontSize: 16,
  },
  signupText: {
    fontFamily: "satoshi-bold",
    fontSize: 16,
  },

  horizontalRule: {
    flex: 1,
    height: 1,
    backgroundColor: "#232E2499",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: "satoshi-md",
  },
});

export default RegistrationScreen;
