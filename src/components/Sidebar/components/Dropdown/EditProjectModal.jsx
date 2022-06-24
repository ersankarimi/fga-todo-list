import React, { useState, useRef, useEffect } from 'react'
import { useDataTodos, ACTIONS } from '../../../../hooks'

const EditProjectModal = () => {
	const [projectName, setProjectName] = useState('')
	const [projectId, setProjectId] = useState('')
	const [{ todos }, dispacth] = useDataTodos()

	const inputRef = useRef(null)
	useEffect(() => {
		inputRef.current && inputRef.current.focus()
	})
	const handleProjectName = (e) => {
		setProjectName(e.target.value)
		setProjectId(e.target.dataset.id)
	}

	const handleClickCancel = () => {
		setProjectName('')
		setProjectId('')
		document.querySelector('#modal').classList.remove('flex')
	}

	const handleClickSave = () => {
		dispacth({
			type: ACTIONS.EDIT_PROJECT,
			payload: {
				projectNameUpdate: projectName,
				idTodo: projectId,
			},
		})
		document.querySelector('#modal').classList.remove('flex')
	}

	const handleKeyPressed = (e) => {
		if (e.code === 'Enter' && projectName) {
			return handleClickSave()
		}

		if (e.code === 'Escape') {
			return handleClickCancel()
		}
	}
	return (
		<dialog
			id='modal'
			className='bg-black-custom-1/50 w-screen h-screen z-50 justify-center items-center absolute top-0 bottom-0'
			onKeyDown={handleKeyPressed}
		>
			<div className='bg-white-100 w-[80%] md:w-[50%] lg:w-[30%] rounded-lg p-4'>
				<div className='p-2 md:p4 border-b-2 border-b-black-custom-1'>
					<h1 className='text-black-custom-1 font-semibold text-lg'>
						Edit Project
					</h1>
				</div>

				<div className='flex flex-col my-8'>
					<label
						htmlFor='edit-project-name'
						className='text-black-custom-1 my-2'
					>
						Project Name
					</label>
					<input
						type='text'
						id='edit-project-name'
						className='appearance-none ring-1 rounded-sm focus:ring-0 ring-black-custom-1/80 p-2'
						onChange={handleProjectName}
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
						onClick={handleClickSave}
						disabled={!projectName && true}
					>
						Save
					</button>
				</div>
			</div>
		</dialog>
	)
}

export default EditProjectModal
