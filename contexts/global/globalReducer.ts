import { GlobalContextAction, GlobalContextState } from "@/types/category";

export const globalContextInitialState: GlobalContextState = {
  newCategory: {
    category: {
      nombre: "",
      titulo: "",
      mensaje: "",
    },
    questions: [{ texto: "" }],
    filledCategory: false,
    filledQuestions: false,
    step: "category",
  },
};

export function globalReducer(state: GlobalContextState, action: GlobalContextAction): GlobalContextState {
  switch (action.type) {
    case "SET_NEW_CATEGORY":
      return {
        ...state,
        newCategory: {
          ...state.newCategory,
          category: action.payload,
          filledCategory: true,
        },
      };
    case "CLEAR_NEW_CATEGORY":
      return {
        ...state,
        newCategory: globalContextInitialState.newCategory,
      };
    case "SET_NEW_CATEGORY_STEP":
      return {
        ...state,
        newCategory: {
          ...state.newCategory,
          step: action.payload,
        },
      };
    case "SET_NEW_CATEGORY_QUESTIONS":
      return {
        ...state,
        newCategory: {
          ...state.newCategory,
          questions: action.payload,
          filledQuestions: true,
        },
      };
    default:
      return { ...state };
  }
}
