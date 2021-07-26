import './App.css';
import React, {Component} from 'react';
import ConnectContact from './components/ConnectContact';
class App extends Component {
    render() {
			return (
				<div> 
					Welcome
					<ConnectContact />
				</div>
			);
		}
};

export default App;
