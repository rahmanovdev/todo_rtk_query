"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostTodoMutation } from "@/redux/api/todo";
import { useUploadFileMutation } from "@/redux/api/file";
import styles from "./TodoAdd.module.scss";

interface IFormInput {
  title: string;
  description: string;
  file: string[];
}

const TodoAdd = () => {
  const [postTodoMutation] = usePostTodoMutation();
  const [uploadFileMutation] = useUploadFileMutation();
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const file = data.file[0];
    const formData = new FormData();
    formData.append("file", file);

    const { data: responseData } = await uploadFileMutation(formData);

    const newData = {
      title: data.title,
      description: data.description,
      img: responseData?.url!,
    };

    await postTodoMutation(newData);
  };

  return (
    <div className={styles.container}>
      <h1>Add Todo</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Title" {...register("title", { required: true })} />
        <input
          placeholder="Description"
          {...register("description", { required: true })}
        />
        <input type="file" {...register("file", { required: true })} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default TodoAdd;
