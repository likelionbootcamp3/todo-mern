import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTasks, removeTask } from "../../api/task";
import Loader from "./Loader";
import EditTaskModal from "../Modal/EditTaskModal";
import useModal from "../Modal/useModal";
import { useState } from "react";

const Task = ({ task, openModal, setTaskId }) => {
  const queryClient = useQueryClient();

  // RemoveTask handler function
  const removeTaskHandler = (id) => {
    removeTaskMutation.mutate(id);
  };

  // Remove task mutation
  const removeTaskMutation = useMutation({
    mutationFn: removeTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <>
      <div className="flex items-center gap-6 rounded-sm bg-slate-100 px-4 py-2">
        {/* Task Name */}
        <div className="grow">{task.name}</div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            className="rounded-lg bg-green-500 px-4 py-2 text-green-100 duration-300 hover:bg-green-600"
            onClick={() => {
              openModal();
              setTaskId(task._id);
            }}
          >
            <EditIcon />
          </button>
          <button
            className="rounded-lg bg-red-500 px-4 py-2 text-red-100 duration-300 hover:bg-red-600"
            onClick={() => removeTaskHandler(task._id)}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </>
  );
};

const Tasks = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [taskId, setTaskId] = useState(null);

  // Fetch tasks
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getAllTasks(),
  });

  if (isLoading) return <Loader />;
  if (isError) return <div>{error.message}</div>;
  return (
    <>
      <ul className="flex flex-col gap-2">
        {data.tasks.map((task) => (
          <li key={task._id}>
            <Task task={task} openModal={openModal} setTaskId={setTaskId} />
          </li>
        ))}
      </ul>
      {/* Edit Task Modal */}
      <EditTaskModal isOpen={isOpen} closeModal={closeModal} id={taskId} />
    </>
  );
};

export default Tasks;
