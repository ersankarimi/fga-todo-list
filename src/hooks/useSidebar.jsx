import { useContext } from 'react'
import { SidebarContext } from '../context/'

const useSidebar = () => {
	return useContext(SidebarContext)
}

export { useSidebar }
