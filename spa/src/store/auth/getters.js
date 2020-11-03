export function loggedIn(state) {
  return !!state.token;
}

export function token(state) {
  return state.token;
}

export function user(state) {
  return state.user;
}
