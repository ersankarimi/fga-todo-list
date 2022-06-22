import React, { useState, createContext, Children } from 'react'

const SidebarContext = createContext()

const SidebarContextProvider = ({ children }) => {
	const { innerWidth } = window
	const [sidebarIsOpen, setSidebarIsOpen] = useState(
		innerWidth <= 767 ? false : true
	)

	const toggleSidebarIsOpen = () => {
		setSidebarIsOpen(!sidebarIsOpen)
	}

	const value = [sidebarIsOpen, toggleSidebarIsOpen]

	return (
		<SidebarContext.Provider value={value}>
			{children}
		</SidebarContext.Provider>
	)
}

export { SidebarContextProvider, SidebarContext }
