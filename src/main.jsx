import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
	SidebarContextProvider,
	ProjectManageFormProvider,
	DataTodosProvider,
} from './context'
import { DetailProjectTodo } from './components'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<DataTodosProvider>
		<SidebarContextProvider>
			<ProjectManageFormProvider>
				<BrowserRouter>
					<React.StrictMode>
						<Routes>
							<Route path='/' element={<App />}>
								<Route
									path='/project/:projectId'
									element={<DetailProjectTodo />}
								/>
							</Route>
						</Routes>
					</React.StrictMode>
				</BrowserRouter>
			</ProjectManageFormProvider>
		</SidebarContextProvider>
	</DataTodosProvider>
)
