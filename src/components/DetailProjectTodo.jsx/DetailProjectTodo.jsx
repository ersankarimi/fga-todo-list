import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDataTodos, ACTIONS } from '../../hooks'
import {
	EditTodoIcon,
	DeleteTodoIcon,
	AddTodoIcon,
	EditTodoModal,
} from './components'

const DetailProjectTodo = () => {
	const [addTodoIsOpen, setAddTodoIsOpen] = useState(false)
	const [newTodoInput, setNewTodoInput] = useState('')
	const inputRef = useRef(null)
	let [{ todos }, dispacth] = useDataTodos()
	const { projectId } = useParams()
	todos = todos.filter((value) => value.id === Number(projectId))

	const handleChangeNewTodo = (e) => {
		setNewTodoInput(e.target.value)
	}

	const handleAddTodoIsOpen = (e) => {
		setAddTodoIsOpen(!addTodoIsOpen)
	}

	const handleClickCancel = () => {
		setNewTodoInput('')
		setAddTodoIsOpen(!addTodoIsOpen)
	}

	const handleSaveNewTodo = (projectId) => {
		dispacth({
			type: ACTIONS.ADD_TODO,
			payload: {
				newTodoInput,
				projectId,
			},
		})
		setNewTodoInput('')
		inputRef.current && inputRef.current.focus()
	}
	const handleKeyPressed = (code, id) => {
		if (code === 'Enter' && newTodoInput) {
			return handleSaveNewTodo(id)
		}

		if (code === 'Escape') {
			return handleClickCancel()
		}
	}

	const handleTodoIsComplete = (projectId, todoId, isComplete) => {
		dispacth({
			type: ACTIONS.UPDATE_TODO_IS_COMPLETE,
			payload: {
				projectId,
				isComplete,
				todoId,
			},
		})
	}

	const handleDeleteTodo = (projectId, todoId) => {
		dispacth({
			type: ACTIONS.DELETE_TODO,
			payload: {
				projectId,
				todoId,
			},
		})
	}

	const handleTodoEdit = (todo, projectId, todoId) => {
		console.log('huft', todo, projectId, todoId)
		const editTodoModal = document.querySelector('#todo-edit-modal')
		const inputFieldTodo = document.querySelector('#edit-todo')
		inputFieldTodo.value = todo
		inputFieldTodo.dataset.projectId = projectId
		inputFieldTodo.dataset.todoId = todoId

		editTodoModal.show()
		editTodoModal.classList.add('flex')
	}

	useEffect(() => {
		inputRef.current && inputRef.current.focus()
	}, [addTodoIsOpen])

	return (
		<>
			<EditTodoModal />
			{todos.map((todo) => {
				const { project, todos, id } = todo
				return (
					<div key={id}>
						<h2
							className='text-black-custom-1 font-bold text-xl mb-4'
							key={id}
						>
							{project}
						</h2>

						{todos.map((todo) => {
							return (
								<div
									className='flex items-center w-[40%] sm:w-full lg:max-w-[50%] '
									key={todo.id}
									onMouseEnter={() => {
										document
											.querySelector(
												`#manage-todo-${todo.id}`
											)
											.classList.remove('opacity-0')
									}}
									onMouseLeave={() => {
										document
											.querySelector(
												`#manage-todo-${todo.id}`
											)
											.classList.add('opacity-0')
									}}
								>
									<input
										type='checkbox'
										className='sm:w-5 sm:h-5'
										checked={todo.isComplete}
										onChange={(e) =>
											handleTodoIsComplete(
												id,
												todo.id,
												e.target.checked
											)
										}
									/>
									<div className='flex items-center'>
										<input
											type='text'
											value={todo.todo}
											className={`appearance-none focus:ring-0 outline-none p-2 ${
												todo.isComplete
													? 'line-through'
													: 'no-underline'
											} ${
												todo.isComplete
													? 'text-black-custom-1/60'
													: 'text-black-custom-1'
											}`}
											disabled
											data-todo-id={todo.id}
										/>
									</div>

									<div
										className=' flex m-auto opacity-0'
										id={`manage-todo-${todo.id}`}
									>
										<EditTodoIcon
											{...{
												handleTodoEdit,
												projectId: id,
												todoId: todo.id,
												todo: todo.todo,
											}}
										/>
										<DeleteTodoIcon
											{...{
												todoId: todo.id,
												projectId,
												handleDeleteTodo,
											}}
										/>
									</div>
								</div>
							)
						})}

						<div
							id='add-todo'
							className='flex flex-col mt-4'
							onKeyDown={(e) => handleKeyPressed(e.code, id)}
						>
							<div
								className={`flex flex-col ${
									addTodoIsOpen ? 'flex' : 'hidden'
								}`}
							>
								<input
									type='text'
									placeholder='Add your todo'
									className='placeholder:text-black-custom-1/60 p-2 rounded-md appearance-none ring-1 ring-black-custom-1'
									value={newTodoInput}
									onChange={handleChangeNewTodo}
									ref={inputRef}
								/>
								<div className='flex my-2'>
									<button
										type='button'
										className='bg-white p-2 rounded-md appearance-none ring-1 ring-black-custom-1/50 hover:ring-black-custom-1/80'
										onClick={handleClickCancel}
									>
										Cancel
									</button>
									<button
										type='button'
										className=' border-2 border-black-custom-1 p-2 mx-4 bg-red-400 rounded-md disabled:bg-red-300 ring-1 ring-red-400 disabled:ring-red-300'
										disabled={newTodoInput ? false : true}
										onClick={() => handleSaveNewTodo(id)}
									>
										Save
									</button>
								</div>
							</div>
							<div className=''>
								<button
									type='button'
									className={`flex cursor-pointer  hover:[&:nth-child(1)]:text-red-500 [&:nth-child(1)]:text-black-custom-1/80 mt-4 p-2 rounded-md ${
										!addTodoIsOpen ? 'block' : 'hidden'
									} `}
									onClick={handleAddTodoIsOpen}
								>
									<AddTodoIcon />
									<h3 className={`mx-4`}>Add Todo</h3>
								</button>
							</div>
						</div>
					</div>
				)
			})}
		</>
	)
}

export default DetailProjectTodo
