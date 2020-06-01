import React from "react";
import { Link } from 'react-router-dom'
import { history } from '../history'
import userpng from '../images/user.png';
import officepng from "../images/office.jpg"
let moduleMapping={
	"dashboard": {
		"label":"Dashboard",
		"path":"/",
		"subModules":[
			 {
				"read": true,
				"label":"Frequent",
				"name":"frequent",
				"path":"/dashboard/frequent"
			 },
			 {
				"read": true,
				"label":"All",
				"name":"all",
				"path":"/dashboard/all"
			 },
			 {
				"read": true,
				"label":"Inventory",
				"name":"inventory",
				"path":"/dashboard/inventory"
		   },
		]
	},

	"inward": {
		"read": true,
		"label":"Inward",
		"path":"/inwarding",
		"isSubModule":true,
		"subModules":[
			 {
				"read": true,
				"label":"All Grn",
				"name":"allGrn",
				"path":"/inwarding"
			 },
			 {
				"read": true,
				"label":"Create Good Receipt",
				"name":"createGoodReceiptNote",
				"path":"/inwarding"
			 },
			 {
				"read": true,
				"label":"Inscan SKU",
				"name":"inscanSku",
				"path":"/inwarding/inscan"
		   }
		]
	},
	"users": {
		"read": true,
		"label":"Users",
		"path":"/users",
		"isSubModule":false,
	},
	"roles": {
		"read": true,
		"label":"Roles",
		"path":"/user-roles",
		"isSubModule":false,
	},
	"sku": {
		"read": true,
		"label":"SKU",
		"path":"/sku",
		"isSubModule":false,
	}
}

let IconMapping={
	dashboard:<i className="fa fa-tachometer"></i>,
	inward:<i className="fa fa-university"></i>,
	dispatch:<i class="fa fa-truck" aria-hidden="true"></i>,
	users:<i className="fa fa-users"></i>,
	roles:<i class="fa fa-key" aria-hidden="true"></i>,
	sku:<i className="fa fa-puzzle-piece" aria-hidden="true"></i>
}
export default class Header extends React.Component {
	constructor(props) {
		super(props)
		if (this.props.user.token === undefined) {
			history.replace("/login")
		}
		this.state = {
						moduleMapping:moduleMapping,
						permissions:{}
		}
		this.generatePermission=this.generatePermission.bind(this)
	}

	componentDidMount() {
		let options={}
		var elems = document.querySelectorAll('.sidenav');
		M.Sidenav.init(elems, options)
		
		if(this.props.permissions.permission){
			this.setState({permissions:this.props.permissions.permission},()=>{
				var elems1 = document.querySelectorAll('.collapsible');
	          	M.Collapsible.init(elems1, options);
			})
		}
	}

	generatePermission(){
		 let moduleMapping=this.state.moduleMapping
		 let permissions=this.state.permissions;
	}
	openSideNav(){
		let elem=document.getElementById("slide-out");
		var instance = M.Sidenav.getInstance(elem);
		instance.open()
	}
	render() {
		
		let {moduleMapping,permissions}=this.state
		console.log("permmmmm",permissions)
		return (
			<header>
			  <nav>
				<div className="nav-wrapper">
				<a href="#!" onClick={this.openSideNav} data-target="slide-out"  className="brand-logo" style={{paddingTop:0,background:"#003367",height:'inherit'}}><img className="logo-background" src="/images/logo.png" /></a>
				<ul className="right hide-on-med-and-down">
				<a className="grey-text right" href="/logout"><span className="fa fa-sign-out" ></span></a>
				<li className="grey-text right">{this.props.user.firstName + " " + this.props.user.lastName }</li> 

				</ul>
				</div>
			</nav>
		
				<ul id="slide-out" className="sidenav customSideNav">
				<li><div className="user-view">
					<div className="background">
					<img src={officepng} />
					</div>
					<a href="javascript:void()"><img className="circle" src={userpng} /></a>
					<a href="javascript:void()"><span className="white-text name">{this.props.user.firstName + " " + this.props.user.lastName }</span></a>
					<a href="javascript:void()"><span className="white-text email">{this.props.user.email}</span></a>
				
				</div></li>
				<li>

			{
				Object.keys(permissions).map(key=>{
					if(typeof(permissions[key])=="object" && permissions[key].read && permissions[key].subModules){
						return <ul key={key} className="collapsible" >
						<li>
						<div className="collapsible-header" style={{textTransform:"capitalize"}}><a href="javascript:void()">{IconMapping[key]}{key} <i className="fa fa-caret-down" aria-hidden="true"></i></a></div>
						<div className="collapsible-body">
						{Object.keys(permissions[key].subModules).map((item,index)=>{
							if(typeof(permissions[key].subModules[item])=="object" && permissions[key].subModules[item].read ) 
							 {return  <li key={index}><Link to={"/"+key+"/"+item} style={{textTransform:"capitalize"}}>{item}</Link></li>}
						})}
						</div>
						</li>
					</ul>
					}
					else if(typeof(permissions[key])=="object" && permissions[key].read && !permissions[key].subModules){
						return <Link to={"/"+key} style={{textTransform:"capitalize"}}>{key}</Link>
					} 
				})
			}		
					</li>
					<React.Fragment>
					<li><Link to="/users">{IconMapping.users} Users</Link></li>
					<li><Link to="/user-roles">{IconMapping.roles} Manage Permissions</Link></li>
					<li><Link to="/sku">{IconMapping.sku} Sku</Link></li>
					</React.Fragment>
				</ul>
	 
			</header>
		);
	}
}