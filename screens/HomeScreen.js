import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { Button, Input, Box } from "native-base";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useGetProducts } from "../services/query/products.query";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const HomePage = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { data, isLoading } = useGetProducts({
    onError: (error) => console.log(error),
  });

  const { addToCart, cartItems } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.header}>
        <Box>
          <Feather name="menu" size={24} color="black" />
        </Box>
        <Box>
          <Text style={styles.greetingText}>
            Happy shopping, {user.firstName}
          </Text>
        </Box>
        <Pressable style={styles.cartContainer}>
          <AntDesign
            name="shoppingcart"
            size={24}
            color="black"
            onPress={() => navigation.navigate("Cart")}
          />
          {cartItems.length ? (
            <Box
              style={styles.cartItemCount}
              onPress={() => navigation.navigate("Cart")}
            >
              <Text style={styles.cartItemCountText}>
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </Text>
            </Box>
          ) : null}
        </Pressable>
      </Box>

      <Box style={styles.content}>
        <Box>
          <Text style={styles.headerText}>Explore</Text>
          <Text style={styles.subheaderText}>best Outfits for you</Text>
        </Box>

        <Box style={styles.searchBar}>
          <AntDesign name="search1" size={20} style={styles.searchIcon} />
          <Input
            placeholder="Search"
            autoCapitalize="none"
            fontSize={16}
            h={12}
            pl={"45px"}
            pr={"55px"}
            bg="white"
            w="100%"
            position="relative"
            _focus={{
              bg: "white",
              borderColor: "#333333",
            }}
          />
          <Box style={styles.filterIconContainer}>
            <AntDesign name="filter" size={20} style={styles.filterIcon} />
          </Box>
        </Box>

        <Box style={styles.categoriesContainer}>
          <Box style={styles.category}>
            <Image
              source={require("../assets/dress.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Dress</Text>
          </Box>
          <View style={styles.category}>
            <Image
              source={require("../assets/shirts.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Shirts</Text>
          </View>
          <View style={styles.category}>
            <Image
              source={require("../assets/trousers.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Trousers</Text>
          </View>
          <Box style={styles.category}>
            <Image
              source={require("../assets/Tshirts.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Tshirt</Text>
          </Box>
        </Box>

        <Box style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>New Arrival</Text>

          <Text style={styles.sectionHeaderSubtext}>See all</Text>
        </Box>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.productsContainer}
        >
          {data?.products?.map((product) => (
            <Box style={styles.productItem} key={product.id}>
              <Image
                source={{ uri: product?.images[0] }}
                style={styles.productImage}
              />
              <Text
                style={styles.productTitle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {product.title}
              </Text>
              <Text style={styles.productPrice}>${product.price}</Text>
              <Button
                block
                onPress={() => handleAddToCart(product)}
                style={styles.addButton}
                isLoading={isLoading}
              >
                <Text style={styles.btnText}>
                  {cartItems.find((item) => item.id === product.id)
                    ? "Add More"
                    : "Add to Cart"}
                </Text>
              </Button>
            </Box>
          ))}
        </ScrollView>
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
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    backgroundColor: "#fff",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "93%",
    height: 40,

    alignItems: "center",
    paddingHorinzontal: 3,
  },

  cartContainer: {
    position: "relative",
  },

  cartItemCount: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#F67952",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  cartItemCountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  headerText: {
    fontSize: 35,
    marginTop: 10,
    fontFamily: "satoshi-bold",
  },

  subheaderText: {
    fontSize: 25,
    marginVertical: 10,
    fontFamily: "satoshi-lt",
  },

  greetingText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "satoshi-md",
  },
  content: {
    padding: 10,
  },
  searchBar: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
    position: "relative",
    marginTop: 15,
  },
  searchIcon: {
    color: "#00000080",
    position: "absolute",
    left: 15,
    top: 14,
    zIndex: 2,
  },
  filterIconContainer: {
    position: "absolute",
    width: 35,
    height: 35,
    backgroundColor: "#F67952",
    right: 10,
    top: 6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  filterIcon: {
    color: "white",
  },

  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 20,
  },
  category: {
    alignItems: "center",
    borderRadius: 15,
    paddingVertical: 13,
    width: 80,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
  },
  categoryImage: {
    width: 25,
    height: 36,
    marginBottom: 7,
  },

  categoryText: {
    fontFamily: "satoshi-lt",
  },

  sectionHeader: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionHeaderText: {
    fontFamily: "satoshi-bold",
    fontSize: 23,
  },

  sectionHeaderSubtext: {
    fontFamily: "satoshi-md",
    fontSize: 17,
  },

  productsContainer: {
    marginVertical: 10,
    height: 200,
  },
  productItem: {
    marginRight: 15,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    height: 270,
    width: 155,
    padding: 13,
  },
  productImage: {
    width: 100,
    height: 140,
    marginBottom: 13,
  },

  productTitle: {
    fontFamily: "satoshi-md",
    textTransform: "capitalize",
    marginBottom: 5,
    textAlign: "center",
  },
  productPrice: {
    fontFamily: "satoshi-bold",
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#F67952",
    height: 35,
    width: "100%",
    alignSelf: "center",
    borderRadius: "133px",
  },

  btnText: {
    color: "#fff",
    fontFamily: "satoshi-bold",
    fontSize: 12,
  },
});

export default HomePage;
