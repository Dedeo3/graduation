"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Sparkles, Gift, Camera, Send, Menu, X, Play } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const compliments = [
  "Jujur kamu sangat kelihatan elegant waktu wisuda",
  "Aku bisa merasakan campur adukmu tapi aku senang akhirnya kamu dapat wisuda",
  "Ciwiikuu cantik bangett yahh",
  "Bangga banget sama kamu 🎓",
  "Aku sayang kamu banyak sekali dan tiap hari bertambah sayangg ❤❤",
];

export default function GraduationGiftPage() {
  const photos = [
    { src: "/memories/m1.jpg", alt: "Happy moment #1" },
    { src: "/memories/m2.jpg", alt: "Happy moment #2" },
    { src: "/memories/m3.jpg", alt: "Happy moment #3" },
    { src: "/memories/m4.jpg", alt: "Happy moment #4" },
    { src: "/memories/m5.jpg", alt: "Happy moment #5" },
    { src: "/memories/m6.jpg", alt: "Happy moment #6" },
    { src: "/memories/m7.jpg", alt: "Happy moment #7" },
    { src: "/memories/m8.jpg", alt: "Happy moment #8" },
    { src: "/memories/m9.jpg", alt: "Happy moment #9" },
    { src: "/memories/m10.jpg", alt: "Happy moment #10" },
    { src: "/memories/m11.jpg", alt: "Happy moment #11" },
    { src: "/memories/m12.jpg", alt: "Happy moment #12" },
    { src: "/memories/m13.jpg", alt: "Happy moment #13" },
    { src: "/memories/m14.jpg", alt: "Happy moment #14" },
    { src: "/memories/m15.jpg", alt: "Happy moment #15" },
    { src: "/memories/m16.jpg", alt: "Happy moment #16" },
    { src: "/memories/m17.jpg", alt: "Happy moment #17" },
    { src: "/memories/m18.jpg", alt: "Happy moment #18" },
    { src: "/memories/m19.jpg", alt: "Happy moment #19" },
    { src: "/memories/m20.jpg", alt: "Happy moment #20" },
    { src: "/memories/m21.jpg", alt: "Happy moment #21" },
    { src: "/memories/m22.jpg", alt: "Happy moment #22" },
    { src: "/memories/m23.jpg", alt: "Happy moment #23" },
    { src: "/memories/m24.jpg", alt: "Happy moment #24" },
  ];

  const [activeSection, setActiveSection] = useState("main");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  // ==== Gift -> klik untuk play video ====
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startVideo = () => {
    setVideoStarted(true);
    // Autoplay-friendly: mulai dalam kondisi muted
    requestAnimationFrame(() => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = true;
      v.play().catch(() => {
        // diamkan error autoplay
      });
    });
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  // ====== Modal love + random compliment satu-satu ======
  const [loveOpen, setLoveOpen] = useState(false);
  const [currentCompliment, setCurrentCompliment] = useState<string>(compliments[0]);
  const [pool, setPool] = useState<number[]>([]);
  const [animKey, setAnimKey] = useState(0);

  const refillPool = () => {
    const arr = Array.from({ length: compliments.length }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setPool(arr);
  };

  const nextCompliment = () => {
    if (pool.length === 0) refillPool();
    const nextPool = pool.length ? [...pool] : Array.from({ length: compliments.length }, (_, i) => i);
    const idx = nextPool.shift()!;
    setPool(nextPool);
    setCurrentCompliment(compliments[idx]);
    setAnimKey((k) => k + 1);
  };

  useEffect(() => {
    if (loveOpen) {
      refillPool();
      setTimeout(() => nextCompliment(), 50);
    }
  }, [loveOpen]);

  const sendToWhatsApp = () => {
    if (!message.trim()) return;

    // WA.me harus tanpa "+"
    const phoneNumber = "6281333283657"; // GANTI ke nomor kamu (format internasional tanpa '+')
    const text = `Pesan dari ciwi terkomplit, ${name || "Seseorang"}: ${message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");

    setMessage("");
    setName("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg text-primary">Mauren Hilda Kustopo</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("main")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === "main" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Main
              </button>
              <button
                onClick={() => scrollToSection("memories")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === "memories" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Memories
              </button>
              <button
                onClick={() => scrollToSection("gift")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === "gift" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Gift
              </button>
              <button
                onClick={() => scrollToSection("message")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === "message" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Message
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-pink-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection("main")}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary w-full text-left"
              >
                Main
              </button>
              <button
                onClick={() => scrollToSection("memories")}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary w-full text-left"
              >
                Memories
              </button>
              <button
                onClick={() => scrollToSection("gift")}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary w-full text-left"
              >
                Gift
              </button>
              <button
                onClick={() => scrollToSection("message")}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary w-full text-left"
              >
                Message
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Section */}
      <section id="main" className="pt-20 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-in-up">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Heart className="h-16 w-16 text-primary sparkle" />
                <Sparkles className="h-6 w-6 text-secondary absolute -top-2 -right-2 sparkle" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 text-balance">
              Selamat Wisuda, Sayangkuuu! 🎓
            </h1>
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-pink-100">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 text-pretty">
                Yesterday is your graduation day sayangg, exact at 20 September 2025. I am so be prouded even big proud of you. For me your Journey is well although i always be knew you ever got a obstacles. But, you completed all with marveleous. The little girl, cute, sweet, clingy, and amaze girl in my life can faced of them and smoothly fixed them.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 text-pretty">
                You are so cool sayang I always be prouded of you sayang, I want you too still keep it up and growth with me, let we start our Journey like your well progressed. For now you are not alone, I always in your side. My role is support you and make you growing up, so do you, our roles are the same. Once congratulations sayang. I hope you and me always get a nice moment, feeling, and good future exact on the our carreer. I also hoping we can reach our goals, have a modern house with simply space, clean, park, dog and chicken, and two children with boy and girl, pretty and handsome like his parents. I always loving you big love to youu minee❤❤❤
              </p>
              <Button
                onClick={() => scrollToSection("memories")}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full"
              >
                Lihat Kenangan Kita <Heart className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Memories Section */}
      <section id="memories" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Kenangan Indah Kita</h2>
            <p className="text-lg text-muted-foreground text-pretty">Every moments is great as long as its with you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((p, i) => (
              <Card key={p.src} className="group relative overflow-hidden transition-all duration-500 hover:shadow-xl">
                <div className="aspect-square relative overflow-hidden transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:-rotate-[0.5deg]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover transition-all duration-700 ease-out group-hover:brightness-[1.05]"
                    sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                    priority={i < 3}
                  />

                  {/* Soft pink glow on hover */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,rgba(255,167,196,0.18),transparent_60%)]" />

                  {/* Floating tiny hearts on hover */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <span className="absolute left-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out translate-y-2 group-hover:translate-y-0">
                      <Heart className="h-4 w-4 text-pink-400 animate-pulse" />
                    </span>
                    <span className="absolute right-6 top-6 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 ease-out translate-y-2 group-hover:translate-y-0">
                      <Heart className="h-3 w-3 text-rose-300" />
                    </span>
                    <span className="absolute right-10 bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 ease-out translate-y-2 group-hover:translate-y-0">
                      <Heart className="h-3 w-3 text-pink-300" />
                    </span>
                  </div>

                  {/* Overlay + LOVE button */}
                  <div className="absolute inset-0 flex items-end justify-between p-3 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-white/90 text-xs px-2 py-1 rounded-full bg-black/30 backdrop-blur">{p.alt}</span>

                    <Button
                      size="icon"
                      onClick={() => setLoveOpen(true)}
                      className="rounded-full h-10 w-10 bg-pink-500 hover:bg-pink-600 shadow-md shadow-pink-300/30"
                    >
                      <Heart className="h-5 w-5 text-white" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Dialog compliment satu-satu */}
          <Dialog open={loveOpen} onOpenChange={setLoveOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-500" />
                  Just what i want to say
                </DialogTitle>
              </DialogHeader>

              <div
                key={animKey}
                className="text-center text-lg md:text-xl leading-relaxed px-3 py-5 rounded-2xl border border-pink-100/70 bg-pink-50/40 shadow-sm transition-all duration-300 opacity-0 translate-y-1 [animation:fadeInUp_.35s_ease-out_forwards]"
              >
                {currentCompliment}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <Button variant="secondary" className="rounded-full" onClick={() => setLoveOpen(false)}>
                  Tutup
                </Button>
                <Button className="bg-pink-500 hover:bg-pink-600 rounded-full" onClick={nextCompliment}>
                  Lagi dong 💘
                </Button>
              </div>

              <style jsx global>{`
                @keyframes fadeInUp {
                  from {
                    opacity: 0;
                    transform: translateY(4px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>
            </DialogContent>
          </Dialog>

          <div className="text-center mt-12">
            <Button
              onClick={() => scrollToSection("gift")}
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 rounded-full"
            >
              Buka Hadiah Spesial <Gift className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Gift: klik untuk mulai video */}
      <section id="gift" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Gift className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Itss your turn sayanggg</h2>
            <p className="text-lg text-muted-foreground">💝💝💝💝💝💝💝</p>
          </div>

          {!videoStarted ? (
            <button
              onClick={startVideo}
              className="group relative block w-full max-w-4xl mx-auto overflow-hidden rounded-3xl border border-pink-200 bg-gradient-to-b from-pink-50 to-rose-50 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="relative aspect-video">
                <Image
                  src="/videos/gift-poster" // opsional: siapkan poster
                  alt="Poster Video Hadiah"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center">
                  <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/90 text-pink-600 shadow-md group-hover:scale-105 transition">
                    <Play className="h-5 w-5" />
                    <span className="font-semibold">Putar Video</span>
                  </div>
                </div>
              </div>
            </button>
          ) : (
            <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl">
              <video
                ref={videoRef}
                className="w-full h-full"
                controls
                playsInline
                // poster="/videos/gift-poster.jpg"
              >
                <source src="/videos/gift.mp4" type="video/mp4" />
                Browser kamu tidak mendukung tag video.
              </video>
            </div>
          )}
        </div>
      </section>

      {/* Message Section */}
      <section id="message" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Send className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Kasih feedback yahh</h2>
            <p className="text-lg text-muted-foreground text-pretty">Aku maww tahuu perasaanmuu</p>
          </div>

          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nama 
                </label>
                <Input
                  id="name"
                  placeholder="Masukkan nama kamu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Pesan
                </label>
                <Textarea
                  id="message"
                  placeholder="Tulis pesan kamu di sini..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full resize-none"
                />
              </div>

              <Button
                onClick={sendToWhatsApp}
                disabled={!message.trim()}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full"
                size="lg"
              >
                <Send className="mr-2 h-5 w-5" />
                Kirim ke WhatsApp
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-8 px-4 border-t border-pink-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-primary">Made with Love</span>
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <p className="text-muted-foreground">
            Selamat wisuda, sayang! Semoga masa depanmu penuh dengan kebahagiaan dan kesuksesan ❤️
            From: Your love, Yoannes De Deo Haryo Wibisono
          </p>
        </div>
      </footer>
    </div>
  );
}
