import React from "react";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { Input, Textarea, Button } from "@nextui-org/react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useTable,
} from "@nextui-org/react";

import closeImg from "../assets/close.svg";
import completeImg from "../assets/complete.svg";
import editImg from "../assets/edit.svg";
import deleteImg from "../assets/delete.svg";

import completeBlackImg from "../assets/completeBlack.svg";
import editBlackImg from "../assets/editBlack.svg";
import deleteBlackImg from "../assets/deleteBlack.svg";
import undoBlackImg from "../assets/undoBlack.svg";

const TasksContainer = ({ tasks, setTasks }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setTaskName(task.name);
    setTaskDescription(task.description);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTaskToEdit(null);
    setTaskName("");
    setTaskDescription("");
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    if (!taskToEdit) return;

    const updatedTask = {
      ...taskToEdit,
      name: taskName,
      description: taskDescription,
    };

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    closeEditModal();
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };

  const [tasksCompleted, setTasksCompleted] = useState([]);
  const [tasksDeleted, setTasksDeleted] = useState([]);

  const handleDelete = (taskId) => {
    const deletedTask = tasks.find((task) => task.id === taskId);

    if (!deletedTask) return;

    setTasksDeleted((prevDeleted) => [...prevDeleted, deletedTask]);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleComplete = (taskId) => {
    const completedTask = tasks.find((task) => task.id === taskId);

    if (!completedTask) return;

    setTasksCompleted((prevCompleted) => [...prevCompleted, completedTask]);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  //   const handleUndo = (taskId) => {
  //     const undoTask = tasksDeleted.find((task) => task.id === taskId);

  //     if (!undoTask) return;

  //     setTasks((prevTasks) => [...prevTasks, undoTask]);
  //     setTasksDeleted((prevTasks) =>
  //       prevTasks.filter((task) => task.id !== taskId)
  //     );
  //   };

  const handleUndo = (taskId, source) => {
    if (source === "completed") {
      const undoTask = tasksCompleted.find((task) => task.id === taskId);

      if (!undoTask) return;

      setTasks((prevTasks) => [...prevTasks, undoTask]);
      setTasksCompleted((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
    } else if (source === "deleted") {
      const undoTask = tasksDeleted.find((task) => task.id === taskId);

      if (!undoTask) return;

      setTasks((prevTasks) => [...prevTasks, undoTask]);
      setTasksDeleted((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
    }
  };

  const handleDeletePermanent = (taskId, source) => {
    if (source === "completed") {
      setTasksCompleted((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
    } else if (source === "deleted") {
      setTasksDeleted((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
    }

    // const taskDeletePermanent = tasksCompleted.find(
    //   (task) => task.id === taskId
    // );

    // if (!taskDeletePermanent) return;

    // setTasksCompleted((prevTasks) =>
    //   prevTasks.filter((task) => task.id !== taskId)
    // );
  };

  return (
    <main className="flex flex-col gap-16">
      {tasks && tasks.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tasks.map((task) => (
            <Card key={task.id} className="w-full" shadow="sm">
              <CardHeader className="font-rubik text-xl font-bold">
                {task.name}
              </CardHeader>
              <CardHeader className="font-rubik text-xl font-bold">
                {task.id}
              </CardHeader>
              <CardBody className="font-rubik ">{task.description}</CardBody>
              <CardFooter>
                <div className="flex gap-2 ml-auto">
                  {/* onClick={() => handleEdit(task.id)} */}
                  <button onClick={() => openEditModal(task)}>
                    <img className=" w-5" src={editImg} alt="" />
                  </button>

                  <button onClick={() => handleDelete(task.id)}>
                    <img className=" w-5" src={deleteImg} alt="" />
                  </button>

                  <button onClick={() => handleComplete(task.id)}>
                    <img className=" w-5" src={completeImg} alt="" />
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </section>
      ) : (
        <div className="flex md:text-4xl w-full bg-[#141414] py-8 rounded-lg justify-center">
          <h2 className="text-[#818181] font-medium">
            No hay tareas pendientes!
          </h2>
        </div>
      )}
      <AnimatePresence>
        {isEditModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 "
            onClick={closeEditModal}
          >
            <motion.div
              className="bg-[#121212] p-6 rounded-lg shadow-lg w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <button
                className="cursor-pointer flex ml-auto "
                onClick={closeEditModal}
              >
                <img src={closeImg} width={16} alt="" />
              </button>

              <h2 className="text-xl font-semibold mb-4">Editar tarea</h2>
              <form onSubmit={handleUpdateTask} className="space-y-4">
                <Input
                  type="text"
                  id="taskName"
                  name="taskName"
                  required
                  label="Nombre de la tarea"
                  labelPlacement="inside"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />

                <Textarea
                  type="text"
                  id="taskName"
                  name="taskName"
                  required
                  label="Descripción de la tarea"
                  labelPlacement="inside"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />

                <div className="flex justify-end space-x-2">
                  <Button
                    type="submit"
                    className="bg-[#A69DCA] text-[#121212] px-4 py-2 rounded-lg font-medium "
                  >
                    Confirmar edición
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tasksCompleted.map((task) => (
          <Card key={task.id} className="w-full bg-[#c3d946] " shadow="sm">
            <CardHeader className="font-rubik text-xl font-bold text-[#121212]">
              {task.name}
            </CardHeader>
            <CardHeader className="font-rubik text-xl font-bold text-[#121212]">
              {task.id}
            </CardHeader>
            <CardBody className="font-rubik  text-[#121212]">
              {task.description}
            </CardBody>
            <CardFooter>
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => handleDeletePermanent(task.id, "completed")}
                >
                  <img className=" w-5" src={deleteBlackImg} alt="" />
                </button>

                <button onClick={() => handleUndo(task.id, "completed")}>
                  <img className=" w-5" src={undoBlackImg} alt="" />
                </button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tasksDeleted.map((task) => (
          <Card key={task.id} className="w-full bg-[#F09152]" shadow="sm">
            <CardHeader className="font-rubik text-xl font-bold text-[#121212]">
              {task.name}
            </CardHeader>
            <CardHeader className="font-rubik text-xl font-bold text-[#121212]">
              {task.id}
            </CardHeader>
            <CardBody className="font-rubik  text-[#121212]">
              {task.description}
            </CardBody>
            <CardFooter>
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => handleDeletePermanent(task.id, "deleted")}
                >
                  <img className=" w-5" src={deleteBlackImg} alt="" />
                </button>

                <button onClick={() => handleUndo(task.id, "deleted")}>
                  <img className=" w-5" src={undoBlackImg} alt="" />
                </button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default TasksContainer;
