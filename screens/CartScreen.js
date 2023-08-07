import React, { useContext } from "react";
import { StyleSheet, Image } from "react-native";
import { Text, Box, Button } from "native-base";
import { CartContext } from "../context/CartContext";
import { AntDesign } from "@expo/vector-icons";

const CartScreen = ({ navigation }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Box style={styles.container}>
      <Box style={styles.header}>
        <Box onPress={() => navigation.goBack()}>
          <AntDesign
            name="left"
            size={24}
            color="black"
            onPress={() => navigation.navigate("Home")}
          />
        </Box>
        <Box flex={1} alignItems="center">
          <Text style={styles.headerText}>My Cart</Text>
        </Box>
      </Box>
      {cartItems.length === 0 ? (
        <Box style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
          <Button
            onPress={() => navigation.navigate("Home")}
            style={styles.shoppingBtn}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <>
          <Box style={{ flex: 1 }}>
            {cartItems.map((item) => (
              <Box key={item.id} style={styles.card}>
                <Image source={{ uri: item.images[0] }} style={styles.image} />
                <Box style={styles.details}>
                  <Text style={styles.productTitle}>{item.title}</Text>
                  <Text style={styles.productPrice}>${item.price}</Text>
                  <Box style={styles.quantityContainer}>
                    <Button
                      onPress={() => handleRemoveFromCart(item)}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </Button>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <Button
                      onPress={() => handleAddToCart(item)}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Box>
            <Text style={styles.checkoutText}>
              Total: ${totalPrice?.toLocaleString()}
            </Text>
            <Button
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate("Checkout")}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFD",
    padding: 10,
  },

  header: {
    flexDirection: "row",
    marginBottom: 15,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "satoshi-bold",
  },

  emptyCartContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 600,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontFamily: "satoshi-bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#F67952",
    height: 30,
    width: 30,
    borderRadius: 15,
    marginHorizontal: 5,
    position: "relative",
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "satoshi-md",
    position: "absolute",
    left: -7,
    top: -7,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  emptyCartText: {
    fontSize: 20,
    fontFamily: "satoshi-bold",
    color: "#555",
    marginBottom: 10,
  },

  shoppingBtn: {
    backgroundColor: "#F67952",
    height: 45,
    alignSelf: "center",
    borderRadius: "133px",
    width: 180,
    margingTop: 10,
  },

  checkoutText: {
    fontSize: 18,
    fontFamily: "satoshi-bold",
    color: "#555",
    marginBottom: 10,
  },

  checkoutBtn: {
    backgroundColor: "#F67952",
    height: 45,
    alignSelf: "center",
    borderRadius: "133px",
    width: "100%",
  },
});

export default CartScreen;
