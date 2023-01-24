import { Fragment, useState } from 'react';
import { useApolloStore } from './store'

const App = () => {

    const [state, setState] = useApolloStore();
    const [condition, setCondition] = useState(null);

    const handleDelete = (id) => {
        setState((prev) => prev.filter(todo => todo.id !== id));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = new Date().getTime();
        const formData = new FormData(e.target)
        const todo = formData.get('todo');
        setState((prev) => {
            return [...prev, { id, name: todo, completed: false }]
        })
        e.target.reset();
    }

    const handleChecked = (e, id) => {
        const checked = e.target.checked;
        setState(prev => prev.map(todo => {
            if (todo.id === id) todo.completed = checked;
            return todo;
        }))
    }

    return (
        <div className='container flex justify-center'>
            <div className="max-w-sm mt-5 w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <form className='flex  items-end' onSubmit={handleSubmit}>
                    <div className='w-full'>
                        <label htmlFor="todo"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Todo</label>
                        <input type="text"
                            name='todo'
                            className="bg-gray-50  border focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div>
                        <button type="submit"
                            className="py-2.5 flex-1 ml-2 px-5 text-sm font-medium text-gray-900 focus:outline-none  bg-white rounded-lg border focus:ring-blue-500 hover:text-blue-700 focus:z-10 focus:border-blue-500 focus:ring-0 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                    </div>
                </form>
                <div className='flex -mx-1 my-3'>
                    <button type="button" onClick={() => setCondition(null)}
                        className="py-2.5 flex-1 mx-1 px-5 text-sm font-medium text-gray-900 focus:outline-none  bg-white rounded-lg border focus:ring-blue-500 hover:text-blue-700 focus:z-10 focus:border-blue-500 focus:ring-0 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        All
                    </button>
                    <button type="button"
                        onClick={() => setCondition(false)}
                        className="py-2.5 flex-1 mx-1 px-5 text-sm font-medium text-gray-900 focus:outline-none  bg-white rounded-lg border focus:ring-blue-500 hover:text-blue-700 focus:z-10 focus:border-blue-500 focus:ring-0 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Active
                    </button>
                    <button type="button"
                        onClick={() => setCondition(true)}
                        className="py-2.5 flex-1 mx-1 px-5 text-sm font-medium text-gray-900 focus:outline-none  bg-white rounded-lg border focus:ring-blue-500 hover:text-blue-700 focus:z-10 focus:border-blue-500 focus:ring-0 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Completed
                    </button>
                </div>
                {state.filter((todo) => {
                    return condition === null || todo.completed === condition;
                }).map((todo) => <Fragment key={todo.id}>
                    <div className='flex items-center justify-between mb-2 border px-2 py-4'>
                        <div className='flex items-center'>
                            <input checked={todo.completed} onChange={(e) => {
                                handleChecked(e, todo.id)
                            }} type="checkbox" className="focus:outline-none w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor={todo.id} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{todo.name}</label>
                        </div>
                        <div>
                            <svg onClick={() => { handleDelete(todo.id) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </div>
                    </div>
                </Fragment>)}
                <div>
                    {state.filter(todo => todo.completed === false).length} left
                </div>
                <div className='-mx-1 flex mt-2'>
                    <button type="button"
                        className="py-2.5 flex-1 mx-1 px-5 text-sm font-medium text-gray-900 focus:outline-none  bg-white rounded-lg border focus:ring-blue-500 hover:text-blue-700 focus:z-10 focus:border-blue-500 focus:ring-0 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Check All
                    </button>
                    <button type="button"
                        className="py-2.5 flex-1 mx-1 px-5 text-sm font-medium text-gray-900 focus:outline-none  bg-white rounded-lg border focus:ring-blue-500 hover:text-blue-700 focus:z-10 focus:border-blue-500 focus:ring-0 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Inchecked All
                    </button>
                </div>
            </div>
        </div>
    )
}

export default App