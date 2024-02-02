import { useEffect } from 'react'
import { initialData } from './Slices/AuthSlice'
import { useDispatch } from 'react-redux'
import { getUsers } from "@/lib/Slices/UserSlice";

export const GetInitialData = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    dispatch(initialData())
    dispatch(getUsers())
  }

}