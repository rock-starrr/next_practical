import { addTodo } from '@/lib/Slices/TodoSlice';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export const AddTodo = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const addTodoData = (inputData) => {
        dispatch(addTodo(inputData))
        setOpen(!open)
        reset()
    }

    return (
        <div className='pl-4'>
            <button
                className="text-white mb-3 mt-3 bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-full text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                type="button"
                onClick={() => {
                    setOpen(!open)
                }}
            >
                + TODO
            </button>

            <div className={`flex ${!open && 'hidden'} justify-center bg-[#41414180] backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center md:inset-0 h-screen w-screen`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                Add Todo
                            </h3>
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
                            <form className="space-y-6" onSubmit={handleSubmit(addTodoData)}>
                                <div className='p-2 pt-0'>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder='Title'
                                            className="block outline-none w-full text-xl font-medium px-3 py-2 placeholder:text-gray-400 sm:leading-6 dark:border-gray-300 dark:bg-gray-800 dark:text-gray-200"
                                            required
                                            {...register('title')}
                                        />
                                    </div>
                                    <div className='border-b' />
                                    <div>
                                        <textarea
                                            placeholder='Write description here...'
                                            className="block textAreaStyle outline-none w-full px-3 py-3 h-44 placeholder:text-gray-400 sm:leading-6 dark:border-gray-300 dark:bg-gray-800 dark:text-gray-200"
                                            required
                                            {...register('description')}
                                        />
                                    </div>
                                    <div className='border-b' />
                                    <div className='mt-2'>
                                        <select
                                            className={`block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer`}
                                            {...register('status', { required: true })}
                                            defaultValue=''
                                        >
                                            <option value='' disabled>Select status</option>
                                            <option value="Todo">Todo</option>
                                            <option value="Starting soon">Starting soon</option>
                                            <option value="In progress">In progress</option>
                                            <option value="In QA">In QA</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                        {errors?.status?.type === 'required' && <small><span className='text-red-600 text-xs'>Please select status</span></small>}
                                    </div>
                                </div>


                                <div className="flex justify-end pt-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                        onClick={() => {
                                            setOpen(!open)
                                            reset()
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}