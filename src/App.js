import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ArticulesList from "./components/articules/articulesList/ArticulesList.jsx";
import Footer from "./components/layout/footer/Footer.jsx";
import Header from "./components/layout/header/Header.jsx";
import { AuthContextProvider } from "./components/login/context.js";
import CreateUserPage from "./components/login/CreateUserPage.jsx";
import LoginPage from "./components/login/LoginPage.jsx";

function App({ isInitiallyLogged, className }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };
  const handleLogout = () => {
    setIsLogged(false);
  };
  return (
    <div className="App">
      <Header />
      <AuthContextProvider value={{ isLogged, handleLogin, handleLogout }}>
        <Routes>
          <Route path="/" element={<Navigate to="/articules" />}></Route>
          <Route path="/articules">
            <Route index element={<ArticulesList></ArticulesList>}></Route>
          </Route>
          <Route path="/createAccount" element={<CreateUserPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/404" element={<div> 404 | Not found Page</div>}></Route>
          <Route path="*" element={<Navigate to="/404" />}></Route>
        </Routes>
      </AuthContextProvider>
      <Footer />
    </div>
  );
}

export default App;
