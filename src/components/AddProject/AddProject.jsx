import React, { useState, useEffect, useRef } from 'react'
import { useProjectManage } from '../../hooks'
import { ACTIONS } from '../../hooks'
import { useDataTodos } from '../../hooks'

const AddProject = () => {
	const { AddProjectManageIsOpen, toggleAddProjectManageIsOpen } =
		useProjectManage()
	const [projectName, setProjectName] = useState('')
	const [{ todos }, dispacth] = useDataTodos()

	const inputRef = useRef(null)
	useEffect(() => inputRef.current && inputRef.current.focus())

	const handleInputChange = (e) => {
		setProjectName(e.target.value)
	}

	const handleClickCancel = () => {
		setProjectName('')
		toggleAddProjectManageIsOpen()
	}

	const handleClickAdd = () => {
		dispacth({
			type: ACTIONS.ADD_NEW_PROJECT,
			payload: projectName,
		})
		setProjectName('')
		toggleAddProjectManageIsOpen()
	}

	const handleKeyPressed = (e) => {
		if (e.code === 'Enter' && projectName) {
			return handleClickAdd()
		}

		if (e.code === 'Escape') {
			return handleClickCancel()
		}
	}

	return (
		<div
			className={`flex justify-center items-center flex-col absolute top-0 right-0 left-0 bottom-0 z-50 bg-black-custom-1/50 ${
				AddProjectManageIsOpen ? 'block' : 'hidden'
			} p-2 md:p-4`}
			onKeyDown={handleKeyPressed}
		>
			<div className='bg-white-100 w-[80%] md:w-[50%] lg:w-[30%] rounded-lg p-4'>
				<div className='p-2 md:p4 border-b-2 border-b-black-custom-1'>
					<h1 className='text-black-custom-1 font-semibold text-lg'>
						Add Project
					</h1>
				</div>

				<div className='flex flex-col my-8'>
					<label
						htmlFor='project-name'
						className='text-black-custom-1 my-2'
					>
						Project Name
					</label>
					<input
						type='text'
						id='project-name'
						className='appearance-none ring-1 rounded-sm focus:ring-0 ring-black-custom-1/80 p-2'
						value={projectName}
						onChange={handleInputChange}
						ref={inputRef}
					/>
				</div>
				<div className='flex max-w-[50%]'>
					<button
						type='button'
						className='bg-white p-2 rounded-md appearance-none ring-1 ring-black-custom-1/50 hover:ring-black-custom-1/80 '
						onClick={handleClickCancel}
					>
						Cancel
					</button>
					<button
						type='button'
						className='p-2 mx-4 bg-red-400 rounded-md disabled:bg-red-300 ring-1 ring-red-400 disabled:ring-red-300'
						onClick={handleClickAdd}
						disabled={!projectName && true}
					>
						Add
					</button>
				</div>
			</div>
		</div>
	)
}

export default AddProject
