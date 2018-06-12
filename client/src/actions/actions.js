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
								payload: rooms
							});

							dispatch({
								type: ERROR,
								payload: null
							});
						}
					}
			}, err => {
				dispatch({
					type: ERROR,
					payload: { where: "getRooms", text: "Server error occured..." }
				});
			});
		}
};

export function selectRoom(currentRoom){

	return function(dispatch){

		dispatch({
			type: SEL_ROOM,
			payload: currentRoom
		});

		let messages = [];
			axios.get(`http://localhost:6060/api/${currentRoom.id}/messages`).then( responseObj => {

				messages = responseObj.data;

				dispatch({
					type: ROOM_MSGS,
					payload: messages
				});

				dispatch({
					type: ERROR,
					payload: null
				});

			}, err => {
				dispatch({
					type: ERROR,
					payload: { where: "selectRoom", text: "Server error occured..." }
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
				payload: { where: "addMessage", text: "Enter message text!" }
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
			}, err => {
				dispatch({
					type: ERROR,
					payload: { where: "addMessage", text: "Server error occured..." }
				});
			});
	}
};

