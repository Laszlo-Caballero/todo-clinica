import ButtonWrapper from "@/components/shared/button-wrapper/ButtonWrapper";
import { errorWrapper } from "@/lib/errorWrapper";
import CreatePersonal from "@/modules/create-personal/CreatePersonal";
import TablaTodo from "@/modules/tabla-todo/TablaTodo";
import { TodoResponse } from "./api/todos/route";
import CreateTodo from "@/modules/create-todo/CreateTodo";

export default async function Home() {
  const [error, todos] = await errorWrapper<TodoResponse[]>(async () => {
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

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-red-500 text-lg">
          Error al cargar las tareas: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col gap-4">
      <header className="w-full py-2 px-4 border-b border-gray-300 justify-between items-center flex">
        <h1 className="text-xl font-semibold">
          Lista de Tarea para el sistema
        </h1>

        <div className="flex items-center gap-2">
          <ButtonWrapper message="Crear Tarea">
            <CreateTodo />
          </ButtonWrapper>

          <ButtonWrapper message="Crear Personal">
            <CreatePersonal />
          </ButtonWrapper>
        </div>
      </header>
      <TablaTodo todos={todos || []} />
    </div>
  );
}
