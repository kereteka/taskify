import { createContext, useState, ReactNode, Dispatch } from "react";

type TodoProviderProps = {
	children?: ReactNode;
};

type Transition = {
	duration: number;
};

type WhileFocus = {
	borderColor: string;
	transition: Transition;
};

type WhileHover = {
	color: string;
};

type InputVariants = {
	whileFocus: WhileFocus;
	whileHover: WhileHover;
};

type TodoContext = {
	todo: string;
	setTodo: Dispatch<React.SetStateAction<string>>;
	inputVariants: InputVariants;
	todos: Todos[];
	setTodos: Dispatch<React.SetStateAction<Todos[]>>;
};

interface Todos {
	id: number;
	todo: string;
	isDone: boolean;
}

const TodoContext = createContext<TodoContext | null>(null);

export const TodoProvider = ({ children }: TodoProviderProps) => {
	const [todo, setTodo] = useState<string>("");
	const [todos, setTodos] = useState<Todos[]>([]);

	const inputVariants = {
		whileFocus: {
			borderColor: "#06b6d480",

			transition: {
				duration: 1,
			},
		},
		whileHover: {
			color: "#06b6d4",
		},
	};

	return (
		<TodoContext.Provider
			value={{ todo, setTodo, inputVariants, todos, setTodos }}
		>
			{children}
		</TodoContext.Provider>
	);
};

export default TodoContext;
