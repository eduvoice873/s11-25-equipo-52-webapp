import { useGlobalContext } from "@/contexts/global/globalContext";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { setNewCategoryStep } from "@/contexts/global/globalActions";
import { redirect } from "next/navigation";

export default function NewCategoryPreview() {
  const {
    state: {
      newCategory: { category, questions },
    },
    dispatch,
  } = useGlobalContext();

  function handlePreviousStep() {
    dispatch(setNewCategoryStep("questions"));
  }

  async function createCategory() {
    const res = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({ category, questions }),
    });

    if (res.ok) {
      redirect("/categories");
    }
  }

  return (
    <Card>
      <h1 className="text-3xl font-bold">{category.titulo}</h1>
      <p>{category.mensaje}</p>
      <h2 className="text-xl font-bold">Cuestionario para los testimonios:</h2>
      {questions.map((question, i) => (
        <p key={i}>{question.texto}</p>
      ))}
      <div className="flex gap-2">
        <Button onClick={handlePreviousStep}>
          Atras
        </Button>
        <Button className="w-full" onClick={createCategory}>
          Crear
        </Button>
      </div>
    </Card>
  );
}
