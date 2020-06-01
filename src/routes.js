import React from "react"
import { Switch, Route, withRouter } from 'react-router-dom'
import { Toast, Preloader,Col } from 'react-materialize'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'
import { history } from './history'
import PopUp from './components/popUp'
import Header from "./includes/header"
import { ChangeUserRole } from "./actions/userActions";
import { enableLimitedAccess } from "./components/limitedAccess";

const LoadingPage = ({ isLoading, error }) => {
	if (isLoading) {
		return <div>Loading...</div>;
	}
	else if (error) {
		return <div>Sorry, there was a problem loading the page.</div>;
	}
	else {
		return null;
	}
};
const NotFound = Loadable({
	loader: () => import('./containers/404'),
	loading: LoadingPage,
	delay: 0
});

const Login = Loadable({
	loader: () => import('./containers/component1'),
	loading: LoadingPage,
	delay: 0
})



class App extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidUpdate() {
		window.scrollTo(0, 0)
	}
	componentDidMount() {
		// $('#preloader').modal({ dismissible: false });
		let that = this
		// LogOut on Idle
		function idleTimer() {
			var t;
			window.onload = resetTimer;
			window.onmousemove = resetTimer;
			window.onmousedown = resetTimer;
			window.onclick = resetTimer;
			window.onscroll = resetTimer;
			window.onkeypress = resetTimer;
			function logout() {
				history.replace("/logout")
			}
			function resetTimer() {
				clearTimeout(t);
				t = setTimeout(logout, 30 * 60 * 1000);
			}
		}
		// idleTimer();

		setInterval(() => {
			if (!navigator.onLine) {
				M.toast({html: 'No Internet!!!'})

			}
		}, 2000)

		if (window.innerWidth < 1200) {
			alert("Please Use Laptop or Desktop")
			window.location = "/login"
		}

		if(this.props.user.token===undefined){

			history.replace("/login")
		}

		//right click disable on production
		if(process.env.NODE_ENV === 'production') {
			enableLimitedAccess();
		}

		var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {dismissible:false});
	}
	render() {
		return (
			<div>
				{
					this.props.user.token ?
						<Header {...this.props} />
						: null }
				<Switch>
					<Route path='/login' component={Login}/>

					<Route path='*' component={NotFound} />
				</Switch>

				<div id="preloader" className="modal modal1" style={{ minHeight: 300 }}>
                    <div className="modal-content">
                        <Col s={4}>
                            <Preloader flashing />
                        </Col>
                    </div>
                </div>
				<PopUp />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,

	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		ChangeUserRole: (obj) => {
			dispatch(ChangeUserRole(obj))
		}
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
