import { SyncLoader } from "react-spinners"

const Loader = () => {
    return (
        <div className='fixed bg-white h-screen w-screen z-50 dark:bg-black'>
            <div className='flex fixed justify-center w-screen items-center h-screen z-50 dark:hidden'>
                <SyncLoader color="#000000" />
            </div>
            <div className='hidden fixed justify-center w-screen items-center h-screen z-50 dark:flex'>
                <SyncLoader color="#E5E7EB" />
            </div>
        </div>
    )
}

export default Loader
