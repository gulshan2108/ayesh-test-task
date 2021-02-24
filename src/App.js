import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import UserList from './Components/User/UserList';  
import UserForm from './Components/User/UserForm';  

import './App.css';

function App() {
	return (
	<Router>
		<Switch>
			<Route path="/" component={UserList} exact/>
			<Route path="/user/form" component={UserForm} exact/>
			<Route path="/user/form/:id" component={UserForm} exact/>
		</Switch>
	</Router>
	);
}

export default App;
