import {combineReducers} from 'redux';

import auth from './auth';
import movie from './movie';
import schedule from './schedule';
import booking from './booking';

export default combineReducers({
  auth,
  movie,
  schedule,
  booking,
});
