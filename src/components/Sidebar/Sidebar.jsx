import React, { useEffect } from 'react'
import { useSidebar } from '../../hooks'
import { Dropdowns } from './components/Dropdown/Dropdown'
import { Link } from 'react-router-dom'

const Sidebar = () => {
	const [sidebarIsOpen, toggleSidebar] = useSidebar()

	useEffect(() => {
		const { innerWidth } = window
		sidebarIsOpen && innerWidth <= 639
			? document.body.classList.add('overflow-hidden')
			: document.body.classList.remove('overflow-hidden')
	}, [sidebarIsOpen])

	const handleShowHiddenSidebar = (e) => {
		console.log(e.target)
		const { innerWidth } = window
		innerWidth <= 767 &&
			sidebarIsOpen &&
			!e.target.id !== 'button-dropdown' &&
			!e.target.classList.contains('dropdown-arrow-icon-svg') &&
			!e.target.classList.contains('dropdown-arrow-icon-path') &&
			!e.target.classList.contains('edit-project-icon-svg') &&
			!e.target.classList.contains('edit-project-icon-path') &&
			!e.target.textContent == 'Cancel' &&
			!e.target.classList.contains('button-add-save') &&
			toggleSidebar()
	}

	return (
		<div className='w-screen sm:w-full flex overflow-hidden'>
			<div
				className='flex h-screen w-full  flex-col overflow-hidden p-2 md:p-4'
				onClick={handleShowHiddenSidebar}
			>
				<h1 className='font-semibold text-xl md:text-2xl text-center p-2 cursor-pointer'>
					<Link to='/'>Todosst</Link>
				</h1>
				<div
					id='project-items'
					className='flex flex-col justify-center items-center mt-8 p-2 md:p-4'
				>
					<Dropdowns />
				</div>
			</div>
			<div
				id='overlay'
				className='bg-black-custom-1/90 backdrop-blur-sm min-w-[40%] sm:hidden'
				onClick={handleShowHiddenSidebar}
			></div>
		</div>
	)
}

export default Sidebar
