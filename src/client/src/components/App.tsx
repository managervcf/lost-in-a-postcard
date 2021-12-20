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
      <Navbar />
      <Dashboard />
    </header>
    <hr />
    <main>
      <Routes>
        <Route path="/" element={<Navigate to="/photos/all/featured" />} />
        <Route path="/photos/*" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <hr />
    <footer>
      <Navbar />
      <Footer />
    </footer>
  </>
);
