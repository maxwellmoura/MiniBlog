import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';

//Hooks!
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

//Contexto!
import { AuthProvider } from './contexts/AuthContext';

//Pages!
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Post from './pages/Post/Post';

//Componentes!
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import EditPost from './pages/EditPost/EditPost';
import Search from './pages/Search/Search';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  //monitoramento do Authetication
  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()
  const loadingUser = user === undefined
  //checagem do uso do usuario
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])
  //Loading da pagina
  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
              {/* Rotas Publicas */}
              <Route path='/' element={<Home />} />
              <Route path='/About' element={<About />} />
              <Route path='/Dashboard' element={<Dashboard />} />
              <Route path='/Search' element={<Search />} />
              <Route path='/Posts/:id' element={<Post />} />
              {/* Fim das rotas publicas */}
              {/* Bloqueio de paginas autenticadas com if ternario */}
              <Route path='/posts/edit/:id'
              element={user ? <EditPost /> : <Navigate to='/login' />} />
              <Route path='/login' 
              element={!user ? <Login /> : <Navigate to='/' />} />
              <Route path='/register' 
              element={!user ? <Register /> : <Navigate to='/' />} />
              {/*Paginas autenticadas com if ternario */}
              <Route path='/posts/create' 
              element={user ? <CreatePost /> : <Navigate to='/login' />} />
              {/* <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/login' />} /> */}
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
