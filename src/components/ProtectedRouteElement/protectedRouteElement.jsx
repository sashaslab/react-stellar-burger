import { useDispatch, useSelector } from "react-redux";
import { getUserState } from "../../services/selectors";
import { Navigate, useLocation } from "react-router-dom";
import { setAuthChecked } from "../../services/actions/user";
import { checkUserAuth } from "../../utils/burger-api";
import React from "react";

const ProtectedRouteElement = ({ onlyUnAuth = false, component }) => {
    const dispatch = useDispatch();
    const { user, isAuthChecked } = useSelector(getUserState);
    const location = useLocation();

    React.useEffect(() => {
        dispatch(setAuthChecked(false));
        dispatch(checkUserAuth())
    }, [dispatch])

    if (!isAuthChecked) {
        return null
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />
    }

    return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }) => (<ProtectedRouteElement onlyUnAuth={true} component={component} />);