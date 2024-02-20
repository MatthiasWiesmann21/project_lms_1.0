"use client";

const initialState = {
  user: {},
};

const reducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case "SetUser":
      return { ...state, user: action?.payload };
    case "ClearUser":
      return { ...state, user: {} };
    default:
      return state;
  }
};

export default reducer;
