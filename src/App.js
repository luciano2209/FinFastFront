import TablaListaPersonas from './components/TablaListaPersonas'
import { ToastContainer } from 'react-toastify'

function App() {
  return (    
    <>
    <TablaListaPersonas />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    </>
  );
}

export default App;
