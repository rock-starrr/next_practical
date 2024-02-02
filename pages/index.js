import { HomePageSlider } from "@/components/ImageSliders/HomePageSlider";
import Loader from "@/components/Loaders/Loader";
import { Navbar } from "@/components/Navbar/Navbar";
import TitleComponent from "@/components/TitleComponent";
import { useSelector } from "react-redux"

function Home() {
  const { isLoading, role } = useSelector((state) => state.auth)

  return (
    <div className="dark:bg-black dark:text-gray-200 min-h-screen">
      {isLoading && (
        <Loader />
      )}
      <Navbar />
      {role === 'admin' ? (
        <div className="flex justify-center">
          <TitleComponent title={`Admin Dashboard`} />
          <h1 className="font-bold text-2xl">
            Admin Dashboard
          </h1>
        </div>
      ) : (
        <div className='md:pl-6 md:pr-6'>
          <TitleComponent title={`Home`} />
          <HomePageSlider />
        </div>
      )}
    </div>
  )

}

export default Home