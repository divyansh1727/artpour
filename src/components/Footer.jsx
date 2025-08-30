import React from "react";
import { FaInstagram, FaFacebook, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-pink-600 text-white py-8 px-4 text-center">
      <h3 className="text-2xl font-bold mb-4">Connect with PourByKay</h3>
      <div className="flex justify-center gap-6 mb-4 text-2xl">
        <a href="https://instagram.com/pourbykay" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        <a href="mailto:pourbykay@example.com"><FaEnvelope /></a>
      </div>
      <p>© {new Date().getFullYear()} PourByKay. All rights reserved.</p>
      <div className="mt-3">
        <Link
          to="/admin-login"
          className="text-lg text-black hover:text-white"
        >
          Admin Login
        </Link>
      </div>
    </footer>
  );
}
