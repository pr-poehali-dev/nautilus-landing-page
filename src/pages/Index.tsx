import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/de4ec9e6-f029-4cd2-962a-312eb30cc6e4/files/0f232b06-0a3c-4606-8cef-8f509941644a.jpg";

function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

const advantages = [
  { emoji: "🕐", title: "Работаем 24/7", desc: "Без выходных и перерывов. Ночь, утро, праздник — мы всегда открыты." },
  { emoji: "🧴", title: "Профхимия", desc: "Профессиональная автохимия для бережного и эффективного мытья." },
  { emoji: "🃏", title: "Карта клиента", desc: "Пополняй баланс, копи и трать удобно через карту или приложение." },
  { emoji: "❄️", title: "Зимний режим", desc: "Специальный режим мойки для защиты кузова в холодное время года." },
];

const modes = [
  { num: "01", title: "Предварительная мойка", desc: "Размягчение загрязнений перед основным мытьём", icon: "Waves" },
  { num: "02", title: "Пенная шапка", desc: "Активная пена для глубокого очищения (сезонно)", icon: "Sparkles" },
  { num: "03", title: "Смыв / ополаскивание", desc: "Чистое смывание химии и загрязнений с кузова", icon: "Droplets" },
  { num: "04", title: "Зимний режим", desc: "Деликатный подогрев и антиобледенительный состав", icon: "Snowflake" },
];

const steps = [
  { step: "01", title: "Приехал", desc: "Заезжай на свободный пост в любое удобное время — очередей нет", icon: "Car" },
  { step: "02", title: "Выбрал режим", desc: "Выбери нужный режим на панели: от предварительной до зимней мойки", icon: "SlidersHorizontal" },
  { step: "03", title: "Помыл сам", desc: "Мой так, как нравится именно тебе — сколько нужно, как нужно", icon: "Sparkles" },
];

const reviews = [
  { name: "Алексей К.", car: "Toyota Camry", text: "Отличная мойка! Всегда чисто, оборудование работает без сбоев. Зимний режим — просто находка, после солёных дорог машина как новая.", stars: 5 },
  { name: "Марина В.", car: "Kia Rio", text: "Удобно, что 24/7. Езжу после работы поздно вечером — никаких проблем. Карта клиента очень удобная, всегда деньги на балансе.", stars: 5 },
  { name: "Дмитрий Н.", car: "BMW X5", text: "Наконец-то в Кошелев-Парке нормальная мойка самообслуживания. Химия хорошая, давление отличное. Рекомендую всем соседям!", stars: 5 },
];

