import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { logOut, setLoading } from '@/lib/Slices/AuthSlice'
import { Navbar } from "@/components/Navbar/Navbar";
import Loader from "@/components/Loaders/Loader";
import { useRouter } from "next/navigation";
import TitleComponent from "@/components/TitleComponent";

const Profile = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { user, isLoading } = useSelector((state) => state.auth)

    return (
        <div className="dark:bg-black min-h-screen">
            <TitleComponent title={`Profile`} />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Navbar />
                    <div>
                        <div className="p-8">
                            <h1 className="flex justify-center font-bold text-2xl text-blue-800 underline dark:text-blue-500">
                                Profile
                            </h1>
                            <div className="bg-whit p-5 shadow-md rounded-md bg-gray-50 mt-5 dark:bg-gray-900">
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 dark:text-gray-50">
                                    <span clas="text-green-500">
                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </span>
                                    <span className="tracking-wide">About</span>
                                </div>
                                <div className="mt-3">
                                    <div className="grid sm:grid-cols-2 text-sm gap-1 dark:text-gray-100">
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">First Name</div>
                                            <div className="px-4 py-2 bg-gray-200 rounded-md truncate dark:bg-gray-700">{user?.fname}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Last Name</div>
                                            <div className="px-4 py-2 bg-gray-200 rounded-md truncate dark:bg-gray-700">{user?.lname}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Email ID</div>
                                            <div className="px-4 py-2 bg-gray-200 rounded-md dark:bg-gray-700 truncate">
                                                <Link className="text-blue-800 dark:text-blue-500" href={`mailto:${user?.email}`}>{user?.email}</Link>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Contact No.</div>
                                            <div className="px-4 py-2 bg-gray-200 rounded-md truncate dark:bg-gray-700">{user?.mobile}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-end mr-5 mt-3'>
                                    <button
                                        type='button'
                                        className="block mb-0 bg-transparent text-red-800 text-sm font-semibold rounded-lg hover:bg-red-800 hover:text-white focus:outline-none focus:shadow-outline focus:bg-red-800 focus:text-white hover:shadow-xs p-3 my-4 border border-red-800 hover:border-transparent dark:hover:bg-red-600 dark:border-red-600 dark:text-red-600 dark:focus:bg-red-600 dark:focus:text-gray-100 dark:hover:text-gray-100"
                                        onClick={() => {
                                            dispatch(setLoading(true))
                                            dispatch(logOut())
                                            router.push(`/`)
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </div>
    )
}

export default Profile