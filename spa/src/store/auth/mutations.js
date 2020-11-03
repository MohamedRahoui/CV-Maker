import {get} from 'lodash';

export function login(state, data) {
  state.user = get(data, 'user', {
    username: null,
    email: null,
    id: null
  });
  state.token = get(data, 'token', null);
}

export function logout(state) {
  state.user = {
    username: null,
    email: null,
    id: null
  };
  state.token = null;
}
