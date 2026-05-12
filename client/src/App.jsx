import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Advantages from "./components/Advantages";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import HowToOrder from "./components/HowToOrder";
import PopularServices from "./components/popularServices";
import Works from "./components/Works";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <PopularServices />
        <Services />
        <HowToOrder />
        <Advantages />
        <Works />
        <ContactInfo />
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />

      <Routes>
        {/* public site */}
        <Route path="/" element={<HomePage />} />

        {/* admin login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* protected admin dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
