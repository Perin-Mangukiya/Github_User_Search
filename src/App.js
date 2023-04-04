import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <Routes>
        
          <Route element={<PrivateRoute/>}>
            <Route element={<Dashboard/>} path='/' exact></Route>
          </Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='*' element={<Error/>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;
