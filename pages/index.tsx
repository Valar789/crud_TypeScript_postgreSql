import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { getData, handleDelete, handleUpdate } from "util/operaciones";
import { FaEraser } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import Header from "components/Header";
import { Task } from "interfaces/Task";
import Link from "next/link";

const listTask: any[] = [];
const initialItem: any = {};
const initialTask: any = { title: "", description: "" };

export default function Index() {
  const clearForm = () => {
    const form = document.querySelectorAll("form");
    form.forEach((form) => form.reset());
  };

  const [data, setdata] = useState(listTask);
  const [updateActive, setUpdateActive] = useState(false);
  const [item, setItem] = useState(initialItem);
  const [task, setTask] = useState(initialTask);

  const traeData = async () => {
    const data = await getData();
    setdata(data);
  };

  useEffect(() => {
    traeData();
  }, []);

  const captureValue = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask({
      ...task,
      [name]: value,
    });
  };

  const createTask = async (task: Task) => {
    const response = await fetch("http://localhost:3000/api/task", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const content = await response.json();
  };

  const deleteTask = async (id: any, title: any) => {
    const res = await handleDelete(id);
    alert(`La tarea #${id} - ${title} ha sido eliminada`);
    traeData();
  };

  const sumbitHandlerPOST = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createTask(task);
      traeData();

      alert("Tarea creada exitosamente");
    } catch (error) {
      alert("ha ocurrido un error");
    }
  };

  const activeUpdate = (obj: any) => {
    setUpdateActive(true);
    setItem(obj);
  };

  const sumbitHandlerUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleUpdate(item.id, task);
      traeData();
      alert("Tarea actualizda exitosamente");
    } catch (error) {
      alert("ha ocurrido un error recuerda seleccionar tarea");
    }
  };

  return (
    <section className="flex flex-col  p-3">
      <Header />
      {/* contenedor */}
      <div className="   gap-2 grid sm:grid-cols-12">
        <div className="sm:col-span-8 shadow-xl p-4 rounded-xl text-white bg-black/50 w-full h-full">
          <h3 className="text-center text-xl my-4">Tareas por hacer</h3>
          {data.length === 0 ? (
            <h3 className="text-center">No tienes tareas pendientes...</h3>
          ) : (
            data.map((obj) => (
              <div className="m-2  " key={obj.id}>
                <div className="w-full grid sm:grid-cols-12 bg-slate-500/75 hover:bg-blue-600  gap-2 rounded-md p-2">
                  <div className="w-full sm:col-span-8">
                    <h5 className="text-xl font-semibold">
                      #{obj.id}. {obj.title}
                    </h5>
                    <hr />
                    <p> {obj.description}</p>
                  </div>
                  <div className="w-full sm:col-span-4 flex justify-end gap-2">
                    <Link href="#!">
                      <FaEdit
                        onClick={() => activeUpdate(obj)}
                        className="m-2 h-7 w-7 hover:text-teal-500"
                      />
                    </Link>
                    <Link href="#!">
                      <FaEraser
                        onClick={() => deleteTask(obj.id, obj.title)}
                        className="m-2 h-7 w-7 hover:text-red-400"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="sm:col-span-4 shadow-xl text-white p-5 rounded-xl flex flex-col bg-slate-900/75 mx-auto w-full  ">
          <div className="flex justify-center w-full gap-2">
            <a
              href="#!"
              onClick={() => {
                setUpdateActive(false);
                setItem({});
              }}
              className="bg-blue-500/25 w-full text-center rounded-t-md p-2 "
            >
              Agregar tarea
            </a>
            <a
              href="#!"
              onClick={() => {
                setUpdateActive(true);
                clearForm();
              }}
              className="bg-teal-800 w-full text-center rounded-t-md p-2"
            >
              Editar tarea
            </a>
          </div>
          {updateActive === false ? (
            // form POST
            <form
              id="form"
              onSubmit={sumbitHandlerPOST}
              className="w-full p-3 rounded-b-md flex flex-col gap-4 bg-blue-500/25"
            >
              <div>
                <input
                  placeholder="Ingrese el nombre de la tarea"
                  name="title"
                  onChange={captureValue}
                  type="text"
                  className="p-2 w-full rounded-md text-gray-800"
                />
              </div>
              <div>
                <textarea
                  placeholder="Agregue una Descripcion"
                  name="description"
                  onChange={captureValue}
                  className="p-2 w-full rounded-md text-gray-800"
                />
              </div>
              <div className="w-full bg-orange-600 hover:bg-gray-500 p-2 rounded-md shadow-md">
                <button type="submit" className="w-full">
                  Agregar tarea
                </button>
              </div>
            </form>
          ) : (
            // form UPDATE

            <form
              id="form"
              onSubmit={sumbitHandlerUpdate}
              className="w-full p-3 rounded-b-md flex flex-col gap-4 bg-teal-800"
            >
              <div>
                <input
                  placeholder={
                    item.title && item.title !== ""
                      ? item.title
                      : "Ingrese el nombre de la tarea"
                  }
                  name="title"
                  onChange={captureValue}
                  type="text"
                  className="p-2 w-full rounded-md text-gray-800"
                />
              </div>
              <div>
                <textarea
                  placeholder={
                    item.description && item.description !== ""
                      ? item.description
                      : "Ingrese una Descripcion"
                  }
                  name="description"
                  onChange={captureValue}
                  className="p-2 w-full rounded-md text-gray-800"
                />
              </div>
              <div className="w-full bg-orange-600 hover:bg-gray-500 p-2 rounded-md shadow-md">
                <button type="submit" className="w-full">
                  Editar tarea
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
