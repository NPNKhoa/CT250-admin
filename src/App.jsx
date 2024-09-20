import { ToastContainer } from 'react-toastify';

import { Router } from './components';

import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
    </>
  );
}

export default App;
