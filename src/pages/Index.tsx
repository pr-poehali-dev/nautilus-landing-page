import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const LOGO = "https://cdn.poehali.dev/projects/de4ec9e6-f029-4cd2-962a-312eb30cc6e4/bucket/c9795e4f-c719-4b10-9e07-0ad483b6a634.jpg";

/* ── Intersection observer hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("anim-visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`anim-hidden ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── Wave SVG divider ── */
function Wave({ flip = false, color = "#0D3B6E" }: { flip?: boolean; color?: string }) {
  return (
    <div className={`wave-svg ${flip ? "rotate-180" : ""}`} style={{ background: "transparent" }}>
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60 }}>
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill={color} />
      </svg>
    </div>
  );
}

/* ── Bubbles in Hero ── */
function Bubbles() {
  const items = [
    { size: 10, left: "8%",  delay: "bubble-delay-0" },
    { size: 16, left: "22%", delay: "bubble-delay-2" },
    { size: 8,  left: "38%", delay: "bubble-delay-4" },
    { size: 14, left: "55%", delay: "bubble-delay-1" },
    { size: 10, left: "70%", delay: "bubble-delay-3" },
    { size: 20, left: "84%", delay: "bubble-delay-5" },
    { size: 7,  left: "15%", delay: "bubble-delay-3" },
    { size: 12, left: "48%", delay: "bubble-delay-0" },
    { size: 9,  left: "92%", delay: "bubble-delay-2" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((b, i) => (
        <div
          key={i}
          className={`absolute bottom-8 rounded-full border border-white/20 animate-bubble ${b.delay}`}
          style={{ width: b.size, height: b.size, left: b.left, background: "rgba(0,180,216,0.12)" }}
        />
      ))}
    </div>
  );
}

/* ── Data ── */
const advantages = [
  { emoji: "🕐", title: "Работаем 24/7", desc: "Без выходных и перерывов. Ночь, утро, праздник — всегда открыты." },
  { emoji: "🧴", title: "Профессиональная химия", desc: "Только сертифицированная автохимия для безопасного мытья." },
  { emoji: "💳", title: "Карта клиента", desc: "Пополняй баланс онлайн и плати картой — никаких наличных." },
  { emoji: "❄️", title: "Зимний режим", desc: "Специальный режим для защиты кузова в морозную погоду." },
];

const modes = [
  { emoji: "💧", num: "01", title: "Предварительная мойка", desc: "Размягчение загрязнений водой под давлением перед основной мойкой" },
  { emoji: "🧼", num: "02", title: "Пенная шапка", desc: "Активная пена глубоко проникает в поры лакокрасочного покрытия (сезонно)" },
  { emoji: "🚿", num: "03", title: "Ополаскивание / смыв", desc: "Чистое смывание пены и загрязнений с кузова и днища" },
  { emoji: "❄️", num: "04", title: "Зимний режим", desc: "Подогретая вода и антиобледенительный состав для зимних дорог" },
];

const steps = [
  { n: "1", title: "Приехал", desc: "Заезжай на свободный пост в любое время", icon: "Car" },
  { n: "2", title: "Выбрал режим", desc: "Выбери нужный режим на панели управления", icon: "SlidersHorizontal" },
  { n: "3", title: "Помыл сам", desc: "Мой столько и так, как нравится именно тебе", icon: "Sparkles" },
];

const reviews = [
  { name: "Алексей К.", car: "Toyota Camry", text: "Отличная мойка! Оборудование работает без сбоев. Зимний режим — просто находка, машина после солёных дорог как новая.", stars: 5 },
  { name: "Марина В.", car: "Kia Rio", text: "Удобно, что 24/7. Езжу поздно вечером после работы — никаких проблем. Карта клиента очень удобная.", stars: 5 },
  { name: "Дмитрий Н.", car: "BMW X5", text: "Наконец-то в Кошелев-Парке нормальная мойка самообслуживания! Химия хорошая, давление отличное.", stars: 5 },
];

