import logo from './logo.svg';
import './App.css';
import Login from './component/Login';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {  createTheme, ThemeProvider } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
const theme=createTheme({
  palette:{
    primary:{
      main:'#84cdf8'
    },
    secondary:purple

  }
})
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Router>
      <Routes>
          <Route exact path='/login' element= { <Login/>}></Route>
      </Routes>
      </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
