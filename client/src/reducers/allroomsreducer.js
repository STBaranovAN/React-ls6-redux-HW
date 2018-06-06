export default function(state = null, action){
	switch (action.type){
		case "ALL_ROOMS":
		return action.payload
	}
	return state
}