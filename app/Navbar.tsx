'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useApp } from './AppContext';
import { Globe, Sparkles, Play, Sun, Moon, User, Menu, X } from 'lucide-react';
import BGMPlayer from './BGMPlayer';

export default function Navbar() {
  const { lang, setLang, t, profile, themeMode, toggleThemeMode, isMounted, isLoggedIn } = useApp();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: lang === 'en' ? 'Home' : 'Beranda' },
    { href: '/themes', label: lang === 'en' ? 'Themes' : 'Tema' },
    { href: '/collection', label: lang === 'en' ? 'Collection' : 'Koleksi' },
    { href: '/#rules-and-play', label: lang === 'en' ? 'How to Play' : 'Cara Main' },
    { href: '/settings', label: lang === 'en' ? 'Settings' : 'Pengaturan' },
  ];

  const currentTheme = isMounted ? themeMode : 'dark';
  const logoSrc = currentTheme === 'light' ? '/logo.png' : '/logo_dark.png';

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0B0B0F]/90 border-b border-white/10 px-2.5 sm:px-8 py-2.5 sm:py-3 relative flex items-center justify-between transition-colors w-full max-w-full overflow-hidden">
        {/* ── KIRI: BRAND LOGO (ADAPTIF DARK/LIGHT & RESPONSIVE HP) ── */}
        <Link href="/" className="flex items-center gap-2 z-10 flex-shrink-0 group">
          <Image
            src={logoSrc}
            alt="Kata Siapa - Ruang Untuk Berbagi Cerita"
            width={140}
            height={36}
            className="h-7 sm:h-9 w-auto max-w-[110px] sm:max-w-[165px] object-contain transition-transform duration-200 group-hover:scale-105"
            priority
          />
        </Link>

        {/* ── TENGAH: NAV MENU PERSIS DI TENGAH LAYAR (MATHEMATICALLY CENTERED - DESKTOP) ── */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 py-1 font-medium ${
                  isActive
                    ? 'text-white font-bold border-b-2 border-pink-500'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span suppressHydrationWarning>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* ── KANAN: ACTIONS (THEME TOGGLE, LANG, PROFILE, CTA & MOBILE HAMBURGER) ── */}
        <div className="flex items-center gap-1 sm:gap-2.5 z-10 flex-shrink-0">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleThemeMode}
            className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition shadow-sm"
            title={currentTheme === 'light' ? 'Beralih ke Dark Mode' : 'Beralih ke Light Mode'}
            aria-label="Toggle Theme Mode"
          >
            {currentTheme === 'light' ? (
              <Moon className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500/20" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            )}
          </button>

          {/* Language Toggle (Desktop/Tablet) */}
          <button
            onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition shadow-sm"
            title="Ganti Bahasa"
          >
            <Globe className="w-3.5 h-3.5 text-pink-400" />
            <span suppressHydrationWarning>{lang === 'en' ? 'ID' : 'EN'}</span>
          </button>

          {/* Profile Avatar Pill or Login Link */}
          {isMounted && isLoggedIn ? (
            <Link
              href="/profile"
              className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-xl border text-xs font-bold transition group ${
                pathname === '/profile'
                  ? 'bg-pink-500/15 border-pink-500/40 text-pink-300'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
              }`}
              title="Profil Saya"
            >
              {profile?.avatar && (profile.avatar.startsWith('/') || profile.avatar.startsWith('http')) ? (
                <div className="w-5 h-5 rounded-full overflow-hidden relative border border-pink-500/40 flex-shrink-0 shadow-sm">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-300 flex items-center justify-center border border-pink-500/40 text-[10px] font-bold">
                  {profile?.name ? profile.name.charAt(0).toUpperCase() : <User className="w-3 h-3" />}
                </div>
              )}
              <span className="hidden sm:inline text-zinc-200" suppressHydrationWarning>
                {profile?.name?.split(' ')[0] || 'Profil'}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
                pathname === '/login'
                  ? 'bg-pink-500/15 border-pink-500/40 text-pink-300'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300 hover:text-white'
              }`}
            >
              <span>Masuk</span>
            </Link>
          )}

          {/* Mainkan Sekarang CTA */}
          <Link
            href="/play"
            className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold text-xs shadow-lg shadow-pink-500/25 hover:opacity-90 transition"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span className="hidden sm:inline" suppressHydrationWarning>{t.startPlaying}</span>
            <span className="sm:hidden">Main</span>
          </Link>

          {/* Hamburger Button untuk HP (Mobile Drawer) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ── MOBILE NAVIGATION DRAWER (RESPONSIF UNTUK HP) ── */}
      {mobileMenuOpen && (
        <div className="md:hidden sticky top-[57px] z-40 bg-[#0E0E16]/95 backdrop-blur-2xl border-b border-white/15 px-4 py-4 space-y-2 shadow-2xl animate-fadeIn">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40'
                      : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span suppressHydrationWarning>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />}
                </Link>
              );
            })}
          </div>

          {/* Language Switcher di HP */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between px-1">
            <span className="text-xs text-zinc-400 font-semibold">Bahasa / Language:</span>
            <button
              onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-xs font-bold text-white shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-pink-400" />
              <span>{lang === 'en' ? 'Bahasa Indonesia' : 'English'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Ambient & Lo-Fi Music Controller */}
      <BGMPlayer />
    </>
  );
}
