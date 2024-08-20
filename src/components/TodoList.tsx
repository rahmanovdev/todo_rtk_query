"use client";
import { useUploadFileMutation } from "@/redux/api/file";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from "@/redux/api/todo";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./TodoList.module.scss";

interface IFormInput {
  title: string;
  description: string;
  file: string[];
}

const TodoList = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const { data } = useGetTodosQuery();
  const [deleteTodoMutation] = useDeleteTodoMutation();
  const [editTodoMutation] = useEditTodoMutation();
  const [uploadFileMutation] = useUploadFileMutation();

  const { register, handleSubmit, setValue } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const file = data.file[0];
    const formData = new FormData();
    formData.append("file", file);

    const { data: responseImage } = await uploadFileMutation(formData);

    const updateData = {
      title: data.title,
      description: data.description,
      img: responseImage?.url!,
    };
    await editTodoMutation({ _id: editId!, data: updateData });
    setEditId(null);
  };

  return (
    <div className={styles.content}>
      <h1>TodoList</h1>
     <div className="container">
      <div className={styles.cards}>
      {data?.map((item) => (
        <div key={item._id} className={styles.todoItem}>
          {item._id === editId ? (
            <form onSubmit={handleSubmit(onSubmit)} action="">
              <input
                placeholder="edit title"
                type="text"
                {...register("title", { required: true })}
              />
              <input
                placeholder="edit description"
                type="text"
                {...register("description", { required: true })}
              />
              <input type="file" {...register("file")} />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditId(null)}>
                Cancel
              </button>
            </form>
          ) : (
            <>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <Image width={700} height={240} src={item.img} alt="photo" />
              <button onClick={() => deleteTodoMutation(item._id)}>
                Delete
              </button>
              <button
                onClick={() => {
                  setEditId(item._id!);
                  setValue("title", item.title);
                  setValue("description", item.description);
                }}
              >
                Edit
              </button>
            </>
          )}
        </div>
      ))}
      </div>
     </div>
    </div>
  );
};

export default TodoList;