const navLinks = [
  { href: "#advantages", label: "Преимущества" },
  { href: "#modes", label: "Режимы" },
  { href: "#how", label: "Как работает" },
  { href: "#card", label: "Карта" },
  { href: "#location", label: "Локация" },
  { href: "#contact", label: "Контакты" },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-montserrat min-h-screen bg-white text-gray-900">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nautilus-navy/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <span className="text-white font-black text-xl tracking-tight">
            <span className="text-nautilus-teal">N</span>AUTILUS
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-nautilus-teal transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <button className="md:hidden text-white p-1" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-nautilus-navy border-t border-white/10 px-4 py-4 flex flex-col gap-4 text-white/80 text-sm font-medium">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="hover:text-nautilus-teal transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16" style={{ background: "linear-gradient(160deg, #051525 0%, #0D2B4E 40%, #0F3460 70%, #1a4a7a 100%)" }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-nautilus-navy/80" />

        <div className="absolute top-24 right-8 w-72 h-72 rounded-full border border-nautilus-teal/20 opacity-40 pointer-events-none" />
        <div className="absolute top-36 right-16 w-48 h-48 rounded-full border border-nautilus-teal/30 opacity-30 pointer-events-none" />
        <div className="absolute bottom-24 left-8 w-56 h-56 rounded-full border border-white/10 opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-nautilus-teal/20 border border-nautilus-teal/40 rounded-full px-4 py-1.5 text-nautilus-teal text-sm font-semibold mb-8">
              <span className="w-2 h-2 bg-nautilus-teal rounded-full animate-pulse" />
              Открыто сейчас · 24/7
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
              Помой сам —
              <br />
              <span style={{ background: "linear-gradient(135deg, #00C9B1, #00E5CC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                так, как
              </span>
              <br />
              нравится тебе
            </h1>

            <p className="text-white/70 text-lg sm:text-xl font-medium mb-10">
              Мойка самообслуживания <span className="text-white font-bold">NAUTILUS</span>
              <br />
              в Самаре · Кошелев-Парк / Крутые Ключи
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#location"
                className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-xl text-base transition-all duration-300 hover:scale-105"
                style={{ background: "#00C9B1", color: "#0D2B4E", boxShadow: "0 0 30px rgba(0,201,177,0.3)" }}
              >
                <Icon name="MapPin" size={18} />
                Узнать адрес
              </a>
              <a
                href="#modes"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-300 border border-white/20"
              >
                <Icon name="ChevronDown" size={18} />
                Режимы мойки
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce pointer-events-none">
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#00C9B1" }}>Почему NAUTILUS</span>
              <h2 className="text-4xl sm:text-5xl font-black mt-3" style={{ color: "#0D2B4E" }}>Наши преимущества</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, i) => (
              <AnimatedSection key={i}>
                <div className="card-hover bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm h-full">
                  <div className="text-4xl mb-4">{adv.emoji}</div>
                  <h3 className="font-black text-lg mb-3" style={{ color: "#0D2B4E" }}>{adv.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{adv.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* MODES */}
      <section id="modes" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#00C9B1" }}>Что мы предлагаем</span>
              <h2 className="text-4xl sm:text-5xl font-black mt-3" style={{ color: "#0D2B4E" }}>Режимы мойки</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {modes.map((mode, i) => (
              <AnimatedSection key={i}>
                <div className="card-hover bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex items-start gap-6 h-full">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: "#0D2B4E" }}>
                    <Icon name={mode.icon} size={24} style={{ color: "#00C9B1" }} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#00C9B1" }}>{mode.num}</span>
                    <h3 className="font-black text-xl mt-1 mb-2" style={{ color: "#0D2B4E" }}>{mode.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{mode.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24" style={{ background: "linear-gradient(135deg, #0D2B4E 0%, #0F3460 50%, #1A3D6B 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#00C9B1" }}>Просто и быстро</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mt-3">Как это работает</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <AnimatedSection key={i}>
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    style={{ background: "#00C9B1", boxShadow: "0 0 30px rgba(0,201,177,0.3)" }}
                  >
                    <Icon name={s.icon} size={28} style={{ color: "#0D2B4E" }} />
                  </div>
                  <div className="text-5xl font-black mb-2" style={{ color: "rgba(0,201,177,0.3)" }}>{s.step}</div>
                  <h3 className="text-white font-black text-2xl mb-3">{s.title}</h3>
                  <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* LOYALTY CARD */}
      <section id="card" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#00C9B1" }}>Для постоянных клиентов</span>
              <h2 className="text-4xl sm:text-5xl font-black mt-3 mb-6" style={{ color: "#0D2B4E" }}>Карта клиента NAUTILUS</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Забудь о наличных. Карта клиента NAUTILUS — это удобный баланс, который всегда с тобой. Пополняй онлайн, трать на мойку.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: "Wallet", text: "Пополнение баланса в любое время" },
                  { icon: "Smartphone", text: "Управление через мобильное приложение" },
                  { icon: "Gift", text: "Бонусы и скидки для держателей карты" },
                  { icon: "Shield", text: "Безопасность и защита средств" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#0D2B4E" }}>
                      <Icon name={item.icon} size={18} style={{ color: "#00C9B1" }} />
                    </div>
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-30" style={{ background: "linear-gradient(135deg, #00C9B1, #0D2B4E)" }} />
                <div className="relative rounded-3xl p-8 shadow-2xl" style={{ background: "linear-gradient(135deg, #0D2B4E, #0F3460)", aspectRatio: "16/9", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div className="flex justify-between items-start">
                    <span className="text-white font-black text-2xl tracking-tight">
                      <span style={{ color: "#00C9B1" }}>N</span>AUTILUS
                    </span>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(0,201,177,0.2)" }}>
                      <Icon name="Waves" size={20} style={{ color: "#00C9B1" }} />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Баланс карты</div>
                    <div className="font-black text-4xl mb-6" style={{ color: "#00C9B1" }}>₽ 1 250</div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Владелец</div>
                        <div className="text-white font-semibold">Ваше имя</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Карта клиента</div>
                        <div className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>**** 4892</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#00C9B1" }}>Мы на карте</span>
              <h2 className="text-4xl sm:text-5xl font-black mt-3" style={{ color: "#0D2B4E" }}>Как нас найти</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: "MapPin", title: "Адрес", text: "Самара, район Кошелев-Парк / Крутые Ключи" },
              { icon: "Clock", title: "Режим работы", text: "Круглосуточно, 24/7 без выходных" },
              { icon: "Car", title: "Парковка", text: "Свободные посты, подъезд без очереди" },
            ].map((item, i) => (
              <AnimatedSection key={i}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#0D2B4E" }}>
                    <Icon name={item.icon} size={22} style={{ color: "#00C9B1" }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#00C9B1" }}>{item.title}</div>
                    <div className="font-bold text-sm" style={{ color: "#0D2B4E" }}>{item.text}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200" style={{ height: "360px" }}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?text=NAUTILUS+%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B9%D0%BA%D0%B0+%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%B0+%D0%9A%D0%BE%D1%88%D0%B5%D0%BB%D0%B5%D0%B2-%D0%9F%D0%B0%D1%80%D0%BA&z=14"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="NAUTILUS на карте"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#00C9B1" }}>Говорят клиенты</span>
              <h2 className="text-4xl sm:text-5xl font-black mt-3" style={{ color: "#0D2B4E" }}>Отзывы</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <AnimatedSection key={i}>
                <div className="card-hover bg-gray-50 rounded-2xl p-8 border border-gray-100 h-full flex flex-col">
                  <div className="flex mb-4">
                    {Array.from({ length: r.stars }).map((_, si) => (
                      <span key={si} className="text-lg" style={{ color: "#00C9B1" }}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic flex-1">"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#0D2B4E" }}>
                      <Icon name="User" size={18} style={{ color: "#00C9B1" }} />
                    </div>
                    <div>
                      <div className="font-bold text-sm" style={{ color: "#0D2B4E" }}>{r.name}</div>
                      <div className="text-gray-400 text-xs">{r.car}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROMOTIONS */}
      <section id="promo" className="py-24" style={{ background: "linear-gradient(135deg, #0D2B4E 0%, #0F3460 50%, #1A3D6B 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#00C9B1" }}>Не пропусти</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mt-3">Акции и события</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <AnimatedSection>
              <div className="card-hover rounded-2xl p-8 h-full" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <div className="text-3xl mb-4">🎁</div>
                <div className="inline-block text-xs font-black px-3 py-1 rounded-full mb-4 uppercase tracking-widest" style={{ background: "#00C9B1", color: "#0D2B4E" }}>Розыгрыш</div>
                <h3 className="text-white font-black text-2xl mb-3">Ежемесячный розыгрыш</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Каждый месяц среди клиентов с картой проводим розыгрыш призов. Следи за нашей группой ВКонтакте — победители объявляются там!
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="card-hover rounded-2xl p-8 h-full" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <div className="text-3xl mb-4">📱</div>
                <div className="inline-block text-xs font-black px-3 py-1 rounded-full mb-4 uppercase tracking-widest" style={{ background: "#00C9B1", color: "#0D2B4E" }}>Новинка</div>
                <h3 className="text-white font-black text-2xl mb-3">Мобильное приложение</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Управляй картой клиента, проверяй баланс и узнавай об акциях через мобильное приложение NAUTILUS. Удобно и быстро.
                </p>
              </div>
            </AnimatedSection>
          </div>
          <AnimatedSection>
            <div className="text-center">
              <a
                href="https://vk.com/nautilus_avtomoika"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
                style={{ background: "#00C9B1", color: "#0D2B4E" }}
              >
                <Icon name="Users" size={20} />
                Следить за акциями ВКонтакте
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#00C9B1" }}>Остались вопросы?</span>
            <h2 className="text-4xl sm:text-5xl font-black mt-3 mb-6" style={{ color: "#0D2B4E" }}>Свяжись с нами</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              Мы в ВКонтакте — пиши нам, задавай вопросы, смотри актуальные акции и следи за новостями мойки.
            </p>
            <a
              href="https://vk.com/nautilus_avtomoika"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white font-bold px-10 py-5 rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-xl"
              style={{ background: "#0D2B4E" }}
            >
              <Icon name="MessageCircle" size={22} />
              Написать ВКонтакте
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-white/10" style={{ background: "#0D2B4E" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-white font-black text-xl tracking-tight">
              <span style={{ color: "#00C9B1" }}>N</span>AUTILUS
              <span className="text-white/30 text-sm font-normal ml-3">Мойка самообслуживания</span>
            </span>
            <div className="flex items-center gap-6 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              <a href="https://vk.com/nautilus_avtomoika" target="_blank" rel="noopener noreferrer" className="hover:text-nautilus-teal transition-colors flex items-center gap-2">
                <Icon name="Users" size={16} />
                ВКонтакте
              </a>
              <span>·</span>
              <span>Самара, Кошелев-Парк</span>
              <span>·</span>
              <span>24/7</span>
            </div>
            <div className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
              © 2025 NAUTILUS. Все права защищены.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}