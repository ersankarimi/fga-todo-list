import { useContext } from 'react'
import { DataTodos } from '../context'

const useDataTodos = () => {
	return useContext(DataTodos)
}

export { useDataTodos }
