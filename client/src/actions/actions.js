import axios from "axios";
import uuid from "uuid";
import { ALL_ROOMS, ERROR, SEL_ROOM, ROOM_MSGS, API_URL, API_URL_POST, USER_ID } from "../constants/constants";

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
				dispatch({
					type: ALL_ROOMS,
					payload: {allRooms: null, err: "Server error occured..."}
				});
			});
		}
};

export function selectRoom(currentRoom){

	return function(dispatch){

		let messages = [];
			axios.get(`http://localhost:6060/api/${currentRoom.id}/messages`).then( responseObj => {

				messages = responseObj.data;

				dispatch({
					type: ROOM_MSGS,
					payload: { selectedRoom: currentRoom, roomMessages: messages, err: null }
				});

			}, err => {
				dispatch({
					type: ROOM_MSGS,
					payload: { selectedRoom: currentRoom, roomMessages: messages, err: "Server error occured..." }
				});
			});
	}
};

export function addMessage(currentRoom, msgText){

	return function(dispatch){

		if(!msgText)
		{
			dispatch({
				type: ERROR,
				payload: { text: "Enter message text!" }
			});
			return;
		}

		axios.post(API_URL_POST, {
			text: msgText,
			userId: USER_ID,
			messageId: uuid.v4(),
			roomId: currentRoom.id 
			}).then( responseObj => {
				dispatch(selectRoom(currentRoom));

				dispatch({
					type: ERROR,
					payload: null
				});
			}, err => {
				dispatch({
					type: ERROR,
					payload: { text: "Server error occured..." }
				});
			});
	}
};

