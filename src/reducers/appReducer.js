const initialState = {
    channelId: null,
    channelName: null,
    toggle: false
}

const appReducer = (state=initialState, action) =>{
    switch(action.type){
        case 'setActiveChannel':
            return {...state,channelId: action.payload.channelId, channelName: action.payload.channelName}
        case 'resetChannel':
            return {...state, channelId: null, channelName: null}
        case 'menuToggle':
            return {...state, toggle: !state.toggle}
        default: 
            return state
    }
}

export default appReducer;