"use client";

import CreateCategoryForm from "@/components/category/CreateCategoryForm";
import CreateQuestionsForm from "@/components/category/CreateQuestionsForm";
import NewCategoryPreview from "@/components/category/NewCategoryPreview";
import { useGlobalContext } from "@/contexts/global/globalContext";

export default function CreateCategoryPage() {
  const {
    state: {
      newCategory: { filledCategory, filledQuestions, step },
    },
  } = useGlobalContext();

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {step === "category" && <CreateCategoryForm />}
      {step === "questions" && filledCategory && <CreateQuestionsForm />}
      {step === "preview" && filledCategory && filledQuestions && <NewCategoryPreview />}
    </div>
  );
}
