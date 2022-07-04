import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm';
import { DELETE_USER } from './store'


const Users = ({ users, things, deleteUser })=> {
  return (
    <div>
    <div id='user-header'>
      <h1>Users</h1>
      <UserForm />
      </div>
        <ul>
          {
            users.map( user => {
              return (
                <li key={ user.id }>
                  { user.name } <button onClick={ ()=> deleteUser(user.id) }>X</button>
                  <br></br>
                  <div id='own-things'>
                  OWNS: {things.map(thing => {
                    if (thing.userId === user.id) {
                      return (
                      <div id='owned-things' key={ thing.id }>
                        { thing.name } 
                        </div> 
                        )
                    }

                      })}
                   </div>
                </li>
              )})}
          </ul>
     </div>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: async(userId)=>{
      await axios.delete(`/api/users/${userId}`)
      dispatch({ type: DELETE_USER, userId })
    }
  }
}

const mapStateToProps = (state)=> {
  return {
    users: state.users,
    things: state.things
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Users);
