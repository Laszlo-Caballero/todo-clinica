import ButtonWrapper from "@/components/shared/button-wrapper/ButtonWrapper";
import Button from "@/components/ui/button/Button";
import { TodosInclude } from "@/generated/prisma-client/models";
import { errorWrapper } from "@/lib/errorWrapper";
import CreatePersonal from "@/modules/create-personal/CreatePersonal";

export default async function Home() {
  const [error, todos] = await errorWrapper<TodosInclude[]>(async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
      next: {
        tags: ["todos"],
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch todos");
    }

    return res.json();
  });

  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="w-full py-2 px-4 border-b border-gray-300 justify-between items-center flex">
        <h1 className="text-xl font-semibold">
          Lista de Tarea para el sistema
        </h1>

        <ButtonWrapper message="Crear Personal">
          <CreatePersonal />
        </ButtonWrapper>
      </header>
    </div>
  );
}
