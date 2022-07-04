import React from 'react';
import { connect } from 'react-redux';
import { CREATE_THING } from './store';
import axios from 'axios';
import { faker } from '@faker-js/faker'

const ThingForm = ({ createThing })=> {
  return (
    <div>
      <button onClick={ createThing }>Create Thing</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch)=> {
  return {
    createThing: async()=> {
      const response = await axios.post('/api/things', { name: faker.commerce.product()});
      const thing = response.data;
      console.log(thing)
      dispatch({ type: CREATE_THING, payload: thing });
    }
  };
}

export default connect(null, mapDispatchToProps)(ThingForm);
