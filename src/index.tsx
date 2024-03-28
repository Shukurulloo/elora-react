// birinchi loyihamz shuyerdan boshlanadi
import React from 'react';
import { createRoot } from 'react-dom/client'; // bu package vertual va real domlarni integratsiyasini qiladi
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline'; // standart integratsiya
import { ThemeProvider } from '@mui/material/styles';
import theme from './app/MaterialTheme';
import { BrowserRouter as Router} from "react-router-dom"; // rooting tizimini shu package . BrowserRouterni Routerga o'zgartiramz
import './css/index.css';

const container = document.getElementById("root")!; // "!" non-null belgisi
const root = createRoot(container);

root.render(//(vertualdom) ReactDOM olib ustida renderni amalga oshirib ichiga 1-argument react(vertualdom) srcni joylaymiz
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}> 
        <CssBaseline />
          <Router>
             <App />
          </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
