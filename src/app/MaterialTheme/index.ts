import { createTheme } from '@mui/material/styles';
import { common } from '@mui/material/colors';
import shadow from './shadow';
import typography from './typography';
import { maxWidth } from '@mui/system';

/**
 * LIGHT THEME (DEFAULT)
 */
const light = {
	palette: {
		type: 'light',
		background: {
			default: '#f8f8ff',
			paper: common.white,
		},
		primary: { // loyiha asosiy(birlamchi) button ranglari
			contrastText: '#d7b586',  // button text rangi
			main: '#343434', // button rangi
		},
		secondary: { // yordamchi buttonlar
			contrastText: '#343434', 
			main: '#d7b586',
		},
		text: {
			primary: '#343434',
			secondary: '#d7b586',
			dark: common.black,
		},
	},
	components: {
		MuiContainer: {
			styleOverrides: {
				root: {
					height: '100%',
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				html: { height: '100%' },
				body: { background: '#f4f6f8', height: '100%', minHeight: '100%' },
			},
		},
	},
	shadow,
	typography,
};

// A custom theme for this app
let theme = createTheme(light);
theme = createTheme(theme, {
	components: { // container ucn milimalistic qonuniyat
		MuiContainer: {
			styleOverrides: {
				maxWidthLg: {
					[theme.breakpoints.up('lg')]: {
		// loyihamz eng kchkina(1300) montor, dsplayda to'g'ri ochilsa harqandayida to'g'ri ochiladi
						maxWidth: '1300px',
					},
				},
			},
		},
	},
});

export default theme;
