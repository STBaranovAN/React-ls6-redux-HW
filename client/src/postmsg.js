import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addMessage } from "./actions/actions";
//import {Component} from "react";

// const error = {
// 	color: crimson
// };

const postMsgContainer = {
	padding: 10
};

class PostMsg extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			text: ""
		}

		this.getText = this.getText.bind(this);
		// this.postNewMessage = this.postNewMessage.bind(this);
	}

	getText(e){
		this.setState({text: e.target.value});
	}

	// postNewMessage(e){

	// 	let msgText = this.state.msgText;
	// 	if(!msgText)
	// 	{
	// 		// alert("Enter message text!");
	// 		// this.setState({err: true});
	// 		return;
	// 	}

	// 	let currentRoom = this.props.currentRoom;

	// 	axios.post(confObj.api_url_post, {
	// 		text: msgText,
	// 		userId: confObj.userId,
	// 		messageId: uuid.v4(),
	// 		roomId: currentRoom.id 
	// 		}).then( responseObj => {
	// 			this.props.selectRoom(currentRoom)
	// 			// this.setState({
	// 			// 	msgText: "",
	// 			// 	err: false
	// 			// }); 
	// 		}, err => {
	// 		// this.setState({err: true}, () => {
	// 		// 	console.log(err);
	// 		// 	this.setState({
	// 		// 		err: true
	// 		// 	}); 
	// 		// })
	// 	});
	// }

	render() {

		let err = this.props.err;

		return (
			<Paper elevation={4} style={postMsgContainer}>
				<Grid container spacing={16}>
					<Grid item xs={12}>
						<Typography variant="headline" component="p" display={ err ? "block" : "none" }>
							{err}
        				</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							multiline
							value={this.state.text || ''}
							onChange={this.getText}
							label="Enter your message"
						>
						</TextField>
					</Grid>
					<Grid item xs={12}>
						<Button variant="outlined" onClick={ () => { this.props.addMessage(this.props.currentRoom, this.state.text) } }>
							New message
      					</Button>
					</Grid>
				</Grid>
			</Paper>
		)
	}
}

function mapStateToProps(state){
	return {currentRoom: state.postmsg.selectedRoom || null, err: state.postmsg.err}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({addMessage: addMessage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostMsg);