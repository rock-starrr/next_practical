import { SyncLoader } from "react-spinners"

const LoaderBgBlur = () => {
    return (
        <div className='fixed h-screen w-screen bg-[#f6f6f680] backdrop-blur-sm z-50 dark:bg-[#00000060]'>
            <div className='flex justify-center items-center h-screen z-50 dark:hidden'>
                <SyncLoader color="#000000" />
            </div>
            <div className='hidden justify-center items-center h-screen z-50 dark:flex'>
                <SyncLoader color="#E5E7EB" />
            </div>
        </div>
    )
}

export default LoaderBgBlur
