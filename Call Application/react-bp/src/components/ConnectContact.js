import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
import CallTimer from './CallTimer';
class ConnectContact extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: null,
            connectFrom: null,
            connectTo: null,
            duration: null,
            callConnected: false,
            errMessage: null,
        }
    }
    validate(connectFrom , connectTo, duration){
        if(_.isNull(connectFrom) || _.isNull(connectTo) || _.isNull(duration)){
            this.setState({'errMessage': "Above(* marked) fields are required!"});
            return false;
        }
        return true;
    }
    async handleConnect(){
        const {name, connectFrom , connectTo, duration} =  this.state;
        if(this.validate(connectFrom, connectTo, duration)){
            this.setState({callConnected: true}); // should be called after call is picked up?
            let payload = {
                name,
                connectFrom,
                connectTo,
                duration
            };
            payload.duration = parseInt(duration)*60;
            console.log('payload---', payload);
            await axios.post('http://localhost:3001/connectCall', payload)
                .then((response) => {
                    console.log('response---', response);
                })
                .catch((err)=> {
                    console.log('err---', err);
                });
        }
    }
    handleInputChange(e){
        // console.log(e);
        this.setState({[e.target.name]: e.target.value});
    }
    render(){
        return (
            <div className="ui container">
                {!this.state.callConnected &&
                <div className="ui form error dialForm">
                    <div className="inline field">
                        <label>Name</label>
                        <input className="ui input" type = "text" name="name" onChange={(e) => this.handleInputChange(e)} />
                    </div>
                    <div className="required inline field">
                        <label>Contact No</label>
                        <input className="ui input" type = "tel" name="connectFrom" onChange={(e) => this.handleInputChange(e)} />
                    </div>
                    <div className="required inline field">
                        <label>Connect To</label>
                        <input className="ui input" type = "tel" name="connectTo" onChange={(e) => this.handleInputChange(e)} />
                    </div>
                    <div className="required inline field">
                        <label>Duration(in min(s))</label>
                            <select name="duration" onChange={(e) => this.handleInputChange(e)}>
                                <option value="">Select a duration</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                    </div>
                    <button className="ui primary button large callBtn" onClick={() => this.handleConnect()}>
                        {this.state.callConnected && <i className="fa-2 fa-spinner"></i>}
                        {this.state.callConnected ? 'CONNECTING' : 'CONNECT'}
                    </button>
                    {this.state.errMessage &&
                    <div className="ui error message">
                        <p>{this.state.errMessage}</p>
                    </div>
                    }
                </div>
                }
                {this.state.callConnected &&
                    <CallTimer hourSeconds={this.state.duration} />
                }
            </div>
        );
    }
}
export default ConnectContact;