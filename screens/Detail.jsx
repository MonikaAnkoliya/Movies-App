import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useRoute } from '@react-navigation/native'
import Item from "./components/Item";

const Detail = () => {
  const route = useRoute();
  console.log('route.params.item', route.params.item)
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Detail screen</Text>
      <Item item={route.params.item} detail={true}/>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
  },
});

export default Detail;
