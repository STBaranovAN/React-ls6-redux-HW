import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRooms, selectRoom } from "./actions/actions";
import Room from "./item";
import Messages from "./messages";
import PostMsg from "./postmsg";

class Rooms extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			allRooms: []
		}
	}

	componentDidMount(){
		this.props.getRooms();
	}
	
	render() {
		// let error = this.state.err || false;
		let allRooms = this.props.chatRooms || [];
		// let currentRoom = this.state.currentRoom || {};

		// if(error)		
		// {
		// 	return (<div className="rooms">
		// 				<h2>Server error occured...</h2>
		// 			</div>
		// 	)
		// }
		
		if(allRooms.length == 0) {
			return (<div className="rooms">
						<h2>No rooms...</h2>
					</div>
			)
		}

		return (
			<div className="rooms">
						<ul>
							{allRooms.map((item, index) => {
								return <Room
										key={index} name={item.name} 
										onClick={() => { 
											this.props.selectRoom(item);
										}}
									/>
							})
						}
						</ul>	
			</div>
		)
	}
}

function mapStateToProps(state){
	return {chatRooms: state.allRooms}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({getRooms: getRooms, selectRoom: selectRoom}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);

		