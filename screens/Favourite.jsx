import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { deleteMovie } from "../actions/movies";
import Item from "./components/Item";

const Favourite = ({ navigation }) => {
  const movies = useSelector((state) => state.rootReducer.movie);
  const dispatch = useDispatch();
  const deleteNote = (id) => dispatch(deleteMovie(id));

  const renderItem = ({ item }) => (
    <Item
      item={item}
      onClick={() => navigation.navigate("Detail")}
      onButtenClick={() => deleteNote(item.id)}
      buttonText={"Delete Favourite"}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      {movies.length > 0 ? (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item, index) => (item.id + index).toString()}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default Favourite;