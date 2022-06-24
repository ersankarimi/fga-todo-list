import { useContext } from 'react'
import { ProjectManageFormContext } from '../context'

const useProjectManage = () => {
	return useContext(ProjectManageFormContext)
}

export { useProjectManage }
