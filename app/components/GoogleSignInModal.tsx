'use client';

import React, { useState } from 'react';
import { X, Check, Loader2, UserPlus, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../lib/soundEngine';

interface GoogleSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: { name: string; email: string }) => void;
  redirectUrl?: string;
}

export function GoogleLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.02h3.88c2.28-2.09 3.66-5.18 3.66-9.12z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.02c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.12C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.59H1.24C.45 8.18 0 9.99 0 12s.45 3.82 1.24 5.41l4.04-3.12z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.59l4.04 3.12c.95-2.83 3.6-4.96 6.72-4.96z"
      />
    </svg>
  );
}

export default function GoogleSignInModal({
  isOpen,
  onClose,
  onSuccess,
}: GoogleSignInModalProps) {
  const [selectedEmail, setSelectedEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const defaultAccounts = [
    {
      name: 'Bintang Utama',
      email: 'bintang.utama@gmail.com',
      avatarColor: 'bg-indigo-600',
      initial: 'B',
    },
    {
      name: 'Stephen Wijaya',
      email: 'stephenwijayautama@gmail.com',
      avatarColor: 'bg-emerald-600',
      initial: 'S',
    },
  ];

  const handleSelectAccount = (name: string, email: string) => {
    setLoading(true);
    soundEngine.playFlip();

    setTimeout(() => {
      setLoading(false);
      soundEngine.playCelebration();
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      onSuccess({ name, email });
      onClose();
    }, 700);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) {
      alert('Masukkan nama kamu!');
      return;
    }
    const cleanEmail = customEmail.trim()
      ? customEmail.includes('@')
        ? customEmail.trim()
        : `${customEmail.trim()}@gmail.com`
      : `${customName.toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`;

    handleSelectAccount(customName.trim(), cleanEmail);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[420px] bg-[#1A1A24] border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden animate-zoom-out text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition"
          title="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Google Sign-In */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-white/10 mb-3">
            <GoogleLogo className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white">
            Masuk dengan Google
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Lanjutkan ke <span className="text-pink-400 font-bold">KataSiapa</span>
          </p>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
            <p className="text-xs text-zinc-400 font-medium">
              Menghubungkan akun Google kamu...
            </p>
          </div>
        ) : !isCustom ? (
          <div className="space-y-3">
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-1">
              Pilih Akun Google Kamu
            </div>

            <div className="space-y-2">
              {defaultAccounts.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => handleSelectAccount(acc.name, acc.email)}
                  className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-pink-500/40 transition text-left group"
                >
                  <div
                    className={`w-10 h-10 rounded-full ${acc.avatarColor} text-white font-bold flex items-center justify-center flex-shrink-0 text-sm shadow-md group-hover:scale-105 transition-transform`}
                  >
                    {acc.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white truncate">
                      {acc.name}
                    </div>
                    <div className="text-xs text-zinc-400 truncate">
                      {acc.email}
                    </div>
                  </div>
                  <div className="text-xs text-zinc-500 group-hover:text-pink-400 transition">
                    Pilih →
                  </div>
                </button>
              ))}

              {/* Tambah Akun Google Lain */}
              <button
                onClick={() => setIsCustom(true)}
                className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-dashed border-white/20 hover:border-pink-500/40 transition text-left text-zinc-300 hover:text-white"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-zinc-400">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold">
                  Gunakan Akun Google / Gmail Lainnya
                </div>
              </button>
            </div>

            <div className="pt-4 flex items-center justify-center gap-1.5 text-[10px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google Sandbox OAuth &bull; Akses Aman &amp; Terverifikasi</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                Nama Akun Google
              </label>
              <input
                type="text"
                required
                autoFocus
                placeholder="Contoh: Rian Pratama"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                Alamat Gmail
              </label>
              <input
                type="email"
                placeholder="namakamu@gmail.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={!customName.trim()}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-violet-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-pink-500/25 hover:opacity-95 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <GoogleLogo className="w-4 h-4" />
              <span>Masuk dengan Akun Ini</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCustom(false)}
              className="w-full text-center text-xs text-zinc-400 hover:text-white transition pt-1"
            >
              ← Kembali ke Pilihan Akun
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
