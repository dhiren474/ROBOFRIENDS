import React,{Component} from 'react';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends Component{
	constructor(){
		super()
		this.state ={
			robots: [],
			Searchfield:''
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=>response.json())
		.then(user=>this.setState({robots:user}))
		
	}

	onSearchChange=(event)=>{
		this.setState({Searchfield: event.target.value})	
	}

	render(){
		const{robots,Searchfield}=this.state
		const filteredRobots = robots.filter(robot=>{
			return robot.name.toLowerCase().includes(Searchfield.toLowerCase())

		})
		return !robots.length? <h1 className='tc'>Loading</h1>:
				(
					<div className='tc'>
						<h1 className='f1'>RoboFriends</h1>
						<SearchBox searchChange={this.onSearchChange}/>
						<Scroll>
							<ErrorBoundry>
								<Cardlist robots={filteredRobots}/>
							</ErrorBoundry>
						</Scroll>

					</div>
				);
	
		


	
	}
}

export default App;