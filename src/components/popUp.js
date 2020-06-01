import React from "react";
import { Button, Card, Row, Col, Input, CardPanel } from 'react-materialize';
import { history } from "../history"

export default class PopUp extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <div>
                <div id="alert" className="modal smallModal">
                    <div className="modal-header red">
                        Alert
                    </div>
                    <div className="modal-content center">
                        <div dangerouslySetInnerHTML={{ __html: (history.location.state ? history.location.state.alertMsg : "") }} />
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => $('.modal').modal('close')} className="modal-action modal-close waves-effect waves-green btn-flat">Close</button>
                    </div>
                </div>
                <div id="success" className="modal smallModal">
                    <div className="modal-header green">
                        Success
                    </div>
                    <div className="modal-content center">
                        <b>{
                            history.location.state ? history.location.state.msg : null
                        }</b>
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => $('.modal').modal('close')} className="modal-action modal-close waves-effect waves-green btn-flat">Close</button>
                    </div>
                </div>
            </div>
        );
    }
}