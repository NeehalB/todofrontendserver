import "./App.css";
import AddTask from "./components/addtask/AddTask";
import LoginPage from "./components/login-and-sign-up/LoginPage";
import SignUpPage from "./components/login-and-sign-up/SignUpPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewTask from "./components/viewtask/ViewTask";
import PrivateRouter from "./components/auth/PrivateRouter";
import PublicRouter from "./components/auth/PublicRouter";
import CompletedTask from "./components/completedtask/CompletedTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRouter />}>
          <Route path="/view_task" element={<ViewTask />} />
          <Route path="/add_task" element={<AddTask />} />
          <Route path="/complete_task" element={<CompletedTask />} />
        </Route>
        <Route path="/" element={<PublicRouter />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign_up_page" element={<SignUpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
