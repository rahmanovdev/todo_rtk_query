namespace TODO {
  interface ITodo {
    _id?: number;
    title: string;
    description: string;
    img: string;
  }

  type GetTodosResponse = ITodo[];
  type GetTodosRequest = void;

  type PostTodosResponse = ITodo[];
  type PostTodosRequest = ITodo;

  type EditTodosResponse = ITodo[];
  type EditTodosRequest = {
    _id: number;
    data: ITodo;
  };

  type DeleteTodosResponse = ITodo[];
  type DeleteTodosRequest = number | undefined;
}
