import { Container } from '@mui/material'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store } from './store/store'
import router from './routes'

function App() {
  let persistor = persistStore(store);

  return (
    <Container maxWidth="xl">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <div className="">
            <RouterProvider router={router} />
          </div>
        </PersistGate>
          {/* <ToastContainer autoClose={5000} position="top-right" closeOnClick/> */}
      </Provider>
    </Container>
  )
}

export default App
