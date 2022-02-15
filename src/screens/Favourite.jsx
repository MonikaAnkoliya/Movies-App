import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { deleteMovie } from "../actions/movies";
import Item from "./components/Item";

const Favourite = ({ navigation }) => {
  const movies = useSelector((state) => state.rootReducer.movie);
  const dispatch = useDispatch();
  const deleteNote = (id) => dispatch(deleteMovie(id));
  const [moviefav, setMovieFav] = useState(moviefav);

  useEffect(() => {
    const temp = movies.map((item) => {
      item.favorite = "Delete Favourite";
      return item;
    });
    setMovieFav(temp);
  }, [movies]);

  const renderItem = ({ item }) => (
    <Item
      item={item}
      onClick={() => navigation.navigate("Detail", { item })}
      onButtenClick={() => deleteNote(item.id)}
      buttonText={item.favorite}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      {movies.length > 0 ? (
        <FlatList
          data={moviefav}
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
