import { FC, useState } from "react";
import InputField from "./components/InputField";
import { TodoProvider } from "./components/context/TodoContext";
import TodoList from "./components/TodoList";

const App: FC = () => {
	return (
		<TodoProvider>
			<div className="App">
				<div className="flex justify-center mt-8">
					<h1 className="text-3xl font-bold">TASKIFY</h1>
				</div>

				<div className="mt-9">
					<InputField />
				</div>
				<div className="mt-9 mx-20 ">
					<TodoList />
				</div>
			</div>
		</TodoProvider>
	);
};

export default App;
