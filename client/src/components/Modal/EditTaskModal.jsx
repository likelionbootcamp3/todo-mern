import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { getTask, updateTask } from "../../api/task";

const EditTaskModal = ({ id, isOpen, closeModal }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, resetField } = useForm();

  // UpdateTask Mutation
  const updateTaskMutation = useMutation({
    mutationFn: (task) => updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Get task
  const { data: taskData } = useQuery({
    queryKey: ["todos", id],
    queryFn: () => getTask(id),
    enabled: !!id,
  });

  // Update task
  const updateTaskHandler = (data) => {
    if (taskData.task.name !== data.name) {
      updateTaskMutation.mutate(data);
    }
    closeModal();
  };

  // Cancel update handler \
  const cancelUpdateHandler = () => {
    closeModal();
    resetField("name");
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={cancelUpdateHandler}>
        <form onSubmit={handleSubmit(updateTaskHandler)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Task {id}
                  </Dialog.Title>
                  <div className="mt-2">
                    {/* Input */}
                    <input
                      type="text"
                      className="focus:shadow-outline w-full rounded-tl-lg rounded-bl-lg bg-white px-3 py-4 text-base text-gray-700 placeholder-gray-400 shadow"
                      defaultValue={taskData?.task?.name}
                      {...register("name")}
                    />
                  </div>

                  <div className="mt-4 flex gap-4">
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-500 px-4 py-2 text-white duration-300 hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="rounded-lg bg-slate-100 px-4 py-2 text-black duration-300 hover:bg-slate-200"
                      onClick={cancelUpdateHandler}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </form>
      </Dialog>
    </Transition>
  );
};

export default EditTaskModal;
