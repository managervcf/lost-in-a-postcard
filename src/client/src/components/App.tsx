import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './Login';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Gallery } from './Gallery';
import { NotFound } from './NotFound';
import { Dashboard } from './Dashboard';

export const App: React.FC = () => (
  <>
    <header>
      <Header />
      <Dashboard />
    </header>
    <main>
      <Routes>
        <Route path="/" element={<Navigate to="/photos/all/featured" />} />
        <Route path="/photos" element={<Navigate to="/photos/all/featured" />} />
        <Route path="/photos/*" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <footer>
      <Navbar />
      <Footer />
    </footer>
  </>
);
