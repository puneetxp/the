import { Accessor, Component, createMemo } from 'solid-js';
import { Router, Routes, Route, Navigate } from './router/src';
import Public_Layout from './shared/component/layout/public';
import Login_Page from './_public/login';
import HomePage from './_public/home';
import RegisterPage from './_public/register';
import { LoginService } from './shared/Service/Login';
import Admin_Layout from './shared/component/layout/admin';
import ProductAdminPage from './_admin/product';
import { notLogin, isLogin } from './shared/guard/all';
import ProductPublicPage from './_public/product';
import CategoryAdminPage from './_admin/category';
import { AdminDashboard } from './_admin/dashboard';
import CategoryPublicPage from './_public/category';
import UserAdminPage from './_admin/user';

LoginService.check();

const App: Component = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path={'/'} component={Public_Layout}>
            <Route path={''} component={HomePage} />
            <Route path={'product'} component={ProductPublicPage} />
            <Route path={'category'} component={CategoryPublicPage} />
            <Route path={'login'} guard={notLogin} component={Login_Page} />
            <Route path={'register'} guard={notLogin} component={RegisterPage} />
          </Route>
          <Route guard={isLogin} path='admin/' component={Admin_Layout}>
            <Route path={''} component={AdminDashboard} />
            <Route path={'product'} component={ProductAdminPage} />
            <Route path={'category'} component={CategoryAdminPage} />
            <Route path={'user'} component={UserAdminPage} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
