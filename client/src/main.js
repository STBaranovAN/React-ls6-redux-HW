import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Rooms from "./rooms";
import Messages from "./messages";
import PostMsg from "./postmsg";

const mainContainer = {
	width: "50%",
	height: "90%",
	margin: 10
};

  export default class Main extends React.Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<div style={ mainContainer }>
				<Grid container spacing={24}>
					<Grid item xs={12} sm={6}>
						<Paper elevation={4}>
							<Rooms/>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Messages/>
						<br/>
						<PostMsg/>
					</Grid>
				</Grid>
			</div>
		)
	}
}



		