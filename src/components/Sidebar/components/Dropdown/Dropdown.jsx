import React, { useState, useEffect } from 'react'
import { ACTIONS } from '../../../../hooks'
import { useProjectManage, useDataTodos } from '../../../../hooks'
import { NavLink, useNavigate } from 'react-router-dom'
import DeleteProject from './DeleteProject'
import EditProjectIcon from './EditProjectIcon'
import EditProjectModal from './EditProjectModal'

const Dropdowns = () => {
	const [dropdownIsOpen, setDropdownIsOpen] = useState(true)
	const { toggleAddProjectManageIsOpen } = useProjectManage()
	const [{ todos }, dispacth] = useDataTodos()
	const [dialogIsOpen, setDialogIsOpen] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		dispacth({
			type: ACTIONS.GET_TODO_FROM_LOCAL_STORAGE,
		})
	}, [])

	console.log('TOEODSSS', todos)

	const handleDropdownIsOpen = () => {
		setDropdownIsOpen(!dropdownIsOpen)
	}

	// const handleClickList = (link) => {
	// 	navigate(link)
	// }

	const handleClickDeleteProject = (id) => {
		console.log(id)
		dispacth({
			type: ACTIONS.DELETE_PROJECT,
			payload: id,
		})
	}

	const handleClickEditProject = (id) => {
		console.log(id)
		const { project } = todos.find((todo) => todo.id === id)
		console.log('PEROJEK', project)
		setDialogIsOpen(!dialogIsOpen)
		document.querySelector('#modal').classList.add('flex')
		const inputField = document.querySelector('#edit-project-name')
		inputField.value = project
		inputField.dataset.id = id
	}

	return (
		<>
			<EditProjectModal />
			<div className='dropdowns w-full flex flex-col'>
				<div className='flex p-2'>
					<button
						type='button'
						className='flex justify-between w-full'
						onClick={handleDropdownIsOpen}
						id='button-dropdown'
					>
						<div className='flex'>
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className={`${
									dropdownIsOpen ? 'rotate-90' : 'rotate-0'
								} ease-in duration-100`}
								id='dropdown-arrow-icon'
							>
								<path
									d='M9 5L16 12L9 19'
									stroke='#333'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
							<span className='text-black-custom-1'>Project</span>
						</div>
					</button>
					<div id='add-project' className='cursor-pointer'>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							onClick={toggleAddProjectManageIsOpen}
						>
							<path
								d='M12 6V12M12 12V18M12 12H18M12 12H6'
								stroke='#333'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>
				</div>
				<div
					id='dropdown-item'
					className={`mt-2 ${dropdownIsOpen ? 'block' : 'hidden'}`}
				>
					<ul>
						{todos.map((todo) => {
							const { project, id } = todo
							return (
								<li
									key={id}
									className=' p-2 text-black-custom-1 flex items-center justify-between hover:bg-gray-custom-1 hover:cursor-pointer rounded-md'
									onMouseEnter={() => {
										document
											.querySelector(
												`#icon-${String(id)}`
											)
											.classList.remove('opacity-0')
									}}
									onMouseLeave={() => {
										document
											.querySelector(
												`#icon-${String(id)}`
											)
											.classList.add('opacity-0')
									}}
								>
									<div className='flex items-center'>
										<span className='rounded-full bg-slate-800 w-[10px] h-[10px] mr-4'></span>
										<NavLink to={`project/${id}`}>
											{project}
										</NavLink>
									</div>
									<div
										className='flex items-center opacity-0'
										id={`icon-${String(id)}`}
									>
										<EditProjectIcon
											id={id}
											handleClickEditProject={
												handleClickEditProject
											}
										/>
										<DeleteProject
											id={id}
											handleClickDeleteProject={
												handleClickDeleteProject
											}
										/>
									</div>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</>
	)
}

export { Dropdowns }
