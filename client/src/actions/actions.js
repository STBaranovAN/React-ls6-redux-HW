import axios from "axios";
import uuid from "uuid";
import { ALL_ROOMS, ROOM_MSGS, POST_MSG, API_URL, API_URL_POST, USER_ID, server_error_msg, emty_text_error_msg } from "../constants/constants";

export function getRooms(){

	return function(dispatch){
		let rooms = [];
			axios.get(API_URL).then( responseObj => {
					if(responseObj.hasOwnProperty("data"))
					{
						rooms = responseObj.data.chats;
						if(rooms.length >= 0)
						{
							dispatch({
								type: ALL_ROOMS,
								payload: {allRooms: rooms, err: null}
							});
						}
					}
			}, err => {
				console.log(`An error occured: ${err}`);
				dispatch({
					type: ALL_ROOMS,
					payload: {allRooms: null, err: server_error_msg}
				});
			});
		}
};

export function selectRoom(currentRoom){

	return function(dispatch){

		dispatch({
			type: POST_MSG,
			payload: null
		});

		let messages = [];
			axios.get(`http://localhost:6060/api/${currentRoom.id}/messages`).then( responseObj => {

				messages = responseObj.data;

				dispatch({
					type: ROOM_MSGS,
					payload: { selectedRoom: currentRoom, roomMessages: messages, err: null }
				});
			}, err => {
				console.log(`An error occured: ${err}`);
				dispatch({
					type: ROOM_MSGS,
					payload: { selectedRoom: currentRoom, roomMessages: messages, err: server_error_msg }
				});
			});
	}
};

export function addMessage(currentRoom, msgText){

	return function(dispatch){

		if(!msgText)
		{
			dispatch({
				type: POST_MSG,
				payload: emty_text_error_msg
			});
			return;
		} else {
			dispatch({
				type: POST_MSG,
				payload: null
			});
		}

		axios.post(API_URL_POST, {
			text: msgText,
			userId: USER_ID,
			messageId: uuid.v4(),
			roomId: currentRoom.id 
			}).then( responseObj => {
				dispatch(selectRoom(currentRoom));
			}, err => {
				console.log(`An error occured: ${err}`);
				dispatch({
					type: POST_MSG,
					payload: server_error_msg
				});
			});
	}
};

