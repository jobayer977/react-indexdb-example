import { Empty, Spin } from "antd"
import React, { CSSProperties } from "react"

interface Props {
	loading?: boolean
	empty?: boolean
	hide?: "*" | "loader" | "empty"
	children?: any
	style?: CSSProperties
}
export const Purify: React.FC<Props> = ({
	empty = false,
	loading = false,
	hide,
	children,
	style,
}) => {
	return (
		<>
			{loading === true ? (
				hide === "loader" || hide === "*" ? (
					<span></span>
				) : (
					<div className="h-60 grid place-content-center" style={style}>
						<Spin className="content-center" />
					</div>
				)
			) : empty === true ? (
				hide === "empty" || hide === "*" ? (
					<span></span>
				) : (
					<div style={style}>
						<Empty className="content-center" />
					</div>
				)
			) : (
				children
			)}
		</>
	)
}
