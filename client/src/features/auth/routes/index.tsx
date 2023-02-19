import Login from "./login.component"
import React from "react"
import Register from "./register.component"

export const AuthRoutes = [
	{
		path: "",
		element: <Login />,
	},
	{
		path: "register",
		element: <Register />,
	},
]
