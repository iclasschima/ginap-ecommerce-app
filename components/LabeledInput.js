import React, { useState } from "react";
import { Box, Input, Text, Image, Button, FormControl } from "native-base";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const LabeledInput = ({
  label,
  iconSource,
  secureTextEntry,
  error,
  value,
  ...inputProps
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <FormControl mb={4}>
      <FormControl.Label _text={{ fontSize: "sm", fontFamily: "satoshi-md" }}>
        {label}
      </FormControl.Label>
      <Box position="relative">
        {iconSource && (
          <Image
            source={iconSource}
            alt={label}
            w="20px"
            style={styles.inputIcon}
          />
        )}
        <Input
          {...inputProps}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          _focus={{ borderColor: "#333333", bg: "white" }}
          accessibilityLabel={`${label} Input`}
          isInvalid={error ? true : false}
          _input={{ fontSize: "sm", fontFamily: "satoshi-md" }}
          h={10}
          pl={10}
          autoCapitalize="none"
        />
        {secureTextEntry && (
          <Button
            variant="unstyled"
            position="absolute"
            right={0}
            onPress={togglePasswordVisibility}
          >
            <Feather
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="black"
              style={styles.passwordIcon}
            />
          </Button>
        )}
      </Box>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </FormControl>
  );
};

const styles = StyleSheet.create({
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
  label: {
    marginBottom: 10,
    fontFamily: "satoshi-md",
  },

  passwordIcon: {
    position: "absolute",
    right: 5,
    top: 0,
    zIndex: 2,
    width: 20,
    height: 20,
  },

  errorText: {
    color: "red",
    marginBottom: 5,
    fontFamily: "satoshi-md",
  },
});

export default LabeledInput;
