import { useState } from "react";
import AddTaskMain from "./components/AddTaskMain";
import TasksContainer from "./components/TasksContainer";

import "@fontsource-variable/rubik";
import Footer from "./components/Footer";

function App() {
  const [tasks, setTasks] = useState([
    // {
    //   id: 1,
    //   name: "Revisar correos",
    //   description:
    //     "Revisar y responder los correos electrónicos recibidos durante el día.",
    //   completed: false,
    // },
    // {
    //   id: 2,
    //   name: "Preparar presentación",
    //   description:
    //     "Crear las diapositivas y contenido para la presentación de mañana.",
    //   completed: false,
    // },
    // {
    //   id: 3,
    //   name: "Actualizar portafolio",
    //   description:
    //     "Añadir los nuevos proyectos al portafolio personal en línea.",
    //   completed: false,
    // },
    // {
    //   id: 4,
    //   name: "Hacer ejercicio",
    //   description:
    //     "Realizar una rutina de entrenamiento de 30 minutos en el gimnasio.",
    //   completed: false,
    // },
    // {
    //   id: 5,
    //   name: "Leer libro",
    //   description:
    //     "Leer al menos 20 páginas del libro actual para avanzar en la lectura.",
    //   completed: false,
    // },
    // {
    //   id: 6,
    //   name: "Planificar la semana",
    //   description:
    //     "Organizar y planificar las tareas y objetivos para la semana próxima.",
    //   completed: false,
    // },
  ]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    console.log("soy addtask");
  };

  return (
    <div className="max-w-6xl flex flex-col lg:mx-auto px-5 min-h-screen gap-10">
      <AddTaskMain addTask={addTask}></AddTaskMain>
      <TasksContainer tasks={tasks} setTasks={setTasks}></TasksContainer>
      <Footer></Footer>
    </div>
  );
}

export default App;
