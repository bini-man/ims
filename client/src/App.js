
import './App.css';
import Login from './component/Login';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import {  createTheme, ThemeProvider } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import CreateAccout from './component/CreateAccout';
//import { Switch } from '@material-ui/core';
// import { Route, Switch } from "react-router";
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
      <Route  path='/create_account' element= { <CreateAccout/>}></Route>
      </Routes>
      </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
