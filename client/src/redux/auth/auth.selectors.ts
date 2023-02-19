import { createSelector } from "reselect"

export const selectAuth = (state: any) => state.authSlice

export const selectIsAuth = createSelector(
	[selectAuth],
	(edge: any) => edge.isAuthenticated
)
