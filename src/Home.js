import React from 'react';
import { connect } from 'react-redux';

const Home = ({ users, things })=> {

const highRank = things.slice(-1)
let secondHighRank = things.slice(-2)
secondHighRank = secondHighRank.slice(0, -1);

return (
    <div id='home-main'>
      <h1>Home</h1>
      <div>
        Here at the Acme Item Tracker Corp we have { users.length } users and { things.length } things!
        <br></br>
        <br></br>
        <br></br>
        <div id='highRank'>
        The highest ranked THING is: { highRank.map(thing=>{
          return(
            thing.name.toUpperCase()
          )
        })}
        </div>
        <br></br>

        The second highest ranked THING is: { secondHighRank.map(thing=>{
          return(
            thing.name.toUpperCase()
          )
        })}
      </div>
    </div>
  );
};

const mapSToP = (s)=> {
  return {
    users: s.users,
    things: s.things
  };
};

export default connect(mapSToP)(Home);
