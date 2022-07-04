import React from 'react';
import ThingForm from './ThingForm';
import axios from 'axios';
import { connect } from 'react-redux';
import { DELETE_THING, DECREASE_THINGRANK, INCREASE_THINGRANK, EDIT_OWNER } from './store'

const Things = ({ things, users, deleteThing, increaseRank, decreaseRank, editOwner })=> {
  return (
    <div id='things-main'>
    <div id='thing-header'>
      <h1>Things</h1>
      <ThingForm />
      </div>
      <ul >
        {
          things.map( thing => {
           

            return (
             
                <li key={ thing.id }>
                <div id='name-ranking'>
                <div id='thing-name'>
                  { thing.name.toUpperCase() } <button onClick={()=> deleteThing(thing.id) }>X</button>
                  </div>
                  <div id='ranking'>
                  RANKING: { thing.ranking }  
                  </div>
                  </div>

                        <div>
                            <div>
                              <select onChange={ (e)=>{editOwner(e.target.value, thing.id)}}> 
                                <option>Select an Owner</option>
                                <option value={ null }>No Owner</option>
                                  {users.map((user)=> (
                                    <option type="reset" value={ user.id }>{user.name}</option>
                                    ))} 
                              </select>
                            </div>

                          <div id='owner-ranks'>

                            <div>
                                Owner: { users.filter(user => user.id === thing.userId).map(user => {
                                  return (
                                  user.name
                                  )
                                })
                                }
                            </div>

                          
                      
                            <div id='rank-buttons'>
                              <button onClick = { ()=> increaseRank(thing) }>+</button> <button onClick = { ()=> decreaseRank(thing) }>-</button>
                            </div>

                          </div>
                        </div>
                      </li>

                      )}) 
                    } 
              </ul>
          </div>
          )
        }

const mapDispatchToProps = ( dispatch ) => {

  return {
    increaseRank: async(thing)=>{
    const update = await axios.put(`/api/things/${thing.id}`, {
        ranking: thing.ranking + 1
      });
      dispatch({type: INCREASE_THINGRANK, payload: update.data });
    },
    decreaseRank: async(thing)=>{
    const update = await axios.put(`/api/things/${thing.id}`, {
        ranking: thing.ranking - 1
      });
      dispatch({type: DECREASE_THINGRANK, payload: update.data });
    },
    deleteThing: async(thingId)=>{
      await axios.delete(`/api/things/${thingId}`);
      dispatch({type: DELETE_THING, thingId });
    },
    editOwner: async(userId, thingId)=>{
      userId = userId * 1
      const update = (await axios.put(`/api/things/${thingId}`, {
        userId: userId
      })).data;
      dispatch({type: EDIT_OWNER, payload: update });
    }
  }
}

export default connect(
  (state)=> {
    return {
      users: state.users,
      things: state.things
    }
  }, mapDispatchToProps
)(Things);
