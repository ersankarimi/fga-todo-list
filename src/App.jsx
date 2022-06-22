import React, { useEffect, useState } from 'react'
import { Navbar } from './components'
import { useSidebar } from './hooks'

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
			<aside
				className={`bg-white-custom-2 sticky top-0 z-50 h-screen min-w-[50%] max-w-[50%] md:min-w-[30%] md:max-w-[30%] lg:min-w-[15%] lg:max-w-[15%] ${
					sidebarIsOpen
						? 'translate-x-0 block'
						: '-translate-x-96 hidden'
				}  ease-out duration-500 shadow-slate-300 shadow-lg`}
			>
				ASIDE
			</aside>
			<div id='content' className='flex flex-col min-h-screen'>
				<header className='bg-red-custom-1 sticky top-0 z-30'>
					<nav className='flex p-4'>
						<Navbar />
					</nav>
				</header>
				<main className='bg-white-100 relative h-full overflow-y-auto p-4 lg:py-4 lg:px-12'>
					CONTENT
				</main>
			</div>
		</>
	)
}

export default App
