import React, { Component, Suspense } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";
const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

const App = () => {
    const menu = routes.map((route, index) => {
        return (route.component) ? (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={props => (
                    <route.component {...props} />
                )} />
        ) : (null);
    });
    return (
        <Aux>
                <ScrollToTop>
                    <Suspense fallback={<Loader />}>
                        <Switch>
                            {menu}
                            <Route path="/" component={AdminLayout} />
                        </Switch>
                    </Suspense>
                </ScrollToTop>
            </Aux>
    )
}

// class App extends Component {
//     render() {
//         console.log("Props en app", this.props);
//         const user = JSON.parse(localStorage.getItem("userInfo"));
//         const menu = routes.map((route, index) => {
//             return (route.component) ? (
//                 <Route
//                     key={index}
//                     path={route.path}
//                     exact={route.exact}
//                     name={route.name}
//                     render={props => (
//                         <route.component {...props} />
//                     )} />
//             ) : (null);
//         });
//         return (
//             <Aux>
//                 <ScrollToTop>
//                     <Suspense fallback={<Loader />}>
//                         <Switch>
//                             {/* {menu}
//                             <Route path="/" component={AdminLayout} /> */}
//                             {menu}
//                             {!(user == null) ?
//                                 (<Route path="/" component={AdminLayout} />)
//                                 :
//                                 (<Redirect to="/auth/login" />)
//                             }
//                         </Switch>
//                     </Suspense>
//                 </ScrollToTop>
//             </Aux>
//         );
//     }
// }

export default withRouter(App);
