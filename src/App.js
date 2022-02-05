import React from 'react';
import ExportFormModal from './components/ExportFormModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="d-flex align-items-center justify-content-center my-5">
       <ExportFormModal />
       <ToastContainer />
    </div>
  );
}

export default App;
