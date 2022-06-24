import React, { useEffect, useState } from 'react'
import { Navbar, Sidebar, ProjectManageForm, AddProject } from './components'
import { useSidebar } from './hooks'
import { Outlet } from 'react-router-dom'

const App = () => {
	const [sidebarIsOpen, toggleSidebar] = useSidebar()

	const handleWindowResize = () => {
		const { innerWidth } = window
		innerWidth > 767 && !sidebarIsOpen && toggleSidebar()
		innerWidth <= 767 && sidebarIsOpen && toggleSidebar()
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize)
		return () => {
			window.removeEventListener('resize', handleWindowResize)
		}
	}, [window.innerWidth])

	return (
		<>
			<AddProject />
			<aside
				className={`bg-white-custom-2 sticky top-0 z-40 h-screen min-w-[60%] max-w-[60%] md:min-w-[35%] md:max-w-[35%] lg:min-w-[22%] lg:max-w-[22%] ${
					sidebarIsOpen
						? 'translate-x-0 block'
						: '-translate-x-96 hidden'
				}  ease-out duration-500 shadow-slate-300 shadow-lg`}
			>
				<Sidebar />
			</aside>
			<div id='content' className='flex flex-col min-h-screen'>
				<header className='bg-red-custom-1 sticky top-0 z-30'>
					<nav className='flex p-4'>
						<Navbar />
					</nav>
				</header>
				<main className='bg-white-100 relative h-full overflow-y-auto p-4 lg:py-4 lg:px-12 overflow-x-hidden'>
					<Outlet />
				</main>
			</div>
		</>
	)
}

export default App
