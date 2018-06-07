export default function(state = null, action){
	console.log("From reducer", action);
	switch (action.type){
		case "ERROR":
		return action.payload
	}
	return state
}