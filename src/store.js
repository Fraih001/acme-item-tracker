import { createStore } from 'redux';

const initialState = {
  view: window.location.hash.slice(1),
  users: [],
  things: []
};

const SET_THINGS = 'SET_THINGS';
const SET_USERS = 'SET_USERS';
const SET_VIEW = 'SET_VIEW';
const CREATE_THING = 'CREATE_THING';
const DELETE_THING = 'DELETE_THING';
const CREATE_USER = 'CREATE_USER';
const DELETE_USER = 'DELETE_USER';
const INCREASE_THINGRANK = 'INCREASE_THINGRANK';
const DECREASE_THINGRANK = 'DECREASE_THINGRANK';
const EDIT_OWNER = 'EDIT_OWNER';

const store = createStore((state = initialState, action)=> { 
  if(action.type === SET_THINGS){
    return {...state, things: action.things };
  }
  if(action.type === SET_USERS){
    return {...state, users: action.users }; 
  }
  if(action.type === SET_VIEW){
    return {...state, view: action.view }; 
  }
  if(action.type === CREATE_THING){
    const sortedThings = [...state.things, action.payload].sort((a,b)=> a.ranking - b.ranking);
    return {...state, things: [...sortedThings] }; 
  }
  if(action.type === DELETE_THING){
    return {...state, 
      things: state.things.filter((_thing) => _thing.id !== action.thingId)
    }
  }
  if(action.type === CREATE_USER){
    return {...state, users: [...state.users, action.user ]}
  }
  if(action.type === DELETE_USER){
    return {...state,
    users: state.users.filter((user_) => user_.id !== action.userId)}
  }
  if(action.type === INCREASE_THINGRANK){
    const things = state.things.filter(_thing => action.payload.id !== _thing.id);
    const sortedThings = [...things, action.payload].sort((a,b)=> a.ranking - b.ranking);
    return {
      ...state, things: [...sortedThings]
    }
    }
  if (action.type === DECREASE_THINGRANK){
    const things = state.things.filter(_thing => action.payload.id !== _thing.id);
    const sortedThings = [...things, action.payload].sort((a,b)=> a.ranking - b.ranking);
    return {
      ...state, things: [...sortedThings]
    }
  }
  if (action.type === EDIT_OWNER){
    const things = state.things.filter(_thing => action.payload.id !== _thing.id);
    const sortedThings = [...things, action.payload].sort((a,b)=> a.ranking - b.ranking);
    return {
      ...state, things: [...sortedThings]
    }
  }

  return state;
});

export default store;
export { CREATE_THING, DELETE_THING, CREATE_USER, DELETE_USER, INCREASE_THINGRANK, DECREASE_THINGRANK, EDIT_OWNER, SET_THINGS, SET_USERS, SET_VIEW };

