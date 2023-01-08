import AddIcon from "./icons/AddIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../../api/task";
import { useForm } from "react-hook-form";

const Input = () => {
  const queryClient = useQueryClient();
  const { handleSubmit, register, reset } = useForm();

  // Initialize onSubmit callback
  const onSubmit = (data) => {
    addTaskMutation.mutate(data);
    reset();
  };

  // Create mutation
  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex">
        {/* Input */}
        <input
          autoFocus
          type="text"
          className="focus:shadow-outline w-full rounded-tl-lg rounded-bl-lg bg-white px-3 py-4 text-base text-gray-700 placeholder-gray-400 shadow"
          placeholder="Add a task"
          {...register("name")}
        />

        {/* Add Button */}
        <button className="rounded-tr-lg rounded-br-lg bg-blue-500 px-4 py-4 text-blue-100 duration-300 hover:bg-blue-600">
          <AddIcon />
        </button>
      </div>
    </form>
  );
};

export default Input;
