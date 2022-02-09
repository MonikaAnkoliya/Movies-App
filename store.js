import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/movies';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const movieReducer = combineReducers({
  rootReducer: persistReducer(persistConfig, rootReducer)
});

export const store = createStore(movieReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
