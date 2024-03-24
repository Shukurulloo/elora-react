// birinchi loyihamz shuyerdan boshlanadi
import React from 'react';
import ReactDOM from 'react-dom'; // bu package vertual va real domlarni integratsiyasini qiladi
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline'; // standart integratsiya
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './css/index.css';

ReactDOM.render(  // ReactDOM olib ustida renderni amalga oshirib ichiga 1-ument react srcni joylaymiz
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}> 
    <CssBaseline />
    <App />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>,
/** vertdomga realdomni instansi yani documentni functsiyasini root qismi 2-argumnet qlb pass qilamz*/
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
