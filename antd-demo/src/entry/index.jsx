import '../common/lib';
import { render } from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory, browserHistory, Link ,IndexRoute, NotFoundRoute} from 'react-router';

import App from '../component/App';
import About from '../component/About';
import AboutMe from '../component/AboutMe';
import List from '../component/List';
import Detail from '../component/Detail';

// 用户管理
import UserList from '../component/user/UserList';
import AddUser from '../component/user/AddUser';
import Auth from '../component/user/Auth';
import Login from '../component/user/Login';
//机场
import AirportList from '../component/airport/AirportList';
import EditAirportForm from '../component/airport/EditAirportForm';
//飞机
import AircraftList from '../component/airport/AircraftList';
import EditAircraft from '../component/airport/EditAircraft';
//航线配置
import RouteList from '../component/airport/RouteList';
//航班配置
import FlightList from '../component/airport/FlightList';

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<Route path="list" component={List} />
			<Route path="/detail/:ttid" component={Detail} />
			<Route path="about" component={About} />
	      	<Route path="me" component={AboutMe} />
		</Route>
		<Route path="/user" component={UserList} />
		<Route path="/auth" component={Auth} />
		<Route path="/login" component={Login} />
		<Route path="/add" component={AddUser} />
		<Route path="/airport/edit/:ttid" component={EditAirportForm} />
		<Route path="/airport/list" component={AirportList} />
		<Route path="/airport/aircraft" component={AircraftList} />
		<Route path="/airport/route" component={RouteList} />
		<Route path="/airport/flight" component={FlightList} />
	</Router>
	),
	document.getElementById('root'));

//ReactDOM.render(<App />, document.getElementById('react-content'));
