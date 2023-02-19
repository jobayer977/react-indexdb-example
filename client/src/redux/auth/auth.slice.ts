import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
	name: "authSlice",
	initialState: {
		isAuth: false,
		user: null,
	},
	reducers: {},
})
export default authSlice.reducer
