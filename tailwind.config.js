module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontSize: {
				none: '0rem',
				xs: '0.75rem',
				sm: '0.875rem',
				base: '1rem',
				lg: '1.125rem',
				xl: '1.25rem',
				'2xl': '1.5rem',
				'3xl': '1.875rem',
				'4xl': '2.25rem',
				'5xl': '3rem',
				'6xl': '3.75rem',
				'7xl': '4.5rem',
				'8xl': '6rem',
				'9xl': '8rem',
			},
			colors: {
				orange: '#BC8034',
				lightGrey: '#C9C9C9',
				brown: '#583420',
				lightBrown: '#765948',
				bladeBrown: '#4D3F38',
				darkBrown: '#392525',
				swamp: '#274747',
				beige: '#F1E5D5',
			},
			fontFamily: {
				bubblegum: "'Bubblegum Sans', cursive",
				Merriweather: "'Merriweather', serif",
				inter: "'Inter', sans-serif",
			},
			gridTemplateColumns: {
				'auto-fit-140': 'repeat(auto-fit, 140px)',
				'auto-fill-220': 'repeat(auto-fill, minmax(220px, 1fr))',
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
};
