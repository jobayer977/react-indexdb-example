import authSlice from "../../redux/auth/auth.slice"
import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
	key: "root",
	storage,
	whitelist: [],
}

const rootReducer = combineReducers({
	authSlice,
})

export const persistedReducer: any = persistReducer(persistConfig, rootReducer)
