const ACTIONS = {
	GET_TODO_FROM_LOCAL_STORAGE: 'get_todo',
	ADD_TODO: 'add_todo',
	DELETE_TODO: 'delete_todo',
	UPDATE_TODO: 'update_todo',
	UPDATE_TODO_IS_COMPLETE: 'update_todo_is_complete',
	ADD_NEW_PROJECT: 'add_new_project',
	DELETE_PROJECT: 'delete_project',
	EDIT_PROJECT: 'edit_project',
}

const STORAGE_KEY = 'todos'

const initialState = {
	todos: [],
}

const reducer = (state, action) => {
	const { type, payload } = action
	const {
		GET_TODO_FROM_LOCAL_STORAGE,
		ADD_TODO,
		DELETE_TODO,
		UPDATE_TODO_IS_COMPLETE,
		ADD_NEW_PROJECT,
		DELETE_PROJECT,
		EDIT_PROJECT,
		UPDATE_TODO,
	} = ACTIONS

	let dataTodos = JSON.parse(localStorage.getItem(STORAGE_KEY))

	const { projectId, newTodoInput, todoId, isComplete } = payload || {}

	const setDataToLocalStorage = (data) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
	}

	switch (type) {
		case GET_TODO_FROM_LOCAL_STORAGE:
			if (!dataTodos || !dataTodos.length) {
				dataTodos = []
				localStorage.setItem(STORAGE_KEY, JSON.stringify(dataTodos))
			}

			return {
				...state,
				todos: dataTodos,
			}

		case ADD_NEW_PROJECT:
			'data add', dataTodos
			dataTodos = [
				...dataTodos,
				{
					id: Date.now(),
					project: payload,
					todos: [],
				},
			]
			setDataToLocalStorage(dataTodos)
			return {
				...state,
				todos: dataTodos,
			}

		case DELETE_PROJECT:
			dataTodos = dataTodos.filter((value) => {
				const { id } = value
				return id !== payload
			})

			setDataToLocalStorage(dataTodos)
			return {
				...state,
				todos: dataTodos,
			}
		case EDIT_PROJECT:
			const { projectNameUpdate, idTodo } = payload
			dataTodos = dataTodos.map((todo) => {
				let { id } = todo
				if (id === Number(idTodo)) todo.project = projectNameUpdate
				return todo
			})
			setDataToLocalStorage(dataTodos)
			return {
				...state,
				todos: dataTodos,
			}
		case ADD_TODO:
			dataTodos = dataTodos.map((todo) => {
				const { id, todos } = todo
				if (id === projectId) {
					todos.push({
						id: Date.now(),
						todo: newTodoInput,
						isComplete: false,
					})
				}
				return todo
			})

			setDataToLocalStorage(dataTodos)
			return {
				...state,
				todos: dataTodos,
			}
		case UPDATE_TODO_IS_COMPLETE:
			dataTodos = dataTodos.map((todo) => {
				let { id, todos } = todo
				if (id === projectId)
					todos.map((item) => {
						let { id } = item
						if (id === todoId) item.isComplete = isComplete
						return item
					})
				return todo
			})

			setDataToLocalStorage(dataTodos)
			return {
				...state,
				todos: dataTodos,
			}
		case DELETE_TODO:
			dataTodos = dataTodos.map((todo) =>
				todo.id === projectId
					? ((todo.todos = todo.todos.filter(
							(item) => item.id !== todoId
					  )),
					  todo)
					: todo
			)

			setDataToLocalStorage(dataTodos)
			return {
				...state,
				todos: dataTodos,
			}
		case UPDATE_TODO:
			dataTodos = dataTodos.map((todo) => {
				todo.id === Number(projectId)
					? (todo.todos = todo.todos.map((item) => {
							if (item.id === Number(todoId)) {
								item.todo = newTodoInput
							}
							return item
					  }))
					: todo
				return todo
			})
			setDataToLocalStorage(dataTodos)
			return {
				...state,
				todos: dataTodos,
			}
	}
}

export { reducer, initialState, ACTIONS }
