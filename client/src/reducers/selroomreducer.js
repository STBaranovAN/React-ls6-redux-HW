import { SEL_ROOM, ERROR } from "../constants/constants";

export default function(state = null, action){
	console.log("From reducer", action);
	switch (action.type){
		case SEL_ROOM:
		return {
			err: null
		}
		case ERROR:
		return {
			err: action.payload
		}
	}
	return state
}