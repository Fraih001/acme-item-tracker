import React from 'react';
import { connect } from 'react-redux';

const Home = ({ users, things })=> {

const highRank = things.slice(-1)
let secondHighRank = things.slice(-2)
secondHighRank = secondHighRank.slice(0, -1);

//if a name is associated w/ a thing (include repeat names), push it into an array
const names = [];
{ things.map(thing => {
  users.map(user => {
    if (thing.userId === user.id) {
      names.push(user.name)
    }
  })
})
};

//map over array, counting each instance of a name and adding the count to an object
const counts = {};

names.forEach((name)=>{
  counts[name] = counts[name] ? (counts[name] += 1) : 1;
})

//sort the object by the values in each key:value pair
const sortable = Object.fromEntries(
    Object.entries(counts).sort(([,a],[,b]) => b-a));

//the first key in sorted object is the user with the most things
console.log(Object.keys(sortable)[0]);
    
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

        <div>
        <br></br>

          The user with the most THINGS is: { Object.keys(sortable)[0] }
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
