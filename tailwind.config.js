module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'red-custom-1': '#F47C7C',
				'white-100': '#FFFFFF',
				'white-custom-1': '#FAFAFA',
				'white-custom-2': '#F4F4F4',
				'gray-custom-1': '#EEEEEE',
				'black-custom-1': '#333333',
			},
			boxShadow: {
				'item-shadow':
					' 10px 10px 20px #262C37, -10px -10px 20px rgba(72, 80, 99, 0.26)',
			},
		},
	},
	plugins: [],
}
