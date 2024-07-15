import CreateTask from "../component/create_task";

export default function ViewCreateTaskDivision({ searchParams }: { searchParams: any }) {
   return (
      <CreateTask searchParams={searchParams} />
   );
}