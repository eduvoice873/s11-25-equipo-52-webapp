import type { CategoryCreateDto } from "@/models/category/dto/category";
import { QuestionCreateDto } from "@/models/question/dto/question";
import type { GlobalContextAction, NewCategoryStep } from "@/types/category";

export function setNewCategory(newCategory: CategoryCreateDto): GlobalContextAction {
  return { type: "SET_NEW_CATEGORY", payload: newCategory };
}

export function clearNewCategory(): GlobalContextAction {
  return { type: "CLEAR_NEW_CATEGORY" };
}

export function setNewCategoryStep(step: NewCategoryStep): GlobalContextAction {
  return { type: "SET_NEW_CATEGORY_STEP", payload: step };
}

export function setNewCategoryQuestions(questions: QuestionCreateDto[]): GlobalContextAction {
  return { type: "SET_NEW_CATEGORY_QUESTIONS", payload: questions };
}
