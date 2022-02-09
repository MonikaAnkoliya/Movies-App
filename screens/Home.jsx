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
import Item from "./components/Item";
import { Searchbar } from "react-native-paper";
import {
  addMovie,
  getAllMovies,
  searchByTitle,
} from "../actions/movies";

const Home = ({ navigation }) => {
  const movies = useSelector((state) => state.rootReducer.movie);
  const dispatch = useDispatch();
  const addNote = (note) => dispatch(addMovie(note));
  const [latestMovie, setLatestMovie] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [films, setFilms] = useState([]);

  useEffect(() => {
    getData();
  }, [movies]);

  const getData = async () => {
    let t = [];
    const bbb = await getAllMovies();

    const latestfilm = [];
    Promise.all(bbb).then((responses) => {
      responses.map((response) => {
        if (!movies.find((o) => o.id === response.id)) {
          latestfilm.push(response);
        }
      });
      setLatestMovie(latestfilm);
      setFilms(latestfilm);
    });
  };
  const searchMovie = (str) => {
    if (str.length > 0) {
      setSearchQuery(str);
      searchByTitle(latestMovie, str).then((res) => {
        setLatestMovie(res);
      });
    } else {
      setLatestMovie(films);
    }
  };

  const renderItem = ({ item }) => (
    <Item
      item={item}
      onClick={() => navigation.navigate("Detail")}
      onButtenClick={() => addNote(item)}
      buttonText={"Add Favourite"}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={searchMovie}
        value={searchQuery}
      />
      <FlatList
        data={latestMovie}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item.id + index).toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default Home;
