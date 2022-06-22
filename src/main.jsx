import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SidebarContextProvider } from './context'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<React.StrictMode>
			<SidebarContextProvider>
				<App />
			</SidebarContextProvider>
		</React.StrictMode>
	</BrowserRouter>
)
