export function navigateToAction(state, action) {
  let { to } = action.payload;
  state.navigation.curr = to;
  console.log("user now navigating %s", to);
}
