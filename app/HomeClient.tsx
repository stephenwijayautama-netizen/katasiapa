'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from './AppContext';
import ThemeCard from './ThemeCard';
import { ThemeItem } from './store';
import { soundEngine } from './lib/soundEngine';
import {
  Play,
  Sparkles,
  Shuffle,
  MessageCircle,
  Flame,
  Coffee,
  Moon,
  Heart,
  Users,
  CheckCircle2,
  HelpCircle,
  Zap,
  ShieldCheck,
  Ban,
  PhoneOff,
  Ear,
  X,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function HomeClient() {
  const { t, themes, cards } = useApp();
  const [infoThemeModal, setInfoThemeModal] = useState<ThemeItem | null>(null);

  // Ambil tema resmi termasuk edisi spesial Dunia Si Kecil & Pertanyaan Kustom
  const validThemes = themes.filter((th) =>
    ['family', 'love', 'passion', 'friendship', 'dreams', 'gratitude', 'kids', 'custom'].includes(th.slug)
  );

  const handleCardClick = (th: ThemeItem) => {
    soundEngine.playFlip();
    setInfoThemeModal(th);
  };

  // 5 Tema terfavorit untuk kipas kartu hero
  const featuredFanSlugs = ['friendship', 'dreams', 'kids', 'gratitude', 'love'];
  const fanThemes = featuredFanSlugs
    .map((slug) => validThemes.find((th) => th.slug === slug))
    .filter(Boolean) as ThemeItem[];

  // Konfigurasi kipas kartu (5 kartu, tengah terbesar)
  const fanConfig = [
    { rotate: '-12deg', scale: '0.78', opacity: '0.85', translate: '0px', hidden: 'hidden lg:flex' },
    { rotate: '-6deg',  scale: '0.88', opacity: '0.92', translate: '0px', hidden: 'hidden sm:flex' },
    { rotate: '0deg',   scale: '1.0',  opacity: '1',    translate: '-16px', hidden: 'flex' },
    { rotate: '6deg',   scale: '0.88', opacity: '0.92', translate: '0px', hidden: 'hidden sm:flex' },
    { rotate: '12deg',  scale: '0.78', opacity: '0.85', translate: '0px', hidden: 'hidden lg:flex' },
  ];

  const steps = [
    {
      num: '01',
      title: 'Pilih Vibe & Temamu',
      tag: 'Step 1 · Pilih Topik',
      badgeColor: 'from-pink-500 to-rose-500',
      icon: Flame,
      desc: 'Tentukan tema obrolan yang paling pas sama suasana nongkrong hari ini. Mau nostalgia hangat di Family, deep talk berdua di Love, bakar ambisi di Passion, atau curhat jujur bareng geng di Friendship.',
      highlight: '6 Tema Relate & Seru',
    },
    {
      num: '02',
      title: 'Kocok atau Spin Kartu',
      tag: 'Step 2 · Acak Pertanyaan',
      badgeColor: 'from-purple-500 to-indigo-500',
      icon: Shuffle,
      desc: 'Giliran pemain menekan tombol Kocok atau Spin untuk menarik kartu pertanyaan yang tak terduga. Kartu akan terkunci sesuai tema yang kamu pilih tanpa ada intervensi topik lain.',
      highlight: 'Animasi 3D & Efek Interaktif',
    },
    {
      num: '03',
      title: 'Jawab Jujur & Dengerin',
      tag: 'Step 3 · Ngobrol Lepas',
      badgeColor: 'from-emerald-500 to-teal-500',
      icon: MessageCircle,
      desc: 'Pemain yang dapat giliran wajib menjawab pertanyaannya sejujur mungkin. Yang lain bertugas mendengarkan dengan penuh tanpa memotong atau nge-judge. Dijamin obrolan makin dalam dan berkesan!',
      highlight: 'No Judgement Safe Zone',
    },
  ];

  const rules = [
    {
      icon: ShieldCheck,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      title: 'Safe Space & Rahasia Aman',
      desc: 'Apa pun rahasia, unek-unek, atau cerita yang diobrolkan saat main, tetap tinggal di meja ini. Gak boleh bocor ke luar!',
    },
    {
      icon: Ban,
      color: 'text-pink-400 bg-pink-500/10 border-pink-500/30',
      title: 'Boleh Pakai 1x Hak Skip',
      desc: 'Kalau pertanyaannya dirasa terlalu privat atau belum siap dijawab, kamu berhak bilang "Skip" 1x tanpa paksaan.',
    },
    {
      icon: Ear,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      title: 'Dengerin Sampai Tuntas',
      desc: 'Saat seseorang bercerita, jangan buru-buru dipotong atau dihakimi. Hargai keberanian dan kejujuran mereka.',
    },
    {
      icon: PhoneOff,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      title: 'Simpan Dulu Gadget Sebentar',
      desc: 'Taro HP dengan layar menghadap ke bawah. Nikmati momen tatap muka dan tatap mata yang langka di zaman sekarang.',
    },
  ];

  const vibes = [
    { label: 'Nongkrong Kafe Santai', icon: Coffee, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { label: 'Midnight Deep Talk 02:00', icon: Moon, color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
    { label: 'Quality Time Pasangan', icon: Heart, color: 'text-pink-400 border-pink-500/30 bg-pink-500/10' },
    { label: 'Geng Bestie & Sahabat', icon: Users, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { label: 'Momen Hangat Keluarga', icon: Sparkles, color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex flex-col selection:bg-pink-500 selection:text-white">

      {/* ══════════════════════════════════════════════════════════════════════════
          1. HERO SECTION
         ══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-20 pb-12 px-6 overflow-hidden flex flex-col items-center text-center">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-pink-600/30 via-purple-600/20 to-blue-600/20 blur-[150px] pointer-events-none rounded-full" />

        {/* Judul Hero */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight max-w-4xl mb-6 leading-tight">
          Kocok Kartu. <br />
          <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-violet-500 bg-clip-text text-transparent">
            Mulai Obrolan Nyata.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mb-10 leading-relaxed">
          Gak ada lagi momen hening atau canggung saat nongkrong bareng teman, gebetan, atau keluarga. Pilih tema, kocok kartunya, dan temukan cerita tak terduga yang bikin makin dekat.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <Link
            href="/play"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold text-sm shadow-xl shadow-pink-500/30 hover:scale-105 transition flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            Mulai Main Sekarang
          </Link>
          <a
            href="#rules-and-play"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition flex items-center justify-center gap-2 text-zinc-300 hover:text-white"
          >
            <HelpCircle className="w-4 h-4 text-pink-400" />
            Rules & Cara Main
          </a>
        </div>

        {/* ── Kipas Kartu (5 kartu tema asli dari PDF) ── */}
        <div className="w-full max-w-5xl mx-auto flex items-end justify-center py-4 px-4 overflow-visible">
          {fanConfig.map((fan, i) => {
            const th = fanThemes[i] || validThemes[i];
            if (!th) return null;
            return (
              <div
                key={th.slug}
                className={`${fan.hidden} flex-shrink-0 items-end`}
                style={{
                  transform: `rotate(${fan.rotate}) scale(${fan.scale}) translateY(${fan.translate})`,
                  opacity: fan.opacity,
                  marginLeft: i === 0 ? '0' : '-60px',
                  zIndex: i === 2 ? 20 : 10 - Math.abs(i - 2),
                  transition: 'transform 0.3s ease',
                }}
              >
                <div
                  onClick={() => handleCardClick(th)}
                  className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
                >
                  <ThemeCard
                    title={th.titleEn}
                    slug={th.slug}
                    active={i === 2}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          2. HOW TO PLAY & RULES SECTION (GAYA ANAK MUDA, ESTETIK & RELATABLE)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section id="rules-and-play" className="py-24 px-6 max-w-7xl mx-auto w-full relative">
        {/* Glow aksen di background */}
        <div className="absolute top-1/3 left-10 -translate-y-1/2 w-[380px] h-[380px] bg-pink-500/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-1/3 right-10 w-[380px] h-[380px] bg-purple-500/10 blur-[140px] pointer-events-none rounded-full" />

        {/* Heading Section */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Gak Perlu Canggung, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-violet-400 bg-clip-text text-transparent">
              Ini Cara Main & Aturannya!
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Hanya 3 langkah simpel buat ngubah nongkrong yang tadinya sibuk scroll HP jadi obrolan seru yang bikin ketawa lepas atau malah terharu bareng.
          </p>
        </div>

        {/* ── 3 Langkah Bermain (How to Play) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10 mb-16">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="group relative flex flex-col p-8 rounded-[36px] bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-pink-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(236,72,153,0.15)]"
              >
                {/* Header Card: Nomor & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${st.badgeColor} flex items-center justify-center text-white text-xl font-black shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform duration-300`}>
                    {st.num}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-[10px] font-bold tracking-wider uppercase border border-white/10">
                    {st.tag}
                  </span>
                </div>

                {/* Judul & Deskripsi */}
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-5 h-5 text-pink-400" />
                  <h3 className="text-xl font-black text-white">{st.title}</h3>
                </div>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                  {st.desc}
                </p>

                {/* Highlight Chip */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-pink-400">
                  <CheckCircle2 className="w-4 h-4 text-pink-400" />
                  <span>{st.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Box "Rules of the Game" (Aturan Main Santai Anak Muda) ── */}
        <div className="relative z-10 p-8 sm:p-10 rounded-[40px] bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 backdrop-blur-md mb-16 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-pink-400 tracking-widest uppercase mb-1 block">
                HOUSE RULES
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                4 Aturan Emas Saat Bermain
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
              Biar obrolan makin seru, nyaman, dan gak ada yang merasa tertekan, sepakati 4 aturan santai ini bareng-bareng!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rules.map((rl, idx) => {
              const RlIcon = rl.icon;
              return (
                <div
                  key={rl.title}
                  className="flex items-start gap-4 p-5 rounded-3xl bg-black/40 border border-white/10 hover:border-white/20 transition"
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${rl.color}`}>
                    <RlIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white mb-1">
                      {idx + 1}. {rl.title}
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {rl.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Vibe Check Pills */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-3">
              Cocok Banget Dimainkan Saat:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {vibes.map((vb) => {
                const VbIcon = vb.icon;
                return (
                  <div
                    key={vb.label}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition hover:scale-105 ${vb.color}`}
                  >
                    <VbIcon className="w-3.5 h-3.5" />
                    <span>{vb.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Mini di bawah Rules */}
        <div className="text-center relative z-10">
          <Link
            href="/play"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold text-sm shadow-xl shadow-pink-500/30 hover:scale-105 transition"
          >
            <Play className="w-4 h-4 fill-white" />
            Gas, Mulai Main Sekarang
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          3. THEMES GRID SECTION (PILIH TEMA KARTU ASLI)
         ══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" suppressHydrationWarning>{t.themesSectionTitle}</h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base" suppressHydrationWarning>{t.themesSectionSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {validThemes.map((th) => (
            <div key={th.slug} className="w-full flex justify-center">
              <div
                onClick={() => handleCardClick(th)}
                className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <ThemeCard
                  title={th.titleEn}
                  slug={th.slug}
                  gradient={th.gradient}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-auto py-12 px-6 border-t border-white/10 flex flex-col items-center justify-center space-y-4 text-center text-xs text-zinc-500">
        <Image
          src="/logo_dark.png"
          alt="Kata Siapa - Ruang Untuk Berbagi Cerita"
          width={150}
          height={38}
          className="h-8 w-auto object-contain opacity-85 hover:opacity-100 transition"
        />
        <p suppressHydrationWarning>{t.footerText}</p>
      </footer>

      {/* ══════════════════════════════════════════════════════════════════════════
          MODAL INFORMASI & PREVIEW ZOOM-OUT KARTU (TIDAK MASUK KE HALAMAN MAIN)
          ══════════════════════════════════════════════════════════════════════════ */}
      {infoThemeModal && (() => {
        const infoThemeCards = (cards || []).filter(
          (c) =>
            c.themeSlug === infoThemeModal.slug ||
            (infoThemeModal.slug === 'love' && (c.themeSlug === 'pasangan' || c.themeSlug === 'love')) ||
            (infoThemeModal.slug === 'friendship' && (c.themeSlug === 'nongkee' || c.themeSlug === 'friendship'))
        );
        const sampleQuestions = infoThemeCards.slice(0, 3);

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
            onClick={() => setInfoThemeModal(null)}
          >
            <div
              className="relative w-full max-w-2xl bg-[#14141C] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden animate-zoom-out"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tombol Tutup */}
              <button
                onClick={() => setInfoThemeModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition z-20"
                title="Tutup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Sisi Kiri: Tampilan Kartu Visual Asli */}
                <div className="flex justify-center">
                  <ThemeCard
                    title={infoThemeModal.titleEn}
                    slug={infoThemeModal.slug}
                    gradient={infoThemeModal.gradient}
                    size="default"
                  />
                </div>

                {/* Sisi Kanan: Penjelasan & Informasi Kartu */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40">
                        {infoThemeModal.editionLabel || 'Edisi KataSiapa'}
                      </span>
                      <span className="text-xs text-zinc-400 font-bold">
                        {infoThemeCards.length} Kartu Siap
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-white">
                      {infoThemeModal.titleEn}
                    </h3>
                    <p className="text-sm font-bold text-pink-400">
                      {infoThemeModal.subtitleEn || infoThemeModal.subtitleId}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-300">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Cuplikan Topik Pertanyaan:</span>
                    </div>
                    {sampleQuestions.length > 0 ? (
                      <div className="space-y-2">
                        {sampleQuestions.map((q, idx) => (
                          <p key={idx} className="text-xs text-zinc-300 italic line-clamp-2">
                            &bull; &ldquo;{q.contentId}&rdquo;
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-zinc-400 italic">
                        Tema ini memuat pertanyaan yang dirancang untuk membuka obrolan hangat dan bermakna.
                      </p>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-zinc-400 leading-relaxed">
                    <em>Kartu ini ditampilkan dalam mode preview informasi (zoom-out). Klik tutup untuk kembali ke beranda.</em>
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <button
                      onClick={() => setInfoThemeModal(null)}
                      className="flex-1 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-zinc-300 hover:text-white font-bold text-xs transition"
                    >
                      Tutup Preview
                    </button>
                    <Link
                      href={infoThemeModal.slug === 'custom' ? '/custom' : '/collection'}
                      className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:scale-[1.02] text-white font-extrabold text-xs shadow-lg shadow-pink-500/25 transition text-center flex items-center justify-center gap-1.5"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{infoThemeModal.slug === 'custom' ? 'Buat Kartu Sekarang' : 'Buka Koleksi'}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
