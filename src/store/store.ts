import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slices/users-slice";


const rootReducer = combineReducers({
	data: usersSlice
})

export const store = () => 
{
	return configureStore({
		reducer: rootReducer
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store>
export type AppDispatch = AppStore['dispatch']