import React, {useContext, useEffect} from "react"
import {Route, Redirect, useLocation} from "react-router-dom";
import {AuthContext} from "../context/Provider";

const ProtectedRoute = ({component: RouteComponent, ...rest}) => {
    const location = useLocation();
    const {currentUser} = useContext(AuthContext);
    useEffect(() => {
        console.log(location.pathname);
    }, [currentUser])
    return (
        <Route
            {...rest}
            render={routeProps =>
                currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (

                    <Redirect to={location.pathname.length > 4 ? '/login' : '/'}/>
                )
            }
        />
    );

};
export default ProtectedRoute;
