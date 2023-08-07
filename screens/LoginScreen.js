import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Text, Box, Button, Image, VStack, Pressable } from "native-base";
import { Formik } from "formik";
import { loginValidationSchema } from "../utils/helpers";
import { useLogin } from "../services/query/auth.query";
import { showToast } from "../utils/toast";
import { UserContext } from "../context/UserContext";
import LabeledInput from "../components/LabeledInput";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(UserContext);
  const { mutate, isLoading } = useLogin({
    onSuccess: (data) => {
      showToast("success", "Login Successful!", "Welcome back.");
      login(data);
      navigation.navigate("Home");
    },
    onError: (error) => {
      showToast("error", "Error!", error.response?.data?.message);
    },
  });

  const handleLogin = (values) => {
    mutate(values);
  };

  return (
    <Box style={styles.container}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleSubmit, values, errors, touched, isValid }) => (
          <>
            <Box style={styles.formContainer}>
              <Image
                source={require("../assets/logo.png")}
                alt="logo"
                style={styles.logo}
              />
              <Text style={styles.heading} mb={10}>
                Log In
              </Text>

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

              <VStack>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                <Button
                  block
                  onPress={handleSubmit}
                  style={[
                    styles.loginButton,
                    !isValid && styles.disabledButton,
                  ]}
                  isLoading={isLoading}
                  disabled={!isValid}
                >
                  <Text style={styles.btnText}>Login</Text>
                </Button>
              </VStack>
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
          <Image source={require("../assets/fb.png")} alt="hh" />
        </Box>
        <Box style={styles.socialIcon}>
          <Image source={require("../assets/google.png")} alt="hh" />
        </Box>
      </Box>

      <Box style={styles.signupTextContainer}>
        <Text style={styles.subText}>Don't have an account?</Text>{" "}
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.signupText}>Sign Up</Text>
        </Pressable>
      </Box>
    </Box>
  );
}

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
  loginButton: {
    marginTop: 25,
    backgroundColor: "#F67952",
    height: 45,
    width: "60%",
    alignSelf: "center",
    borderRadius: "133px",
  },

  btnText: {
    color: "#fff",
    fontFamily: "satoshi-bold",
    fontSize: 16,
  },
  forgotPasswordText: {
    textAlign: "right",
    fontFamily: "satoshi-md",
  },
  inputFocus: {
    backgroundColor: "#fff",
    borderColor: "red",
  },
  inputIcon: {
    position: "absolute",
    left: 10,
    top: 10,
    zIndex: 2,
    width: 20,
    height: 20,
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
  logo: {
    alignSelf: "center",
    marginBottom: 40,
  },
  disabledButton: {
    opacity: 0.5,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
    fontFamily: "satoshi-md",
  },
});
