import { all } from 'redux-saga/effects';
import { watchSetLoading } from './genric/Saga';
import { watchLogin } from './login/Saga';
import { watchLog } from './Logger/LoggerSaga';
import {
  watchFilesByProcessIDSuccess,
  watchFilesByProcessIDFail,
  watchApproveImportedFile,
} from './file/Saga';


import { watchActiveItem, watchUnitDetailsGet } from './ActiveItem/ActiveItemSaga';
import { watchGlobalFilterFilter } from './GlobalOrderFilter/GlobalOrderFilterSaga';
import { watchTableColumnsFilter } from './TableColumnsFilter/TableColumnsFilterSaga';

export default function* rootSaga() {
  yield all([
    watchSetLoading(),
    watchLogin(),
    watchFilesByProcessIDSuccess(),
    watchFilesByProcessIDFail(),
    watchApproveImportedFile(),
    watchLog(),
    watchActiveItem(),
    watchTableColumnsFilter(),
    watchUnitDetailsGet(),
    watchGlobalFilterFilter(),
  ]);
}
