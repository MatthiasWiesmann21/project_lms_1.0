"use client";

const initialState = {
  user: {} as any,
};

const reducer = (state = initialState, action: any) => {
  switch (action?.type) {
    case "SetUser":
      return { ...state, user: action?.payload };
    case "UpdateUserContainer":
      return {
        ...state,
        user: {
          ...state?.user,
          container: {
            ...state?.user?.container,
            ...action?.payload,
          },
        },
      };
    case "ClearUser":
      return { ...state, user: {} };
    default:
      return state;
  }
};

export default reducer;
