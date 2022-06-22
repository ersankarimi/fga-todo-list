import React from 'react'

const App = () => {
	return (
		<>
			<aside className='bg-slate-400 sticky top-0 z-50 h-screen min-w-[50%] max-w-[50%] md:min-w-[30%] md:max-w-[30%] lg:min-w-[15%] lg:max-w-[15%]'>
				ASIDE
			</aside>
			<div id='content' className='flex flex-col min-h-screen'>
				<header className='bg-slate-800 sticky top-0 z-30'>
					<nav>asdsad</nav>
				</header>
				<main className='bg-red-200 relative h-full overflow-y-auto p-4 lg:py-4 lg:px-12'>
					content
				</main>
				<footer className='w-full bg-gray-500'>FOOTER</footer>
			</div>
		</>
	)
}

export default App
