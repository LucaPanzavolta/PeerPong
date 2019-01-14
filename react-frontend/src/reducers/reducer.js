const initialState = {
  socket: null,
  room: null,
}

const reducer = (state = initialState, action) => {
  console.log('state', state);
  console.log('action', action);
  switch (action.type) {
    case 'SOCKET':
      return { ...state, socket: action.socket }
    case 'ROOM':
      return { ...state, room: action.room }
    default:
      return state;
  }
}

export default reducer;