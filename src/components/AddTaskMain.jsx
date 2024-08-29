import React, { useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/react";

import { motion, AnimatePresence } from "framer-motion";

import addImg from "../assets/add.svg";
import closeImg from "../assets/close.svg";

const AddTaskMain = ({ addTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  function generateUniqueId() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: generateUniqueId(),
      name: taskName,
      description: taskDescription,
    };

    addTask(newTask);

    console.log("tarea agregada");
    setTaskName("");
    setTaskDescription("");
    // closeModal();
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };

  return (
    <main className="flex justify-center py-5 w-full mt-16">
      <Button
        color="primary"
        className="text-[#1E1E1E] font-medium md:text-xl lg:text-2xl bg-[#A69DCA] py-8 px-6 w-full"
        onClick={openModal}
      >
        <img className="" src={addImg} alt="" />
        Ingresa una tarea por hacer...
      </Button>

      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 "
            onClick={closeModal}
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
                onClick={closeModal}
              >
                <img src={closeImg} width={16} alt="" />
              </button>

              <h2 className="text-xl font-semibold mb-4">
                Agregar Nueva Tarea
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    Agregar
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default AddTaskMain;
