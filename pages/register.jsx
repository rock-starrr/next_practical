import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, setLoading } from '@/lib/Slices/AuthSlice'
import { Navbar } from '@/components/Navbar/Navbar';
import LoaderBgBlur from '@/components/Loaders/LoaderBgBlur'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { BiSolidErrorCircle } from "react-icons/bi"
import TitleComponent from '@/components/TitleComponent'

const Register = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { register, formState: { errors }, handleSubmit, getValues, setFocus } = useForm()
    const { isLoading } = useSelector((state) => state.auth)
    const [showPassword, setShowPassword] = useState(false)
    const [showcPassword, setShowcPassword] = useState(false)
    const [emailErr, setEmailErr] = useState(false)
    const [mobileErr, setMobileErr] = useState(false)

    const submitData = async (inputData) => {
        const { 'cpassword': removedField, ...data } = inputData;
        const userDetails = { ...data, role: 'user' }
        if (!emailErr && !mobileErr) {
            dispatch(setLoading(true))
            try {
                const res = await axios.get(`https://657019a209586eff6640b53c.mockapi.io/Register`)
                const checkEmail = res.data.filter((data) => inputData.email === data.email)
                const checkMobile = res.data.filter((data) => inputData.mobile === data.mobile)
                if (checkEmail.length !== 0) {
                    setFocus("email")
                    setEmailErr(true)
                    if (checkMobile.length !== 0) {
                        setMobileErr(true)
                    }
                } else if (checkMobile.length !== 0) {
                    setFocus("mobile")
                    setMobileErr(true)
                } else {
                    try {
                        const res = await axios.post(`https://657019a209586eff6640b53c.mockapi.io/Register`, userDetails)
                        dispatch(logIn(res.data))
                        router.push(`/`)
                        toast.success(`Register Successfully`)
                    } catch (errors) {
                        throw errors.massage
                    }
                }
            } catch (errors) {
                throw errors.massage
            } finally {
                dispatch(setLoading(false))
            }
        } else {
            if (emailErr) {
                setFocus('email')
            } else {
                setFocus('password')
            }
        }


    }

    return (
        <>
            <TitleComponent title={`Register`} />
            {isLoading && (
                <LoaderBgBlur />
            )}
            <Navbar />
            <div className='dark:bg-black min-h-screen select-none'>
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Logo" />
                        <h2 className="mt-7 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
                            Create account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit(submitData)}>

                            <div className="relative z-0 w-full focus:peer-target: group">
                                <input
                                    type="text"
                                    className={`block pt-2.5 ${errors?.fname !== undefined && `pr-7`} px-0 pb-2 ${errors?.fname !== undefined ? `border-red-500` : `border-gray-500 dark:border-gray-600 dark:focus:border-indigo-500 focus:border-indigo-600`} w-full bg-transparent placeholder-transparent border-b-2 appearance-none dark:text-white sm:text-sm focus:outline-none focus:ring-0 peer`}
                                    placeholder=" "
                                    {...register('fname', { required: true, pattern: /^[A-Za-z_'.-]+$/i })}
                                    autoComplete='off'
                                />
                                <label
                                    className={`${errors?.fname !== undefined ? `text-red-500` : `text-gray-500 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 dark:text-gray-300`} font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                >
                                    First Name
                                </label>

                                <div
                                    className={`${errors?.fname !== undefined && `opacity-100`} opacity-0 duration-300 text-red-500 absolute right-0 top-1.5 p-1.5 peer`}
                                    onClick={() => setFocus('fname')}
                                >
                                    <BiSolidErrorCircle />
                                </div>
                                {errors?.fname?.type === 'required' &&
                                    <div
                                        className="absolute  z-10 md:peer-hover:opacity-100 max-md:peer-focus:opacity-100 duration-500 opacity-0 top-2 md:-right-[143px] max-md:right-7 max-md:top-2 px-2 py-1 text-xs font-medium text-red-500 rounded-lg bg-red-100 dark:bg-red-500/30"
                                        onClick={() => setFocus('fname')}
                                    >
                                        This field is required
                                    </div>
                                }
                                {errors?.fname?.type === 'pattern' &&
                                    <div
                                        className="absolute  z-10 md:peer-hover:opacity-100 max-md:peer-focus:opacity-100 duration-500 opacity-0 top-2 md:-right-[131px] max-md:right-7 max-md:top-2 px-2 py-1 text-xs font-medium text-red-500 rounded-lg bg-red-100 dark:bg-red-500/30"
                                        onClick={() => setFocus('fname')}
                                    >
                                        Invalid First Name
                                    </div>
                                }
                            </div>

                            <div className="relative z-0 w-full focus:peer-target: group">
                                <input
                                    type="text"
                                    className={`block pt-2.5 ${errors?.lname !== undefined && `pr-7`} px-0 pb-2 ${errors?.lname !== undefined ? `border-red-500` : `border-gray-500 dark:border-gray-600 dark:focus:border-indigo-500 focus:border-indigo-600`} w-full bg-transparent placeholder-transparent border-b-2 appearance-none dark:text-white sm:text-sm focus:outline-none focus:ring-0 peer`}
                                    placeholder=" "
                                    {...register('lname', { required: true, pattern: /^[A-Za-z_'.-]+$/i })}
                                    autoComplete='off'
                                />
                                <label
                                    className={`${errors?.lname !== undefined ? `text-red-500` : `text-gray-500 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 dark:text-gray-300`} font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                >
                                    Last Name
                                </label>
                                <div
                                    className={`${errors?.lname !== undefined && `opacity-100`} opacity-0 duration-300 text-red-500 absolute right-0 top-1.5 p-1.5 peer`}
                                    onClick={() => setFocus('lname')}
                                >
                                    <BiSolidErrorCircle />
                                </div>
                                {errors?.lname?.type === 'required' &&
                                    <div
                                        className="absolute  z-10 md:peer-hover:opacity-100 max-md:peer-focus:opacity-100 duration-500 opacity-0 top-2 md:-right-[143px] max-md:right-7 max-md:top-2 px-2 py-1 text-xs font-medium text-red-500 rounded-lg bg-red-100 dark:bg-red-500/30"
                                        onClick={() => setFocus('lname')}
                                    >
                                        This field is required
                                    </div>
                                }
                                {errors?.lname?.type === 'pattern' &&
                                    <div
                                        className="absolute  z-10 md:peer-hover:opacity-100 max-md:peer-focus:opacity-100 duration-500 opacity-0 top-2 md:-right-[130px] max-md:right-7 max-md:top-2 px-2 py-1 text-xs font-medium text-red-500 rounded-lg bg-red-100 dark:bg-red-500/30"
                                        onClick={() => setFocus('lname')}
                                    >
                                        Invalid Last Name
                                    </div>
                                }
                            </div>

                            <div className="relative z-0 w-full focus:peer-target: group">
                                <input
                                    type="email"
                                    className={`block pt-2.5 ${(errors?.email !== undefined || emailErr) && `pr-7`} px-0 pb-2 ${errors?.email !== undefined || emailErr ? `border-red-500` : `border-gray-500 dark:border-gray-600 dark:focus:border-indigo-500 focus:border-indigo-600`} w-full bg-transparent placeholder-transparent border-b-2 appearance-none dark:text-white sm:text-sm focus:outline-none focus:ring-0 peer`}
                                    placeholder=" "
                                    {...register('email', { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i })}
                                    autoComplete='off'
                                    onChangeCapture={() => setEmailErr(false)}
                                />
                                <label
                                    className={`${errors?.email !== undefined || emailErr ? `text-red-500` : `text-gray-500 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 dark:text-gray-300`} font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                >
                                    Email address
                                </label>

                                <div
                                    className={`${(errors?.email !== undefined || emailErr) && `opacity-100`} opacity-0 duration-300 text-red-500 absolute right-0 top-1.5 p-1.5 peer`}
                                    onClick={() => setFocus('email')}
                                >
                                    <BiSolidErrorCircle />
                                </div>
                                <div
                                    className={`absolute ${emailErr && `opacity-100`}  text-xs opacity-0 z-10 duration-500 top-2 md:-right-[150px] max-md:right-7 max-md:top-2 px-2 py-1 font-medium text-red-500 rounded-lg bg-red-100 dark:bg-red-500/30`}
                                    onClick={() => setFocus('email')}
                                >
                                    Email Id Already Exist
                                </div>
                                {errors?.email?.type === 'required' &&
                                    <div
                                        className="absolute  z-10 md:peer-hover:opacity-100 max-md:peer-focus:opacity-100 duration-500 opacity-0 top-2 md:-right-[143px] max-md:right-7 max-md:top-2 px-2 py-1 text-xs font-medium text-red-500 rounded-lg bg-red-100 dark:bg-red-500/30"
                                        onClick={() => setFocus('email')}
                                    >
                                        This field is required
                                    </div>
                                }
                                {errors?.email?.type === 'pattern' &&
                                    <div
                                        className="absolute  z-10 md:peer-hover:opacity-100 max-md:peer-focus:opacity-100 duration-500 opacity-0 top-2 md:-right-[114px] max-md:right-7 max-md:top-2 px-2 py-1 text-xs font-medium text-red-500 rounded-lg bg-red-100 dark:bg-red-500/30"
                                        onClick={() => setFocus('email')}
                                    >
                                        Invalid Email Id
                                    </div>
                                }
                            </div>

                            <div className="relative z-0 w-full focus:peer-target: group">
                                <input
                                    type="text"
                                    className={`block pt-2.5 ${(errors?.mobile !== undefined || mobileErr) && `pr-7`} px-0 pb-2 ${errors?.mobile !== undefined || mobileErr ? `border-red-500` : `border-gray-500 dark:border-gray-600 dark:focus:border-indigo-500 focus:border-indigo-600`} w-full bg-transparent placeholder-transparent border-b-2 appearance-none dark:text-white sm:text-sm focus:outline-none focus:ring-0 peer`}
                                    placeholder=" "
                                    {...register('mobile', { required: true, pattern: /^[6-9]\d{9}$/ })}
                                    autoComplete='off'
                                    onChangeCapture={() => setMobileErr(false)}
                                />
                                <label
                                    className={`${errors?.mobile !== undefined || mobileErr ? `text-red-500` : `text-gray-500 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 dark:text-gray-300`} font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                >
                                    Mobile Number
                                </label>

                                <div
                                    className={`${(errors?.mobile !== undefined || mobileErr) && `opacity-100`} opacity-0 duration-300 text-red-500 absolute right-0 top-1.5 p-1.5 peer`}
                                    onClick={() => setFocus('mobile')}
                                >
                                    <BiSolidErrorCircle />
                                </div>
                                <div
                                    className={`absolute ${mobileErr && `opacity-100`}  text-xs opacity-0 z-10 duration-500 top-2 md:-right-[194px] max-md:right-7 max-md:top-2 px-2 py-1 font-medium text-red-500 rounded-lg bg-red-100 dark:bg-red-500/30`}
                                    onClick={() => mobileErr && setFocus('mobile')}
                                >
                                    Mobile Number Already Exist
                                </div>

                                {errors?.mobile?.type === 'required' &&
                                    <div
                                        className="absolute  z-10 md:peer-hover:opacity-100 max-md:peer-focus:opacity-100 duration-500 opacity-0 top-2 md:-right-[143px] max-md:right-7 max-md:top-2 px-2 py-1 text-xs font-medium text-red-500 rounded-lg bg-red-100 dark:bg-red-500/30"
                                        onClick={() => setFocus('mobile')}
                                    >
                                        This field is required
                                    </div>
                                }
                                {errors?.mobile?.type === 'pattern' &&
                                    <div
                                        className="absolute  z-10 md:peer-hover:opacity-100 max-md:peer-focus:opacity-100 duration-500 opacity-0 top-2 md:-right-[158px] max-md:right-7 max-md:top-2 px-2 py-1 text-xs font-medium text-red-500 rounded-lg bg-red-100 dark:bg-red-500/30"
                                        onClick={() => setFocus('mobile')}
                                    >
                                        Invalid Mobile Number
                                    </div>
                                }
                            </div>


                            <div className="relative z-0 w-full group">
                                <div className='relative'>
                                    <input
                                        className={`block pt-2.5 ${errors?.password !== undefined ? `pr-16` : `pr-9`} pr-16 px-0 pb-1 ${errors?.password !== undefined ? `border-red-500` : `border-gray-500 dark:border-gray-600 dark:focus:border-indigo-500 focus:border-indigo-600`} w-full bg-transparent placeholder-transparent border-b-2 appearance-none dark:text-white focus:outline-none focus:ring-0 peer`}
                                        placeholder=" "
                                        {...register('password', { required: true, pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ })}
                                        type={showPassword ? 'text' : 'password'}
                                    />
                                    <div
                                        className="h-full absolute inset-y-0 right-0 pr-3 pl-2 flex items-center text-sm cursor-pointer dark:text-gray-200"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg width="17" height="17" viewBox="0 0 16 16" className="bi bi-eye-slash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829z" />
                                                <path fillRule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z" />
                                            </svg>
                                        ) : (
                                            <svg height="17" viewBox="0 0 56 56" width="17" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                                <path d="m28.0103 46.4025c16.5459 0 27.9897-13.3855 27.9897-17.5582 0-4.1932-11.4646-17.558-27.9897-17.558-16.422 0-28.0103 13.3648-28.0103 17.558 0 4.1727 11.671 17.5582 28.0103 17.5582zm0-6.0524c-6.4448 0-11.5263-5.2261-11.5677-11.5058-.0206-6.4448 5.1229-11.5056 11.5677-11.5056 6.4036 0 11.5471 5.0608 11.5471 11.5056 0 6.2797-5.1435 11.5058-11.5471 11.5058zm0-7.3538c2.2929 0 4.1933-1.8797 4.1933-4.152 0-2.2928-1.9004-4.1726-4.1933-4.1726-2.3135 0-4.2139 1.8798-4.2139 4.1726 0 2.2723 1.9004 4.152 4.2139 4.152z" />
                                            </svg>
                                        )}
                                    </div>
                                    <label
                                        className={`${errors?.password !== undefined ? `text-red-500` : `text-gray-500 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 dark:text-gray-300`} font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                    >
                                        Password
                                    </label>
                                    <div
                                        className={`${errors?.password !== undefined && `opacity-100`} opacity-0 duration-300 text-red-500 absolute right-9 top-1.5 p-1.5 peer`}
                                        onClick={() => setFocus('password')}
                                    >
                                        <BiSolidErrorCircle />
                                    </div>
                                    {errors?.password?.type === 'required' &&
                                        <div
                                            className="absolute  z-10 md:peer-hover:opacity-100 max-md:peer-focus:opacity-100 duration-500 opacity-0 top-2 md:-right-[143px] max-md:right-16 max-md:top-2 px-2 py-1 text-xs font-medium text-red-500 rounded-lg bg-red-100 dark:bg-red-500/30"
                                            onClick={() => setFocus('password')}
                                        >
                                            This field is required
                                        </div>
                                    }
                                    {errors?.password?.type === 'pattern' &&
                                        <div
                                            className="absolute  z-10 md:peer-hover:opacity-100 max-md:peer-focus:opacity-100 duration-500 opacity-0 md:-top-1 md:-right-[291px] max-md:left-0 max-md:-bottom-11 px-2 py-1 text-xs font-medium text-red-500 rounded-lg bg-red-100 dark:bg-red-500/30"
                                            onClick={() => setFocus('password')}
                                        >
                                            <span className='block'>
                                                1 number, 1 uppercase and 1 lowercase letter
                                            </span>
                                            <span>
                                                and at least 8 or more characters
                                            </span>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="relative z-0 w-full group">
                                <div className='relative'>
                                    <input
                                        className={`block pt-2.5 px-0 ${errors?.cpassword !== undefined ? `pr-16` : `pr-9`} pb-1 ${errors?.cpassword !== undefined ? `border-red-500` : `border-gray-500 dark:border-gray-600 dark:focus:border-indigo-500 focus:border-indigo-600`} w-full bg-transparent placeholder-transparent border-b-2 appearance-none dark:text-white focus:outline-none focus:ring-0 peer`}
                                        placeholder=" "
                                        {...register('cpassword', { required: true, pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ })}
                                        type={showcPassword ? 'text' : 'password'}
                                    />
                                    <div
                                        className="h-full absolute inset-y-0 right-0 pr-3 pl-2 flex items-center text-sm cursor-pointer dark:text-gray-200"
                                        onClick={() => setShowcPassword(!showcPassword)}
                                    >
                                        {showcPassword ? (
                                            <svg width="17" height="17" viewBox="0 0 16 16" className="bi bi-eye-slash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829z" />
                                                <path fillRule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z" />
                                            </svg>
                                        ) : (
                                            <svg height="17" viewBox="0 0 56 56" width="17" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                                <path d="m28.0103 46.4025c16.5459 0 27.9897-13.3855 27.9897-17.5582 0-4.1932-11.4646-17.558-27.9897-17.558-16.422 0-28.0103 13.3648-28.0103 17.558 0 4.1727 11.671 17.5582 28.0103 17.5582zm0-6.0524c-6.4448 0-11.5263-5.2261-11.5677-11.5058-.0206-6.4448 5.1229-11.5056 11.5677-11.5056 6.4036 0 11.5471 5.0608 11.5471 11.5056 0 6.2797-5.1435 11.5058-11.5471 11.5058zm0-7.3538c2.2929 0 4.1933-1.8797 4.1933-4.152 0-2.2928-1.9004-4.1726-4.1933-4.1726-2.3135 0-4.2139 1.8798-4.2139 4.1726 0 2.2723 1.9004 4.152 4.2139 4.152z" />
                                            </svg>
                                        )}
                                    </div>
                                    <label
                                        className={`${errors?.cpassword !== undefined ? `text-red-500` : `text-gray-500 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 dark:text-gray-300`} font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                    >
                                        Confirm Password
                                    </label>
                                    <div
                                        className={`${errors?.cpassword !== undefined && `opacity-100`} opacity-0 duration-300 text-red-500 absolute right-9 top-1.5 p-1.5 peer`}
                                        onClick={() => setFocus('cpassword')}
                                    >
                                        <BiSolidErrorCircle />
                                    </div>
                                    {errors?.cpassword?.type === 'required' &&
                                        <div
                                            className="absolute  z-10 md:peer-hover:opacity-100 max-md:peer-focus:opacity-100 duration-500 opacity-0 top-2 md:-right-[143px] max-md:right-16 max-md:top-2 px-2 py-1 text-xs font-medium text-red-500 rounded-lg bg-red-100 dark:bg-red-500/30"
                                            onClick={() => setFocus('cpassword')}
                                        >
                                            This field is required
                                        </div>
                                    }
                                    {errors?.cpassword?.type === 'pattern' &&
                                        <div
                                            className="absolute  z-10 md:peer-hover:opacity-100 max-md:peer-focus:opacity-100 duration-500 opacity-0 md:top-2 md:-right-[287px] max-md:left-0 max-md:-bottom-7 px-2 py-1 text-xs font-medium text-red-500 rounded-lg bg-red-100 dark:bg-red-500/30"
                                            onClick={() => setFocus('cpassword')}
                                        >
                                            Password and confirm password not match
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className='pt-2'>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Register
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already have an account?
                            <Link
                                href={`/login`}
                                className="font-semibold ml-1 leading-6 text-indigo-600 hover:text-indigo-500"
                            >
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register