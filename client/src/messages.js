import React from "react";
import { connect } from "react-redux";

class Messages extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			currentRoomName: null,
			roomMessages: []
		}
	}

	/* componentDidMount(){
		if(this.props.selectedRoom) {
			this.setState({currentRoomId: nextProps.selectedRoom.id});
		}
	} */

	// componentWillReceiveProps(nextProps){
	// 	if(nextProps.selectedRoom)
	// 	{
	// 		this.setState({currentRoomName: nextProps.selectedRoom.name});
	// 		this.getRoomMessages(nextProps.selectedRoom.id);
	// 	}
	// }
	
	/* shouldComponentUpdate(nextProps, nextState){
		return false;
	} */

	render() {

		// let error = this.state.err || false;
		// let roomName = this.state.currentRoomName || "Choose a room";
		let roomMessages = this.props.roomMessages || [];

		// if(error) {
		// 	return (<div className="messages">
		// 				<h2>Server error occured...</h2>
		// 			</div>
		// 	)
		// }
		
		if(roomMessages.length == 0) {
			return (<div className="messages">
						<h2>No messages in room...</h2>
					</div>
			)
		}

		return (
			<div className="messages">
				{/* <h2>{roomName}</h2> */}
				<div className="text-right">
					{roomMessages.map((item, index) => {
						return <p key={index}>{item.text}</p>
					})}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {roomMessages: state.roomMessages}
}

export default connect(mapStateToProps)(Messages);

		