import axios from "axios";

export function getRooms(){

	return function(dispatch){
		let rooms = [];
			axios.get("http://localhost:6060/api").then( responseObj => {
					if(responseObj.hasOwnProperty("data"))
					{
						rooms = responseObj.data.chats;
						if(rooms.length >= 0)
						{
							dispatch({
								type: "ALL_ROOMS",
								payload: rooms
							});
						}
					}

					// rooms = responseObj.data.chats;

					// dispatch({
					// 	type: "ALL_ROOMS",
					// 	payload: rooms
					// });
			});
		}
};

export function selectRoom(currentRoom){

	if(!currentRoom)
		return;

	return function(dispatch){
		let messages = [];
			axios.get(`http://localhost:6060/api/${currentRoom.id}/messages`).then( responseObj => {

				// if(responseObj.hasOwnProperty("data"))
				// {
				// 	messages = responseObj.data;
				// 	if(messages.length >= 0)
				// 	{
				// 		dispatch({
				// 			type: "ROOM_MSGS",
				// 			payload: messages
				// 		});
				// 	}
				// }

				messages = responseObj.data;

				dispatch({
					type: "ROOM_MSGS",
					payload: messages
				});
			});

			dispatch({
				type: "SEL_ROOM",
				payload: currentRoom
			});
	}
};

