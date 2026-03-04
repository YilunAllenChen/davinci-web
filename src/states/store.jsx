import { createSlice, configureStore } from "@reduxjs/toolkit";

import { customizationInit, questionBank } from "./init/initCustomization.jsx";
import { navigationInit } from "./init/initNavigation.jsx";
import { navigateToAction } from "./action/actionNavigation";
import {
  changeUserStateAction,
  answerQuestionAction,
  updateCustomizationAction,
} from "./action/actionCustomization.jsx";

const rootReducer = createSlice({
  name: "main",
  initialState: {
    customization: customizationInit,
    questionBank: questionBank,
    navigation: navigationInit,
  },
  reducers: {
    changeUserState: changeUserStateAction,
    answerQuestion: answerQuestionAction,
    updateCustomization: updateCustomizationAction,
    navigateTo: navigateToAction,
  },
});

export const {
  changeUserState,
  answerQuestion,
  updateCustomization,
  navigateTo,
} = rootReducer.actions;

export const store = configureStore({
  reducer: rootReducer.reducer,
});

export default rootReducer.reducer;
