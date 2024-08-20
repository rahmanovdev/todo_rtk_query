import { api as index } from "..";

const ENDPOINTS = process.env.NEXT_PUBLIC_ENDPOINT;

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query<TODO.GetTodosResponse, TODO.GetTodosRequest>({
      query: () => ({
        url: `${ENDPOINTS}`,
        method: "GET",
      }),
      providesTags: ["todo"],
    }),
    postTodo: build.mutation<TODO.PostTodosResponse, TODO.PostTodosRequest>({
      query: (data) => ({
        url: `/${ENDPOINTS}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),

    editTodo: build.mutation<TODO.EditTodosResponse, TODO.EditTodosRequest>({
      query: ({ _id, data }) => ({
        url: `/${ENDPOINTS}/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),

    deleteTodo: build.mutation<
      TODO.DeleteTodosResponse,
      TODO.DeleteTodosRequest
    >({
      query: (_id) => ({
        url: `/${ENDPOINTS}/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  usePostTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
} = api;
