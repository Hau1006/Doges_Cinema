import { BrowserRouter as Router, Routes } from "react-router-dom";
import { routes } from "./routes";
import renderRoutes from "./utils/renderRoutes";
function App() {
  return (
    <Router>
      <Routes>
        {renderRoutes(routes)}
      </Routes>
    </Router>
  );
}

export default App;
