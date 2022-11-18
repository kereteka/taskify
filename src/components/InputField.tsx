import { useContext, useState, FC, FormEvent, useRef, useEffect } from "react";
import TodoContext from "./context/TodoContext";
import { motion, AnimatePresence } from "framer-motion";

const InputField: FC = () => {
	const todoContext = useContext(TodoContext);
	const [todoItems, setTodoItems] = useState<string[]>([]);

	useEffect(() => {
		todoContext?.todos.forEach((todoItem) =>
			setTodoItems([...todoItems, todoItem.todo])
		);
	}, [todoContext?.todos]);

	const handleSubmit = (e: FormEvent): void => {
		e.preventDefault();

		if (todoContext) {
			todoContext?.setTodos([
				...todoContext?.todos,
				{ id: Date.now(), todo: todoContext?.todo, isDone: false },
			]);
			todoContext?.setTodo("");
		}

		console.log(todoContext?.todos);
	};

	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 w-full">
			<div>
				<form
					onSubmit={(e) => {
						handleSubmit(e);
					}}
				>
					<div className="form-control">
						<div className="relative left-1/2">
							<motion.input
								type="text"
								className="input input-bordered input-md w-full h-16 focus:input-info focus:shadow-lg focus:shadow-cyan-500/50"
								placeholder="Enter the task"
								value={todoContext?.todo}
								onChange={(e) => todoContext?.setTodo(e.target.value)}
								variants={todoContext?.inputVariants}
								whileFocus={"whileFocus"}
							/>

							{todoContext &&
							!todoItems.includes(todoContext?.todo) &&
							todoContext.todo.length >= 5 ? (
								<motion.button
									className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg btn-outline  hover:bg-transparent   "
									variants={todoContext?.inputVariants}
									whileHover={"whileHover"}
									id="go-btn"
									type="submit"
								>
									<p>Go</p>
								</motion.button>
							) : (
								<>
									<motion.button
										className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg btn-disabled  hover:bg-transparent   "
										variants={todoContext?.inputVariants}
										whileHover={"whileHover"}
										id="go-btn"
									>
										<p>Go</p>
									</motion.button>

									<AnimatePresence>
										<motion.div
											className="alert alert-info shadow-lg mt-4"
											animate={{
												scale: 1.001,
												opacity: 0.8,
												transition: {
													yoyo: Infinity,
												},
											}}
											exit={{
												opacity: 0,
												transition: {
													duration: 2,
												},
											}}
										>
											Task should be at least 5 characters long and should not
											be equal to any other task
										</motion.div>
									</AnimatePresence>
								</>
							)}
						</div>
					</div>
				</form>
			</div>

			
		</div>
	);
};

export default InputField;
