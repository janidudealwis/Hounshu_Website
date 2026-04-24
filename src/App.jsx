import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SEO from "./components/SEO";
import { LenisProvider } from "./context/LenisContext";
import { CartProvider } from "./context/CartContext";
import { AdminProvider } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import EquipmentCategories from "./components/EquipmentCategories";
import WhyChoose from "./components/WhyChoose";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import ScrollReveal from "./components/ScrollReveal";
import ProtectedRoute from "./components/ProtectedRoute";
import useScrollToTop from "./hooks/useScrollToTop";

const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Contact = lazy(() => import("./pages/Contact"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function Home() {
  useScrollToTop();

  return (
    <LenisProvider>
      <SEO
        canonical="/"
        description="Honshu Enterprises is Sri Lanka's trusted supplier of Japanese industrial equipment — generators, forklifts, excavators, motor graders and road rollers. Built for reliability in demanding environments."
      />
      <ScrollProgress />
      <Navbar />
      <ScrollReveal direction="up" delay={0.2}>
        <Hero />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={0.4}>
        <EquipmentCategories />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={0.6}>
        <WhyChoose />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={0.8}>
        <CTA />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={1.0}>
        <Footer />
      </ScrollReveal>
    </LenisProvider>
  );
}

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <AdminProvider>
          <Router>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
          </Router>
        </AdminProvider>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;
