import { combineReducers } from 'redux';
import auth from './auth';
import modelOps from "./modelOps";

export default combineReducers({
  auth,
  modelOps
});
