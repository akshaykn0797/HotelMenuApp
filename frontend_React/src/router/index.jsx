import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { PublicElement, ProtectedElement } from "components/Element";

const HomePage = lazy(() => import("pages/Login"));
const Login = lazy(() => import("pages/Login"));
const Degg = lazy(() => import("pages/Degg"));
const Hocco = lazy(() => import("pages/Hocco"));
const Sushima = lazy(() => import("pages/Sushima"));
const Pfchangs = lazy(() => import("pages/Pfchangs"));
const Moes = lazy(() => import("pages/Moes"))

const FourOhFour = lazy(() => import("pages/Error/FourOhFour"));

const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<PublicElement component={Login} />} />
      <Route path="/moes" element={<PublicElement component={Moes} />} />
      <Route path="/degg" element={<PublicElement component={Degg} />} />
      <Route path="/sushima" element={<PublicElement component={Sushima} />} />
      <Route path="/pfchangs" element={<PublicElement component={Pfchangs} />} />
      <Route path="/hocco" element={<PublicElement component={Hocco} />} />
      {/* Protected Routes */}
      <Route path="/" element={<ProtectedElement component={HomePage} />} />
      {/* 404 page if none of the routes match */}
      <Route path="*" element={<FourOhFour />} />
    </Routes>
  );
};

export default Router;
