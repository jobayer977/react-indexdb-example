import React from "react"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
	const navigate = useNavigate()
	return (
		<div
			className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
			role="alert">
			<h2 className="text-lg font-semibold">Not Found :( </h2>
			<button className="mt-4 bg-gray-100 p-5" onClick={() => navigate("/")}>
				Refresh
			</button>
		</div>
	)
}

export default NotFound
