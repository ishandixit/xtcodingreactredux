import React from "react"
import { connect } from "react-redux";
import { LogOutUser } from "../actions/userActions"
import { history } from "../history"
import { withRouter } from 'react-router-dom'

class Logout extends React.Component {
    constructor(props) {
        super(props)
        this.props.LogOutUser()
        history.push('/login')
    }
    render() {
        return (
            <div>Logout</div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        LogOutUser: () => {
            dispatch(LogOutUser())
        }
    }
}
export default withRouter(connect(null, mapDispatchToProps)(Logout))