import { useAppSelector } from '../../utils/types';
import { getUserState } from "../../services/selectors";
import { Navigate, useLocation } from "react-router-dom";
import { FC, ReactElement } from "react";

interface IProtectedRoute {
    onlyUnAuth?: boolean;
    component: ReactElement;
}

const ProtectedRouteElement: FC<IProtectedRoute> = ({ onlyUnAuth = false, component }) => {
    const { user, isAuthChecked } = useAppSelector(getUserState);
    const location = useLocation();

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
export const OnlyUnAuth: FC<IProtectedRoute> = ({ component }) => (<ProtectedRouteElement onlyUnAuth={true} component={component} />);