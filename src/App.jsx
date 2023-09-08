import { Route, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './components/Tasks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
          <Route path='/tasks' element={<PrivateRoute><Tasks/></PrivateRoute>}/>
          <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
        </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
