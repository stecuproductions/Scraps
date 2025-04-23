"use client";

import { useState } from "react";
import Link from "next/link";
import SvgLogo from "./UI/SvgLogo";
import { ShoppingCart, ArrowRight, Check, Phone, Mail, MapPin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

// Custom TikTok icon since it's not in Lucide React by default
const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <footer className="bg-[rgb(0,0,128)] text-white py-16">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Top section with logo and nav */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 mb-16">
          <div className="w-40 h-20">
            <SvgLogo />
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <Link href="/" className="hover:text-blue-200 transition-colors uppercase tracking-wider text-sm">
              Strona główna
            </Link>
            <Link href="#oferta" className="hover:text-blue-200 transition-colors uppercase tracking-wider text-sm">
              Kolekcja
            </Link>
            <Link href="#about" className="hover:text-blue-200 transition-colors uppercase tracking-wider text-sm">
              O nas
            </Link>
            <Link href="/cart" className="flex items-center gap-2 hover:text-blue-200 transition-colors uppercase tracking-wider text-sm">
              <ShoppingCart size={16} />
              Koszyk
            </Link>
          </div>
        </div>

        {/* Contact information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 border-t border-b border-blue-900/30 py-10">
          {/* Phone & Email */}
          <div className="flex flex-col gap-3 items-center md:items-start">
            <a href="tel:+48123456789" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Phone size={16} />
              <span>+48 123-456-789</span>
            </a>
            <a href="mailto:info@scraps.com" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Mail size={16} />
              <span>info@scraps.com</span>
            </a>
          </div>
          
          {/* Social Media */}
          <div className="flex flex-col gap-3 items-center">
            <a href="https://instagram.com/scraps123" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Instagram size={16} />
              <span>@scraps123</span>
            </a>
            <a href="https://tiktok.com/@scrapsTikTok" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <TikTokIcon />
              <span>@scrapsTikTok</span>
            </a>
          </div>
          
          {/* Address */}
          <div className="flex flex-col gap-1 items-center md:items-end">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>ul. Zielona 5</span>
            </div>
            <div className="pl-6 md:pl-0">
              <span>78-345 Warszafka</span>
            </div>
          </div>
        </div>
        
        {/* Newsletter section */}
        <div className="max-w-md mx-auto mb-16">
          <h3 className="font-header text-xl md:text-2xl mb-4 text-center">Newsletter</h3>
          <p className="text-sm text-center mb-6">
            Zapisz się, aby otrzymywać informacje o nowościach i promocjach
          </p>
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Twój adres email"
              className="w-full px-4 py-3 bg-transparent border-2 border-white focus:outline-none text-white text-sm"
              required
            />
            <motion.button
              type="submit"
              className="absolute right-0 top-0 h-full px-4 bg-transparent text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitted ? <Check size={20} /> : <ArrowRight size={20} />}
            </motion.button>
          </form>
          {isSubmitted && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-center mt-2"
            >
              Dziękujemy za zapisanie się!
            </motion.p>
          )}
        </div>
        
        {/* Copyright */}
        <div className="text-center border-t border-blue-900/50 pt-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Scraps. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;