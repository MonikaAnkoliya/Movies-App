import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useRoute } from '@react-navigation/native'
import Item from "./components/Item";

const Detail = () => {
  const route = useRoute();
  return (
    <ScrollView style={styles.center}>
      <Text style={styles.title}>Detail screen</Text>
      <Item item={route.params.item} detail={true} buttonText={route.params.item.favorite}/>
    </ScrollView>
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
