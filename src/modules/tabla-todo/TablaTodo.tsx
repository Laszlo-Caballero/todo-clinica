import { TodoResponse } from "@/app/api/todos/route";
import Table from "@/components/ui/table/Table";

interface TablaTodoProps {
  todos: TodoResponse[];
}

export default function TablaTodo({ todos }: TablaTodoProps) {
  console.log("Todos en TablaTodo:", todos);

  return <Table data={todos} columns={[]} />;
}
