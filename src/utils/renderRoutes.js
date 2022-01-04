import { Route } from "react-router-dom";

const renderRoutes = (routes) => {
    var result = null;
    if (routes.length > 0) {
        result = routes.map((route, index) => {
            return (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    element={route.element}
                />

            );
        });
    }
    return result
}

export default renderRoutes

