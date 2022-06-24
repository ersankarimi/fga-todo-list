import { createContext, useState } from 'react'

const ProjectManageFormContext = createContext()

const ProjectManageFormProvider = ({ children }) => {
	const [AddProjectManageIsOpen, setAddProjectManageIsOpen] = useState(false)

	const toggleAddProjectManageIsOpen = () => {
		setAddProjectManageIsOpen(!AddProjectManageIsOpen)
	}

	const value = { AddProjectManageIsOpen, toggleAddProjectManageIsOpen }

	return (
		<ProjectManageFormContext.Provider value={value}>
			{children}
		</ProjectManageFormContext.Provider>
	)
}

export { ProjectManageFormContext, ProjectManageFormProvider }
