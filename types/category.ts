import { CategoryCreateDto } from "@/models/category/dto/category";
import { QuestionCreateDto } from "@/models/question/dto/question";

export type NewCategoryStep = "category" | "questions" | "preview";

export interface MiniFormConfig {
  nombreFormulario: string;
  descripcion: string;
  slugPublico: string;
  mensajeGracias: string;
  permitirTexto: boolean;
  permitirTextoImagen: boolean;
  permitirVideo: boolean;
  pedirNombre: boolean;
  pedirCorreo: boolean;
}

export interface NewCategoryContext {
  category: CategoryCreateDto;
  questions: QuestionCreateDto[];
  filledCategory: boolean;
  filledQuestions: boolean;
  step: NewCategoryStep;
  formConfig: MiniFormConfig;
}

export interface GlobalContextState {
  newCategory: NewCategoryContext;
}

export type GlobalContextAction =
  | { type: "SET_NEW_CATEGORY"; payload: CategoryCreateDto }
  | { type: "CLEAR_NEW_CATEGORY" }
  | { type: "SET_NEW_CATEGORY_STEP"; payload: NewCategoryStep }
  | { type: "SET_NEW_CATEGORY_QUESTIONS"; payload: QuestionCreateDto[] }
  | { type: "SET_NEW_CATEGORY_FORM"; payload: MiniFormConfig };

export interface GlobalContextT {
  state: GlobalContextState;
  dispatch: React.Dispatch<GlobalContextAction>;
}
