import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router';
import { Slide, ToastContainer } from 'react-toastify'
import { UserContext } from './contexts/UserContext';
import ApiHandler from './api'
import AuthLayout from './components/layouts/AuthLayout'
import UnauthLayout from './components/layouts/UnauthLayout'
import ProtectedRoute from './components/base/ProtectedRoute.tsx';
import LoginView from './components/views/login/LoginView.tsx';
import DashboardView from './components/views/dashboard/DashboardView.tsx';
import LanguageList from './components/views/languages/LanguageList.tsx';
import LanguageView from './components/views/languages/LanguageView.tsx';
import LanguageEdit from './components/views/languages/LanguageEdit.tsx';
import LanguageNew from './components/views/languages/LanguageNew.tsx';
import HeaderList from './components/views/headers/HeaderList.tsx';
import HeaderNew from './components/views/headers/HeaderNew.tsx';
import HeaderView from './components/views/headers/HeaderView.tsx';
import HeaderEdit from './components/views/headers/HeaderEdit.tsx';
import './App.css'


function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    ApiHandler.get('/get_current_user').then(async (response) => {
      if (response.ok) {
        setUser(await response.json())
        navigate('/')
      }
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <>
      <Routes>
        <Route element={<UserContext value={user}><AuthLayout loading={loading} /></UserContext>}>
          <Route path='/' element={<ProtectedRoute><DashboardView /></ProtectedRoute>} />
          <Route path='/languages' element={<ProtectedRoute><LanguageList /></ProtectedRoute>} />
          <Route path='/languages/new' element={<ProtectedRoute><LanguageNew /></ProtectedRoute>} />
          <Route path='/languages/:language_id/view' element={<ProtectedRoute><LanguageView /></ProtectedRoute>} />
          <Route path='/languages/:language_id/edit' element={<ProtectedRoute><LanguageEdit /></ProtectedRoute>} />
          <Route path='/headers' element={<ProtectedRoute><HeaderList /></ProtectedRoute>} />
          <Route path='/headers/new' element={<ProtectedRoute><HeaderNew /></ProtectedRoute>} />
          <Route path='/headers/:header_id/view' element={<ProtectedRoute><HeaderView /></ProtectedRoute>} />
          <Route path='/headers/:header_id/edit' element={<ProtectedRoute><HeaderEdit /></ProtectedRoute>} />
        </Route>
        <Route element={<UnauthLayout loading={loading} />}>
          <Route path='/login' element={<LoginView />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </>
  )
}

export default App
