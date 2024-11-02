import store from './store';
import { useSelector } from 'react-redux';

const authSelector = () => {
  return store.getState().auth;
};

const initSelector = () => {
  return store.getState().init;
};

const categoriesSelector = () => {
  return store.getState().categories;
};

export const useAuthSelector = () => useSelector(authSelector);
export const useInitSelector = () => useSelector(initSelector);
export const useCategoriesSelector = () => useSelector(categoriesSelector);
