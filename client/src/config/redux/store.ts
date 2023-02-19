import { ENV } from '../../ENV'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { persistStore } from 'redux-persist'
import { persistedReducer } from './rootReducer'

const middleware: any = []

if (process.env.NODE_ENV === 'development' && ENV.REDUX_LOGGER) {
	middleware.push(logger)
}

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [...middleware],
})
export const persistedStore = persistStore(store)
