import { AppProvider } from './context'
import AppRoutes from './routes'
import React from 'react'

const App = () => {
	return (
		<AppProvider>
			<AppRoutes />
		</AppProvider>
	)
}

export default App