const navLinks = [
  { href: "#prices", label: "Цены" },
  { href: "#how", label: "Как это работает" },
  { href: "#contact", label: "Контакты" },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="font-montserrat min-h-screen" style={{ background: "#0A1628", color: "#F0F8FF" }}>

      {/* ──────────── 1. NAVBAR ──────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,22,40,0.97)" : "rgba(10,22,40,0.75)",
          backdropFilter: "blur(14px)",
          borderBottom: scrolled ? "1px solid rgba(232,101,10,0.2)" : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <img src={LOGO} alt="NAUTILUS" className="h-10 w-auto rounded-lg object-cover" style={{ aspectRatio: "auto" }} />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-semibold transition-colors" style={{ color: "#CAF0F8" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#E8650A")}
                onMouseLeave={e => (e.currentTarget.style.color = "#CAF0F8")}
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn-orange px-5 py-2 text-sm">Узнать адрес</a>
          </div>

          {/* Burger */}
          <button className="md:hidden text-white p-1" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm font-semibold" style={{ background: "rgba(10,22,40,0.98)", color: "#CAF0F8" }}>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="py-1 hover:text-orange-400 transition-colors">{l.label}</a>
            ))}
            <a href="#contact" className="btn-orange px-5 py-2 text-center mt-2">Узнать адрес</a>
          </div>
        )}
      </nav>

      {/* ──────────── 2. HERO ──────────── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #040d1a 0%, #0A1628 35%, #0D2B4E 65%, #0D3B6E 100%)" }}
      >
        <Bubbles />

        {/* Radial glow */}
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 50% at 80% 50%, rgba(0,180,216,0.07) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 w-full">
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold mb-8"
              style={{ background: "rgba(232,101,10,0.15)", border: "1px solid rgba(232,101,10,0.4)", color: "#FF7A1A" }}>
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              Открыто · 24/7
            </div>

            <h1 className="font-black leading-[1.05] mb-5" style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)", color: "#F0F8FF" }}>
              Помой сам —<br />
              <span className="text-orange-gradient">так, как нравится</span><br />
              тебе
            </h1>

            <p className="text-lg mb-10 font-medium" style={{ color: "#CAF0F8" }}>
              Мойка самообслуживания <strong style={{ color: "#F0F8FF" }}>NAUTILUS</strong><br />
              Самара · Кошелев-Парк / Крутые Ключи
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-orange px-8 py-4 text-base gap-2 justify-center">
                <Icon name="MapPin" size={18} />
                Узнать адрес
              </a>
              <a href="#how"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-base font-semibold transition-all"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#F0F8FF" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              >
                <Icon name="ChevronDown" size={18} />
                Как это работает
              </a>
            </div>
          </div>
        </div>

        {/* Logo floating right (desktop) */}
        <div className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 z-10 animate-float">
          <img src={LOGO} alt="" className="w-72 h-72 object-contain rounded-2xl opacity-90"
            style={{ filter: "drop-shadow(0 0 40px rgba(232,101,10,0.35))" }} />
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <Wave color="#0D3B6E" />
        </div>
      </section>

      {/* ──────────── 3. ПРЕИМУЩЕСТВА ──────────── */}
      <section id="advantages" style={{ background: "#0D3B6E" }} className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#E8650A" }}>Почему NAUTILUS</span>
              <h2 className="text-4xl sm:text-5xl font-black mt-2" style={{ color: "#F0F8FF" }}>Наши преимущества</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((a, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="card-float rounded-2xl p-8 text-center h-full"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,180,216,0.2)" }}>
                  <div className="text-5xl mb-5">{a.emoji}</div>
                  <h3 className="font-black text-lg mb-3" style={{ color: "#F0F8FF" }}>{a.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#90E0EF" }}>{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Wave flip color="#0A1628" />

      {/* ──────────── 4. КАК ЭТО РАБОТАЕТ ──────────── */}
      <section id="how" style={{ background: "#0A1628" }} className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#E8650A" }}>Быстро и просто</span>
              <h2 className="text-4xl sm:text-5xl font-black mt-2" style={{ color: "#F0F8FF" }}>Как это работает</h2>
            </div>
          </Reveal>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-0">
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center flex-1 w-full">
                <Reveal delay={i * 150} className="flex-1 w-full">
                  <div className="card-float rounded-2xl p-8 text-center"
                    style={{ background: "#0D3B6E", border: "1px solid rgba(0,180,216,0.2)" }}>
                    {/* Circle number */}
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 font-black text-2xl animate-pulse-orange"
                      style={{ background: "linear-gradient(135deg, #E8650A, #FF7A1A)", color: "#fff" }}>
                      {s.n}
                    </div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                      style={{ background: "rgba(0,180,216,0.15)" }}>
                      <Icon name={s.icon} size={24} style={{ color: "#00B4D8" }} />
                    </div>
                    <h3 className="font-black text-xl mb-2" style={{ color: "#F0F8FF" }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#90E0EF" }}>{s.desc}</p>
                  </div>
                </Reveal>
                {i < steps.length - 1 && (
                  <div className="step-line hidden md:block" style={{ minWidth: 32 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Wave color="#0D3B6E" />

      {/* ──────────── 5. РЕЖИМЫ МОЙКИ ──────────── */}
      <section id="prices" style={{ background: "#0D3B6E" }} className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#E8650A" }}>Что выбрать</span>
              <h2 className="text-4xl sm:text-5xl font-black mt-2" style={{ color: "#F0F8FF" }}>Режимы мойки</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {modes.map((m, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="card-float rounded-2xl p-7 flex gap-5 h-full"
                  style={{ background: "rgba(10,22,40,0.6)", border: "1px solid rgba(0,180,216,0.3)" }}>
                  <div className="text-4xl flex-shrink-0 mt-1">{m.emoji}</div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#E8650A" }}>{m.num}</span>
                    <h3 className="font-black text-xl mt-1 mb-2" style={{ color: "#F0F8FF" }}>{m.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#90E0EF" }}>{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Wave flip color="#0A1628" />

      {/* ──────────── 6. КАРТА КЛИЕНТА ──────────── */}
      <section id="card" style={{ background: "#0A1628" }} className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#E8650A" }}>Для постоянных гостей</span>
              <h2 className="text-4xl sm:text-5xl font-black mt-2 mb-5" style={{ color: "#F0F8FF" }}>Карта клиента NAUTILUS</h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: "#90E0EF" }}>
                Пополняй баланс — мой без наличных. Карта всегда с тобой: пополни онлайн, расплатись за секунду.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  { icon: "Wallet", text: "Пополнение баланса онлайн в любое время" },
                  { icon: "Smartphone", text: "Управление через мобильное приложение" },
                  { icon: "Gift", text: "Участие в розыгрышах для держателей карты" },
                  { icon: "Shield", text: "Безопасность и сохранность средств" },
                ].map((it, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(232,101,10,0.15)", border: "1px solid rgba(232,101,10,0.3)" }}>
                      <Icon name={it.icon} size={18} style={{ color: "#E8650A" }} />
                    </div>
                    <span className="font-medium" style={{ color: "#CAF0F8" }}>{it.text}</span>
                  </li>
                ))}
              </ul>
              <a href="https://vk.com/nautilus_avtomoika" target="_blank" rel="noopener noreferrer"
                className="btn-orange px-8 py-4 gap-2 text-base">
                <Icon name="ExternalLink" size={18} />
                Узнать подробнее в ВКонтакте
              </a>
            </Reveal>

            {/* Card mockup */}
            <Reveal>
              <div className="relative">
                <div className="absolute -inset-6 rounded-3xl blur-3xl opacity-30"
                  style={{ background: "radial-gradient(ellipse, #E8650A, #0D3B6E)" }} />
                <div className="relative rounded-3xl p-8 animate-float"
                  style={{ background: "linear-gradient(135deg, #0D3B6E 0%, #0A1628 100%)", border: "1px solid rgba(232,101,10,0.3)", aspectRatio: "16/9", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div className="flex justify-between items-start">
                    <img src={LOGO} alt="NAUTILUS" className="h-12 w-auto rounded-lg object-contain" />
                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(232,101,10,0.2)" }}>
                      <Icon name="CreditCard" size={20} style={{ color: "#E8650A" }} />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(240,248,255,0.4)" }}>Баланс</div>
                    <div className="font-black text-4xl mb-5 text-orange-gradient" style={{ WebkitTextFillColor: "initial", background: "none", color: "#E8650A" }}>₽ 1 250</div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(240,248,255,0.4)" }}>Владелец</div>
                        <div className="font-semibold" style={{ color: "#F0F8FF" }}>Ваше имя</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(240,248,255,0.4)" }}>Карта клиента</div>
                        <div className="text-sm" style={{ color: "rgba(240,248,255,0.5)" }}>**** 4892</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Wave color="#0D3B6E" />

      {/* ──────────── 7. ОТЗЫВЫ ──────────── */}
      <section id="reviews" style={{ background: "#0D3B6E" }} className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#E8650A" }}>Говорят клиенты</span>
              <h2 className="text-4xl sm:text-5xl font-black mt-2" style={{ color: "#F0F8FF" }}>Отзывы</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="card-float rounded-2xl p-7 h-full flex flex-col"
                  style={{ background: "rgba(10,22,40,0.6)", border: "1px solid rgba(0,180,216,0.2)" }}>
                  {/* Quote mark */}
                  <div className="text-5xl font-black leading-none mb-3" style={{ color: "#E8650A", lineHeight: 1 }}>"</div>
                  <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "#CAF0F8" }}>{r.text}</p>
                  {/* Stars */}
                  <div className="flex mb-4">
                    {Array.from({ length: r.stars }).map((_, si) => (
                      <span key={si} className="text-lg" style={{ color: "#E8650A" }}>★</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(232,101,10,0.2)", border: "1px solid rgba(232,101,10,0.3)" }}>
                      <Icon name="User" size={18} style={{ color: "#E8650A" }} />
                    </div>
                    <div>
                      <div className="font-bold text-sm" style={{ color: "#F0F8FF" }}>{r.name}</div>
                      <div className="text-xs" style={{ color: "#90E0EF" }}>{r.car}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Wave flip color="#0A1628" />

      {/* ──────────── 8. АКЦИИ / РОЗЫГРЫШИ ──────────── */}
      <section id="promo" style={{ background: "#0A1628" }} className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl p-10 sm:p-14 text-center shimmer-bg"
              style={{ border: "1px solid rgba(232,101,10,0.3)" }}>
              {/* Glow overlay */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(232,101,10,0.12) 0%, transparent 80%)" }} />

              <div className="relative z-10">
                <div className="text-5xl mb-4">🎁</div>
                <span className="inline-block text-xs font-black px-3 py-1 rounded-full mb-4 uppercase tracking-widest"
                  style={{ background: "#E8650A", color: "#fff" }}>
                  Розыгрыш
                </span>
                <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: "#F0F8FF" }}>
                  Следи за розыгрышами<br />в нашей группе ВКонтакте
                </h2>
                <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "#CAF0F8" }}>
                  Ежемесячно разыгрываем призы среди клиентов с картой. Победители объявляются в группе ВКонтакте.
                </p>
                <a href="https://vk.com/nautilus_avtomoika" target="_blank" rel="noopener noreferrer"
                  className="btn-orange px-10 py-4 text-lg gap-2 justify-center">
                  <Icon name="ExternalLink" size={20} />
                  Перейти в ВКонтакте
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Wave color="#0D3B6E" />

      {/* ──────────── 9. КАРТА И КОНТАКТЫ ──────────── */}
      <section id="contact" style={{ background: "#0D3B6E" }} className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#E8650A" }}>Мы на карте</span>
              <h2 className="text-4xl sm:text-5xl font-black mt-2" style={{ color: "#F0F8FF" }}>Как нас найти</h2>
            </div>
          </Reveal>

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {[
              { icon: "MapPin", label: "Адрес", val: "Самара, Кошелев-Парк / Крутые Ключи" },
              { icon: "Clock",  label: "Режим работы", val: "Круглосуточно, 24/7 без выходных" },
              { icon: "Users",  label: "ВКонтакте", val: "vk.com/nautilus_avtomoika", link: "https://vk.com/nautilus_avtomoika" },
            ].map((it, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="rounded-2xl p-5 flex items-center gap-4"
                  style={{ background: "rgba(10,22,40,0.5)", border: "1px solid rgba(0,180,216,0.2)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(232,101,10,0.15)", border: "1px solid rgba(232,101,10,0.3)" }}>
                    <Icon name={it.icon} size={22} style={{ color: "#E8650A" }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: "#E8650A" }}>{it.label}</div>
                    {it.link ? (
                      <a href={it.link} target="_blank" rel="noopener noreferrer"
                        className="font-bold text-sm hover:underline" style={{ color: "#CAF0F8" }}>{it.val}</a>
                    ) : (
                      <div className="font-bold text-sm" style={{ color: "#CAF0F8" }}>{it.val}</div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Yandex map */}
          <Reveal>
            <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ height: 380, border: "1px solid rgba(0,180,216,0.2)" }}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?text=NAUTILUS+%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B9%D0%BA%D0%B0+%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%B0+%D0%9A%D0%BE%D1%88%D0%B5%D0%BB%D0%B5%D0%B2-%D0%9F%D0%B0%D1%80%D0%BA&z=14"
                width="100%" height="100%" frameBorder="0" allowFullScreen title="NAUTILUS на карте"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──────────── 10. ФУТЕР ──────────── */}
      <footer style={{ background: "#040d1a", borderTop: "1px solid rgba(232,101,10,0.15)" }} className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={LOGO} alt="NAUTILUS" className="h-10 w-auto rounded-lg object-contain" />
              <div>
                <div className="font-black text-lg" style={{ color: "#F0F8FF" }}>NAUTILUS</div>
                <div className="text-xs" style={{ color: "#90E0EF" }}>Мойка самообслуживания</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm" style={{ color: "rgba(240,248,255,0.5)" }}>
              <a href="https://vk.com/nautilus_avtomoika" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-orange-400">
                <Icon name="Users" size={16} />
                ВКонтакте
              </a>
              <span>·</span>
              <span>Самара, Кошелев-Парк</span>
              <span>·</span>
              <span>24/7</span>
            </div>

            <div className="text-sm" style={{ color: "rgba(240,248,255,0.3)" }}>
              © 2025 NAUTILUS. Все права защищены.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
