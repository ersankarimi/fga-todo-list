import React, { useState } from 'react'

const ProjectManageForm = ({ isOpen }) => {
	const [projectManageIsOpen, setProjectManageIsOpen] =
		useState(isOpen)(projectManageIsOpen)

	return (
		<div
			className={`absolute top-0 right-0 left-0 bottom-0 z-50 bg-black-custom-1/50 ${
				projectManageIsOpen ? 'block' : 'hidden'
			}`}
		>
			<button
				type='button'
				className='bg-white p-2'
				onClick={() => setProjectManageIsOpen(isOpen)}
			>
				Cancel
			</button>
		</div>
	)
}

export default ProjectManageForm
