import { combineReducers } from 'redux';
import genric from './genric/Reducer';
import login from './login/Reducer';
import files from './file/Reducer';
import { LoggerReducer } from './Logger/LoggerReducer';
import { ActiveItemReducer } from './ActiveItem/ActiveItemReducer';
import { TableColumnsFilterReducer } from './TableColumnsFilter/TableColumnsFilterReducer';
import { GlobalOrderFilterReducer } from './GlobalOrderFilter/GlobalOrderFilterReducer';

const rootReducer = combineReducers({
  genric,
  login,
  files,
  LoggerReducer,
  ActiveItemReducer,
  TableColumnsFilterReducer,
  GlobalOrderFilterReducer,
});
export default rootReducer;
