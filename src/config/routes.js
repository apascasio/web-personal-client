import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic';

import AdminHome from '../pages/Admin';
import AdminSigIn from '../pages/Admin/SignIn/Signin';
import AdminUser from '../pages/Admin/Users';

import Home from '../pages/Home';
import Contact from '../pages/Contact';

import Error404 from '../pages/Error404';

const routes = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact:false,
        routes: [
            {
                path:"/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/login",
                component: AdminSigIn,
                exact: true
            },
            { 
                path: "/admin/users",
                component: AdminUser,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path:"/",
        component: LayoutBasic,
        exact: false,
        routes:[
            {
                path: "/",
                component: Home,
                exact: true
            },
            {
                path:"/contact",
                component: Contact,
                exact: true
            },
            {
                component: Error404
            }
        ]
    }
];


export default routes;


