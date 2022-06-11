import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MerchantHome from './EmployeeHome';
import MerchantLogin from './EmployeeLogin';
import Logout from './Logout';

const Router = () => {
  return (
    <Routes>
      <Route >
        <Route path="/employee/login" element={<MerchantLogin/>}/>
        <Route path="/employee/dashboard" element={<MerchantHome/>}/>
        <Route path='/logout' element={<Logout/>}/>
      </Route>
    </Routes>
  );
};
export default Router;