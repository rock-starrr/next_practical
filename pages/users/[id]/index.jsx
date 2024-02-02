import { setLoading, editUser } from '@/lib/Slices/UserSlice'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/navigation";
import { Navbar } from '@/components/Navbar/Navbar';
import Loader from '@/components/Loaders/Loader'
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import TitleComponent from '@/components/TitleComponent';

const edituser = ({ userData }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.users)
  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      createdAt: userData.createdAt,
      email: userData.email,
      id: userData.id,
      mobile: userData.mobile,
      name: userData.name
    }
  })

  useEffect(() => {
    toast.dismiss()
  }, [])

  const submitData = (inputData) => {
    dispatch(setLoading(true))
    try {
      const upDateData = axios.put(`https://657019a209586eff6640b53c.mockapi.io/Users/${inputData.id}`, inputData)
        .then(() => {
          dispatch(editUser(inputData))
          router.push(`/users`)
        })
      toast.promise(
        upDateData,
        {
          loading: 'Saving...',
          success: `Edit Successfully`,
          error: `Somthing went wrong`,
        }
      )
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <>
      <TitleComponent title={`Edit User`} />
      {isLoading && (
        <Loader />
      )}
      <Navbar />
      <div className='dark:bg-black min-h-screen'>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 font-poppins">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
              Edit User Details
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit(submitData)}>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder='Full Name'
                    className="block outline-none w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  dark:bg-gray-800 dark:ring-0 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:ring-0"
                    {...register("name", { required: true, pattern: /^[A-Za-z- ._-]+$/i })}
                  />
                </div>
                {errors?.name?.type === 'required' && <small className="text-red-500">This field is required</small>}
                {errors?.name?.type === 'pattern' && <small className="text-red-500">Alphabet Only</small>}
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    placeholder='name@company.com'
                    className="block outline-none w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-0 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:ring-0"
                    {...register("email", { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i })}
                  />
                </div>
                {errors?.email?.type === 'required' && <small className="text-red-500">This field is required</small>}
                {errors?.email?.type === 'pattern' && <small className="text-red-500">Invalid Email</small>}
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Mobile Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder='Mobile Number'
                    className="block outline-none w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-0 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:ring-0"
                    {...register("mobile", { required: true, pattern: /^[0-9]+$/i })}
                  />
                </div>
                {errors?.mobile?.type === 'required' && <small className="text-red-500">This field is required</small>}
                {errors?.mobile?.type === 'pattern' && <small className="text-red-500">Alphabet Not Allowed</small>}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save Change
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default edituser

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`https://657019a209586eff6640b53c.mockapi.io/Users/${params.id}`)
  const userData = await res.data

  return {
    props: {
      userData
    }
  }
}