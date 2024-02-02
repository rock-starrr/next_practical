import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { DeleteTodomodal } from './DeleteTodomodal';
import { EditTodoModal } from './EditTodoModal';

export const ViewTodoModal = ({ title, id }) => {
    const [open, setOpen] = useState(false);
    const { todos } = useSelector((state) => state.todo)
    const data = todos.filter((todo) => todo?.id === id)[0]

    return (
        <div>
            <div
                className="mb-2 line-clamp-1 text-2xl font-bold tracking-tight cursor-pointer text-gray-900 dark:text-white"
                onClick={() => {
                    setOpen(!open)
                }}
            >
                {title}
            </div>

            <div className={`flex ${!open && 'hidden'} justify-center bg-[#41414180] backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center md:inset-0 h-screen w-screen`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => {
                                    setOpen(!open)
                                    reset()
                                }}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="p-3 md:p-5 space-y-4">
                            <div className="space-y-6">
                                <div className='p-2 pt-0'>
                                    <div>
                                        <div className="block outline-none w-full text-xl font-medium px-3 py-2 placeholder:text-gray-400 sm:leading-6">
                                            {data?.title}
                                        </div>
                                    </div>
                                    <div className='border-b' />
                                    <div>
                                        <div className="block textAreaStyle outline-none w-full px-3 py-3 h-44 placeholder:text-gray-400 sm:leading-6">
                                            {data?.description}
                                        </div>
                                    </div>
                                    <div className='border-b' />
                                    <div className='mt-2'>
                                        <div className={`block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer`}>
                                            {data?.status}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-2 border-t space-x-2 border-gray-200 rounded-b dark:border-gray-600">
                                    <EditTodoModal id={id} />
                                    <DeleteTodomodal id={id} />
                                    <button
                                        type="button"
                                        className="rounded-full outline-none ext-center text-gray-500 mt-1 mr-1 p-1 pl-3 pr-3 bg-white hover:bg-gray-100 focus:ring-blue-300 border border-gray-200 text-sm hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                        onClick={() => {
                                            setOpen(!open)
                                            reset()
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}