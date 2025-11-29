import { CategoryCreateDto } from "@/models/category/dto/category";
import type { CategoryFullDTO } from "@/models/categoryFull/dto/categoryFull";
import { QuestionCreateDto } from "@/models/question/dto/question";

export type NewCategoryStep = "category" | "questions" | "preview";

export interface NewCategoryContext extends CategoryFullDTO {
  filledCategory: boolean;
  filledQuestions: boolean;
  step: NewCategoryStep;
}

export interface GlobalContextState {
  newCategory: NewCategoryContext;
}

export type GlobalContextAction =
  | { type: "SET_NEW_CATEGORY"; payload: CategoryCreateDto }
  | { type: "CLEAR_NEW_CATEGORY" }
  | { type: "SET_NEW_CATEGORY_STEP"; payload: NewCategoryStep }
  | { type: "SET_NEW_CATEGORY_QUESTIONS"; payload: QuestionCreateDto[] };

export interface GlobalContextT {
  state: GlobalContextState;
  dispatch: React.Dispatch<GlobalContextAction>;
}
