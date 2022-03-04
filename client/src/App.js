
import './App.css';
import Login from './component/Login';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import {  createTheme, ThemeProvider } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import CreateAccout from './component/CreateAccout';
import ManageUser from './component/ManageUser';
import CreateIncident from './component/CreateIncident';
import ManageIncident from './component/ManageIncident';
import AssignIncident from './component/AssignIncident';
import Activate_user from './component/Activate_user';
import UpdateUser from './component/UpdateUser';
import UpdateIncident from './component/UpdateIncident';
import Modal from './component/Modal';
import Logout from './component/Logout';
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
      <Route path='/manage_account' element={<ManageUser/>}></Route>
      <Route path='/create_Incident' element={<CreateIncident/>}></Route>
      <Route path='/manage_incident' element={<ManageIncident/>}></Route>
      <Route path='/assign_incident' element={<AssignIncident/>}></Route>
      <Route path='/activate_user' element={<Activate_user/>}></Route>
      <Route path='/update_user/:id' element={<UpdateUser/>}></Route>
      <Route path='/update_incident/:id' element={<UpdateIncident/>}></Route>
      <Route path='/modal' element={<Modal/>}></Route>
      <Route path='/logout' element={<Logout/>}></Route>
     
      </Routes>
      </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
