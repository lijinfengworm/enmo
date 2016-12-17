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
import EditRoute from '../component/airport/EditRoute';
//航班配置
import FlightList from '../component/airport/FlightList';
//城市配置
import CityList from '../component/airport/CityList';
import EditCity from '../component/airport/EditCity';
//传感器配置
import SensorList from '../component/engine/SensorList';
import EditSensor from '../component/engine/EditSensor';
//传感器组配置
import SensorGroupList from '../component/engine/SensorGroupList';
import EditSensorGroup from '../component/engine/EditSensorGroup';
render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<Route path="list" component={AirportList} />
			
			<Route path="city" component={CityList} />
			<Route path="city_edit/:ttid" component={EditCity} />

			<Route path="aircraft" component={AircraftList} />
			<Route path="aircraft_edit/:ttid" component={EditAircraft} />

			<Route path="route" component={RouteList} />
			<Route path="route_edit/:ttid" component={EditRoute} />
			
			<Route path="sensor" component={SensorList} />
			<Route path="sensor_edit/:ttid" component={EditSensor} />

			<Route path="sensorgroup" component={SensorGroupList} />
			<Route path="sensorgroup_edit/:ttid" component={EditSensorGroup} />


			<Route path="user" component={UserList} />
			<Route path="auth" component={Auth} />
		</Route>
		<Route path="*" component={App} />
	</Router>
	),
	document.getElementById('root'));

//ReactDOM.render(<App />, document.getElementById('react-content'));
