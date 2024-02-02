import { GetInitialData } from '@/lib/GetInitialData';
import { store } from '@/lib/store'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }) {
  return (
    <div className='font-poppins'>
      <Provider store={store}>
        <GetInitialData />
        <Component {...pageProps} />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              borderRadius: '10px',
              border: '#EDF2F7 1px solid',
              background: '#000000',
              color: '#ffffff',
            },
          }}
        />
      </Provider>
    </div>
  )
}