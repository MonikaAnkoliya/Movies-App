// import the dependency
import remove from "lodash.remove";
import { ADD_MOVIE, DELETE_MOVIE, DELETE_NOTE } from "../actions/movies";

// reducer

const initialState = {
  movie: [],
};

function movieReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MOVIE:
      const arr = [...state.movie, action.payload]
      const filteredArr = arr.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      return {
        ...state,
        movie: filteredArr,
      };

    case DELETE_MOVIE:
      const deletedNewArray = remove(state.movie, (obj) => {
        return obj.id != action.payload;
      });
      console.log('deletedNewArray', deletedNewArray)
      return { ...state, movie: deletedNewArray };

    default:
      return state;
  }
}

export default movieReducer;
