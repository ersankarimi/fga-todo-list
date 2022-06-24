import { createContext, useReducer, useState } from 'react'
import { reducer, initialState } from '../hooks'

const DataTodos = createContext()

const DataTodosProvider = ({ children }) => {
	const [todos, dispacth] = useReducer(reducer, initialState)

	const value = [todos, dispacth]

	return <DataTodos.Provider value={value}>{children}</DataTodos.Provider>
}

export { DataTodos, DataTodosProvider }
