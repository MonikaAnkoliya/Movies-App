import React, { useEffect, useState } from "react";
import {
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
  deleteMovie,
} from "../actions/movies";

const Home = ({ navigation }) => {
  const movies = useSelector((state) => state.rootReducer.movie);
  const dispatch = useDispatch();
  const addNote = (note) => dispatch(addMovie(note));
  const deleteNote = (id) => dispatch(deleteMovie(id));
  const [latestMovie, setLatestMovie] = useState(movies);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [films, setFilms] = useState(movies);
  const [buttenText, setButtonText] = useState("Add Favourite");

  useEffect(() => {
    getData();
  }, [movies]);

  const getData = async () => {
    let t = [];
    const MoviesData = await getAllMovies();

    const latestfilm = [];
    Promise.all(MoviesData).then((responses) => {
      responses.map((response) => {
        if (!movies.find((o) => o.id === response.id)) {
          response.favorite = "Add Favourite";
          latestfilm.push(response);
        } else {
          response.favorite = "Remove Favourite";
          latestfilm.push(response);
        }
      });
      console.log("searchQuery", searchQuery);
      if (searchQuery) {
        setLatestMovie(latestfilm);
        searchMovie(searchQuery, latestfilm);
        // setFilms(latestfilm);
      } else {
        setLatestMovie(latestfilm);
        setFilms(latestfilm);
      }
    });
  };

  const searchMovie = (str, latestfilm) => {
    if (str.length > 0) {
      setSearchQuery(str);
      searchByTitle(latestfilm, str).then(
        (res) => {
          setLatestMovie(res);
        }
      );
    } else {
      setSearchQuery("");
      setLatestMovie(films);
    }
  };

  const onClick = (item) => {
    console.log("item", item);
    if (!movies.find((o) => o.id === item.id)) {
      addNote(item);
    } else {
      deleteNote(item.id);
    }
  };

  const renderItem = ({ item }) => (
    <Item
      item={item}
      onClick={() => navigation.navigate("Detail", { item })}
      onButtenClick={() => onClick(item)}
      buttonText={item.favorite}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={(str)=>searchMovie(str, films)}
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
