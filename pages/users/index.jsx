import { useDispatch, useSelector } from "react-redux"
import Link from 'next/link';
import { deleteUserData } from "@/lib/Slices/UserSlice";
import { Navbar } from '@/components/Navbar/Navbar';
import Loader from "@/components/Loaders/Loader";
import toast from "react-hot-toast";
import TitleComponent from "@/components/TitleComponent";

const users = () => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.auth)
    const { user, isLoading: userLoad } = useSelector((state) => state.users)

    const users = user?.map((user, index) => {
        return (
            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.name}
                </th>
                <td className="px-6 py-4 max-lg:hidden">
                    {user.email}
                </td>
                <td className="px-6 py-4 max-sm:hidden">
                    {user.mobile}
                </td>
                <td className="px-6 py-4">
                    <div className="flex space-x-2 justify-normal w-full">
                        <Link
                            href={`/users/${user.id}`}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => {
                                toast.loading(`Loading Data...`)
                            }}
                        >
                            Edit
                        </Link>
                        <button
                            type='button'
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                            onClick={() => {
                                dispatch(deleteUserData(user.id))
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </td>
            </tr>
        )
    })

    return (
        <>
            <TitleComponent title={`Users`} />
            {(isLoading || userLoad) && (
                <Loader />
            )}
            <Navbar />
            <div className="dark:bg-black">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-8">
                    <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3 max-lg:hidden">
                                    Email ID
                                </th>
                                <th scope="col" className="px-6 py-3 max-sm:hidden">
                                    Contect No.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default users
