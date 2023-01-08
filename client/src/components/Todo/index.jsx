import Input from "./Input";
import Tasks from "./Tasks";

const Todo = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Search Input */}
      <Input />

      {/* Tasks */}
      <Tasks />
    </div>
  );
};

export default Todo;
