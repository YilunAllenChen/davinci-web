export function answerQuestionAction(state, action) {
  let { question, answer } = action.payload;
  state.customization.questions[question] = answer;
  console.log('Answer to question "%s" is now "%s"', question, answer);
}

export function changeUserStateAction(state, action) {
  let { newState } = action.payload;
  state.userState = newState;
  console.log("User state is now %s", newState);
}

export function updateCustomizationAction(state, action) {
  Object.assign(state.customization, action.payload);
  console.log(action.payload);
}
