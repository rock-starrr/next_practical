import Link from 'next/link'
import { useSelector } from 'react-redux'
import { BsFillPersonLinesFill } from "react-icons/bs";
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';

export const Navbar = () => {
    const [collapse, setCollapse] = useState(false)
    const router = useRouter()
    const { isAuth, isLoading, role } = useSelector((state) => state.auth)
    const pathName = usePathname()

    const toggleCollapse = () => {
        setCollapse(!collapse)
    }

    return (
        <>
            {isAuth && role === 'admin' ? (
                <>
                    <nav className="bg-white/5 backdrop-blur-md select-none md:pl-8 md:pr-8 dark:bg-gray-900 sticky w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse max-lg:ml-4">
                                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-gray-200">Logo</span>
                            </Link>

                            <div className="flex md:order-2 space-x-1 items-center md:space-x-0 rtl:space-x-reverse">
                                {!isLoading && (
                                    <>
                                        <Link href={`/profile`} className='text-lg h-full max-md:mr-3 dark:text-gray-200'>
                                            <BsFillPersonLinesFill />
                                        </Link>
                                    </>
                                )}
                                <button type="button" onClick={toggleCollapse} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
                                    <span className="sr-only">Open main menu</span>
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                    </svg>
                                </button>
                            </div>
                            <div className={`items-center justify-between max-md:hidden duration-1000 w-full md:flex md:w-auto md:order-1`}>
                                <ul className="flex flex-col p-4 md:p-0 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-900 md:dark:bg-gray-900 dark:border-gray-700">
                                    <li>
                                        <Link href={`/`} className={`${pathName === '/' ? `md:text-blue-700 md:dark:text-blue-500` : `md:text-black md:dark:text-gray-200`}block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 md:p-0  dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/users`} className={`${pathName === '/users' ? `md:text-blue-700 md:dark:text-blue-500` : `md:text-black md:dark:text-gray-200`}block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 md:p-0  dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                            Users
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/todo`} className={`${pathName === '/todo' ? `md:text-blue-700 md:dark:text-blue-500` : `md:text-black md:dark:text-gray-200`}block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 md:p-0  dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                            Todo
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={`items-center justify-between ${!collapse && `hidden`} md:hidden z-40 p-4 duration-1000 fixed w-full md:w-auto md:order-1`}>
                            <ul className="flex flex-col p-4 md:p-0 bg-white/5 backdrop-blur-lg font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-900 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <Link href={`/`} className={`${pathName === '/' ? `bg-gray-100 dark:bg-gray-700` : `bg-transparent`} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/users`} className={`${pathName === '/users' ? `bg-gray-100 dark:bg-gray-700` : `bg-transparent`} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                        Users
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/todo`} className={`${pathName === '/todo' ? `bg-gray-100 dark:bg-gray-700` : `bg-transparent`} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                        Todo
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </>
            ) : (
                <>
                    <nav className="bg-white/20 backdrop-blur-md md:pl-8 md:pr-8 dark:bg-gray-900 sticky w-full select-none z-20 top-0 start-0 border-b border-gray-200/100 dark:border-gray-600">
                        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Logo</span>
                            </Link>
                            <div className="flex md:order-2 space-x-3 items-center md:space-x-0 rtl:space-x-reverse">
                                {pathName !== '/login' && pathName !== '/register' &&
                                    <>
                                        {!isLoading && (
                                            <div className='max-md:mr-2'>
                                                {!isAuth ? (
                                                    <div className='h-full flex items-center'>
                                                        <button
                                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                            onClick={() => {
                                                                router.push(`/login`)
                                                            }}
                                                        >
                                                            Login
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Link href={`/profile`} className='text-lg dark:text-gray-200'>
                                                            <BsFillPersonLinesFill />
                                                        </Link>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </>
                                }
                                <button onClick={toggleCollapse} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
                                    <span className="sr-only">Open main menu</span>
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                    </svg>
                                </button>
                            </div>
                            <div className={`items-center justify-between bg-transparent max-md:hidden w-full md:flex md:w-auto md:order-1`}>
                                <ul className="flex flex-col p-4 md:p-0 font-medium border border-gray-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  md:dark:bg-gray-900 dark:border-gray-700">
                                    <li>
                                        <Link href={`/`} className={`${pathName === '/' ? `md:text-blue-700 md:dark:text-blue-500` : `md:text-black md:dark:text-gray-200`} block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 md:p-0 dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/about`} className={`${pathName === '/about' ? `md:text-blue-700 md:dark:text-blue-500` : `md:text-black md:dark:text-gray-200`} block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/services`} className={`${pathName === '/services' ? `md:text-blue-700 md:dark:text-blue-500` : `md:text-black md:dark:text-gray-200`} block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                            Services
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/contact`} className={`${pathName === '/contact' ? `md:text-blue-700 md:dark:text-blue-500` : `md:text-black md:dark:text-gray-200`} block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                            Contact
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/todo`} className={`${pathName === '/todo' ? `md:text-blue-700 md:dark:text-blue-500` : `md:text-black md:dark:text-gray-200`} block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                            Todo
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={`items-center justify-between ${!collapse && `hidden`} z-50 p-4 absolute w-full md:hidden md:w-auto md:order-1`}>
                            <ul className="flex flex-col p-4 md:p-0 font-medium border bg-gray-200 border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-900 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <Link href={`/`} className={`${pathName === '/' ? `bg-gray-100 dark:bg-gray-700` : `bg-transparent`} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/about`} className={`${pathName === '/about' ? `bg-gray-100 dark:bg-gray-700` : `bg-transparent`} block py-2 px-3 text-gray-900 rounded bg-gray-100 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/services`} className={`${pathName === '/services' ? `bg-gray-100 dark:bg-gray-700` : `bg-transparent`} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                        Services
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/contact`} className={`${pathName === '/contact' ? `bg-gray-100 dark:bg-gray-700` : `bg-transparent`} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/todo`} className={`${pathName === '/todo' ? `bg-gray-100 dark:bg-gray-700` : `bg-transparent`} block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>
                                        Todo
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </>
            )}
        </>
    )
}