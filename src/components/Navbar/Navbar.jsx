import React, { useState } from 'react'
import { useSidebar } from '../../hooks'

const Navbar = () => {
	const [sidebarIsOpen, toggleSidebar] = useSidebar()
	return (
		<>
			<svg
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				className='cursor-pointer'
				xmlns='http://www.w3.org/2000/svg'
				onClick={toggleSidebar}
			>
				<path
					d='M4 18H20M4 6H20H4ZM4 12H20H4Z'
					stroke='#F4F4F4'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		</>
	)
}

export default Navbar
