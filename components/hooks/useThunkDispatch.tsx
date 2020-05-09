import React from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IRootState, IDefaultAction } from '../../models/store';

const useThunkDispatch = () => {
  const dispatch =  useDispatch<ThunkDispatch<IRootState, null, IDefaultAction<any>>>();
  return dispatch;
} 

export default useThunkDispatch
