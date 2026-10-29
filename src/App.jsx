import { useState } from "react";
import { ArrowUpRight, Menu as MenuIcon, X, MapPin, Clock3, Phone } from "lucide-react";

const WA_LINK = "https://wa.me/923001234567?text=Assalam-o-alaikum%2C%20I%27d%20like%20to%20place%20an%20order%20from%20Zaiqa%20Grill%20%26%20Karahi.";

const dishes = [
  { name: "Chicken Tikka", category: "BBQ", price: 850, description: "Yogurt-marinated chicken, kissed by charcoal and served with fresh mint chutney.", image: "photo-1544025162-d76694265947", tag: "HOUSE FAVOURITE", featured: true },
  { name: "Chicken Karahi", category: "Karahi", price: 1650, description: "Ripe tomatoes, ginger and green chillies in our signature masala.", image: "photo-1603894584373-5ac82b2ae398", tag: "MADE TO ORDER", featured: true },
  { name: "Seekh Kebab", category: "BBQ", price: 750, description: "Hand-minced beef and warming spices, grilled to smoky perfection.", image: "photo-1529042410759-befb1204b468" },
  { name: "Chicken Biryani", category: "Rice", price: 550, description: "Fragrant basmati layered with slow-cooked masala and crisp golden onions.", image: "photo-1631515243349-e0cb75fb8d3a" },
  { name: "Mutton Karahi", category: "Karahi", price: 2800, description: "Tender mutton, crushed coriander and a deep, bold finish.", image: "photo-1565557623262-b51c2513a641", tag: "FAMILY SIZE", featured: true },
  { name: "Mint Lemonade", category: "Drinks", price: 350, description: "Fresh lemon and garden mint, bright, cooling and refreshing.", image: "photo-1546173159-315724a31696" },
  { name: "Chicken Pulao", category: "Rice", price: 500, description: "Aromatic yakhni rice with tender chicken and whole spices.", image: "photo-1512058564366-18510be2db19" },
  { name: "Shahi Kheer", category: "Desserts", price: 400, description: "Creamy rice pudding, slow-simmered with cardamom and toasted nuts.", image: "photo-1488477181946-6428a0291777" }
];
const filters = [
  { label: "All Favourites", value: "All" },
  { label: "From The Grill", value: "BBQ" },
  { label: "Karahi & Handi", value: "Karahi" },
  { label: "Rice", value: "Rice" },
  { label: "Drinks", value: "Drinks" },
  { label: "Desserts", value: "Desserts" }
];
const gallery = [
  ["photo-1555939594-58d7cb561ad1", "A table full of freshly prepared food"],
  ["photo-1529042410759-befb1204b468", "Grilled kebabs ready to serve"],
  ["photo-1544025162-d76694265947", "Smoky grilled meat with herbs"],
  ["photo-1565557623262-b51c2513a641", "A comforting bowl of curry"]
];
const photoUrl = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

function Eyebrow({ children, light = false }) {
  return <p className={`eyebrow ${light ? "light" : ""}`}><span />{children}</p>;
}
function Brand({ footer = false }) {
  return <a className={`brand ${footer ? "footer-brand" : ""}`} href="#home" aria-label="Zaiqa Grill and Karahi home">
    <span className="brand-mark">Z<span>✦</span></span>
    <span className="brand-name">ZAIQA <small>GRILL & KARAHI</small></span>
  </a>;
}
function DishCard({ dish }) {
  return <article className="dish-card">
    <div className="dish-image">
      <img src={photoUrl(dish.image, 800)} srcSet={`${photoUrl(dish.image, 500)} 500w, ${photoUrl(dish.image, 800)} 800w`} sizes="(max-width: 700px) 50vw, (max-width: 1050px) 50vw, 25vw" width="800" height="600" alt={dish.name} loading="lazy" decoding="async" onError={e => { e.currentTarget.style.visibility = "hidden"; }} />
      {dish.tag && <span className="dish-tag">{dish.tag}</span>}
    </div>
    <div className="dish-info">
      <div><h3>{dish.name}</h3><p>{dish.description}</p></div>
      <strong>Rs {dish.price.toLocaleString("en-PK")}</strong>
    </div>
  </article>;
}
const TIMES = ["12:00 PM", "1:00 PM", "2:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"];
const GUESTS = ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7+ guests"];

function Field({ id, label, error, children }) {
  return <div className="field">
    <label htmlFor={id}>{label}</label>
    {children}
    {error && <span className="field-error" id={`${id}-error`}>{error}</span>}
  </div>;
}

function ReservationForm() {
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const today = new Date();
  const minDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  function validate(data) {
    const next = {};
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const date = String(data.get("date") || "");
    if (name.length < 2) next.name = "Please enter your name (at least 2 characters).";
    if (!/^\+?[0-9()\s-]{7,20}$/.test(phone)) next.phone = "Enter a valid phone number, e.g. +92 300 1234567.";
    if (!date) next.date = "Please choose a date.";
    else if (date < minDate) next.date = "Please choose today or a future date.";
    if (!data.get("time")) next.time = "Please choose a time.";
    if (!data.get("guests")) next.guests = "Please select the number of guests.";
    return next;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next = validate(data);
    setErrors(next);
    setMessage("");
    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      form.elements.namedItem(firstInvalid)?.focus();
      return;
    }
    const name = String(data.get("name")).trim();
    const when = new Date(`${data.get("date")}T00:00`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
    setMessage(`Thank you, ${name}! We have noted a table for ${String(data.get("guests")).toLowerCase()} on ${when} at ${data.get("time")}. As this is a demo, no booking has been sent, so please call us to confirm your table.`);
    form.reset();
  }

  function clearError(event) {
    const { name } = event.target;
    if (errors[name]) setErrors(prev => { const copy = { ...prev }; delete copy[name]; return copy; });
  }

  const fieldProps = name => ({
    id: `res-${name}`,
    name,
    required: true,
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": errors[name] ? `res-${name}-error` : undefined
  });

  return <form className="reservation-form" onSubmit={handleSubmit} onChange={clearError} noValidate>
    <div className="form-title"><h3>Reserve your table</h3><p>Fill in your details below.</p></div>
    <div className="form-row">
      <Field id="res-name" label="Full name" error={errors.name}>
        <input {...fieldProps("name")} autoComplete="name" placeholder="Your name" />
      </Field>
      <Field id="res-phone" label="Phone number" error={errors.phone}>
        <input {...fieldProps("phone")} autoComplete="tel" type="tel" inputMode="tel" placeholder="+92 3XX XXXXXXX" />
      </Field>
    </div>
    <div className="form-row">
      <Field id="res-date" label="Date" error={errors.date}>
        <input {...fieldProps("date")} type="date" min={minDate} />
      </Field>
      <Field id="res-time" label="Time" error={errors.time}>
        <select {...fieldProps("time")} defaultValue=""><option value="" disabled>Choose a time</option>{TIMES.map(time => <option key={time}>{time}</option>)}</select>
      </Field>
    </div>
    <Field id="res-guests" label="Number of guests" error={errors.guests}>
      <select {...fieldProps("guests")} defaultValue=""><option value="" disabled>Select guests</option>{GUESTS.map(n => <option key={n}>{n}</option>)}</select>
    </Field>
    <button className="button button-dark submit-button" type="submit">Request A Reservation <ArrowUpRight size={16} /></button>
    <p className="form-note">Demo form only — your details are not sent to a server.</p>
    {message && <div className="form-message" role="status" aria-live="polite">{message}</div>}
  </form>;
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [navOpen, setNavOpen] = useState(false);
  const visibleDishes = activeFilter === "All" ? dishes : dishes.filter(d => d.category === activeFilter);
  const closeNav = () => setNavOpen(false);

  return <>
    <a className="skip-link" href="#main">Skip To Main Content</a>
    <div className="announcement"><span>ISLAMABAD · F-7 MARKAZ</span><span>Fresh from the flame, made for sharing</span><a href="#reservation">Book Your Table ↗</a></div>
    <header className="site-header">
      <Brand />
      <button className="menu-toggle" aria-label={navOpen ? "Close navigation" : "Open navigation"} aria-expanded={navOpen} onClick={() => setNavOpen(!navOpen)}>{navOpen ? <X /> : <MenuIcon />}</button>
      <nav className={`nav-links ${navOpen ? "open" : ""}`} aria-label="Main navigation">
        <a href="#menu" onClick={closeNav}>Our Menu</a><a href="#story" onClick={closeNav}>Our Story</a><a href="#gallery" onClick={closeNav}>Gallery</a><a href="#visit" onClick={closeNav}>Find Us</a>
        <a className="nav-book" href="#reservation" onClick={closeNav}>Reserve A Table <ArrowUpRight size={14} /></a>
      </nav>
    </header>

    <main id="main" tabIndex={-1}>
      <section className="hero" id="home">
        <img className="hero-photo" src={photoUrl("photo-1544025162-d76694265947", 1600)} srcSet={`${photoUrl("photo-1544025162-d76694265947", 800)} 800w, ${photoUrl("photo-1544025162-d76694265947", 1200)} 1200w, ${photoUrl("photo-1544025162-d76694265947", 1600)} 1600w`} sizes="(max-width: 700px) 100vw, 73vw" width="1600" height="1067" alt="Freshly grilled barbecue served with herbs and spices" fetchPriority="high" decoding="async" />
        <div className="hero-shade" />
          
        <div className="hero-content">
          <Eyebrow light>ZAIQA GRILL & KARAHI · ISLAMABAD</Eyebrow>
          <h1>Fire. Flavour.<br /><em>Family.</em></h1>
          <p className="hero-copy">From the first sizzle on the grill to the last scoop of karahi, pull up a chair and settle in. Your table is always set.</p>
          <div className="hero-actions">
            <a className="button button-gold" href="#reservation">Reserve A Table <ArrowUpRight size={16} /></a>
            <a className="button button-outline" href={WA_LINK} target="_blank" rel="noopener noreferrer">Order On WhatsApp <ArrowUpRight size={16} /></a>
          </div>
          <div className="hero-note"><span className="stars">★★★★★</span><span>Generous plates. Warm company. Every single visit.</span></div>
        </div>
        <div className="hero-side-note">MADE SLOW · SERVED HOT</div>
        <a className="scroll-cue" href="#menu"><span /> Scroll To Explore</a>
      </section>

      <div className="ticker"><span>CHARCOAL BBQ</span><b>✳</b><span>HANDI & KARAHI</span><b>✳</b><span>FAMILY FEASTS</span><b>✳</b><span>PAKISTANI SOUL</span><b>✳</b><span>CHARCOAL BBQ</span></div>

      <section className="section featured-section" id="featured" aria-labelledby="featured-title">
        <div className="section-heading"><div><Eyebrow>CHEF'S PICKS</Eyebrow><h2 id="featured-title">Featured<br /><em>from the fire.</em></h2></div><p className="section-intro">The plates our regulars ask for first. Enjoy them at the table, take them home, or order on WhatsApp.</p></div>
        <div className="featured-grid">{dishes.filter(d => d.featured).map(dish => <DishCard key={dish.name} dish={dish} />)}</div>
      </section>

      <section className="section menu-section" id="menu">
        <div className="section-heading"><div><Eyebrow>STRAIGHT FROM OUR KITCHEN</Eyebrow><h2>A menu worth<br /><em>gathering for.</em></h2></div><p className="section-intro">Bold flavours, honest ingredients and recipes made for passing around the table. Come hungry, leave happy.</p></div>
        <div className="menu-filters" role="group" aria-label="Filter menu by category">
          {filters.map(filter => <button key={filter.value} className={`filter ${activeFilter === filter.value ? "active" : ""}`} data-filter={filter.value} aria-pressed={activeFilter === filter.value} onClick={() => setActiveFilter(filter.value)}>{filter.label}</button>)}
        </div>
        <div className="menu-grid">{visibleDishes.map(dish => <DishCard key={dish.name} dish={dish} />)}</div>
        <p className="menu-footnote">Menu and prices are sample content for this demo restaurant. Please confirm availability when ordering.</p>
      </section>

      <section className="story-section" id="story">
        <div className="story-image"><img src={photoUrl("photo-1555939594-58d7cb561ad1", 1100)} width="1100" height="1400" alt="Friends sharing a meal around a table" loading="lazy" decoding="async" /><div className="image-stamp"><span>GOOD FOOD</span><b>♥</b><span>GOOD PEOPLE</span></div></div>
        <div className="story-copy"><Eyebrow>A LITTLE ABOUT US</Eyebrow><h2>Rooted in tradition.<br /><em>Made for today.</em></h2><p>At Zaiqa, food is how we bring people closer. Our kitchen draws on the smoky roadside dhabas and generous family tables we grew up loving, with fresh ingredients, bold spices and plenty of patience.</p><p>Whether it is a quick dinner, a family celebration or a long evening with old friends, there is always room for one more at our table.</p><a className="text-link" href="#reservation">Come Sit With Us <ArrowUpRight size={14} /></a><div className="story-signoff">Made with warmth, served with pride.</div></div>
      </section>

      <section className="gallery-section section" id="gallery">
        <div className="section-heading"><div><Eyebrow>A FEAST FOR THE EYES</Eyebrow><h2>A peek at the<br /><em>good stuff.</em></h2></div><p className="section-intro">The crackle of the grill, the colour of the spices, the joy of one more bite.</p></div>
        <div className="gallery-grid">{gallery.map(([id, alt]) => <img key={id} src={photoUrl(id, 900)} width="900" height="700" alt={alt} loading="lazy" decoding="async" />)}</div>
      </section>

      <section className="reviews-section"><div className="reviews-inner"><Eyebrow light>KIND WORDS (SAMPLE REVIEWS)</Eyebrow><h2>Good food has a<br /><em>way of bringing us back.</em></h2><div className="review-grid">
        <blockquote><div className="stars">★★★★★</div><p>“Rich, full-bodied karahi and naan that arrived piping hot. The perfect family dinner.”</p><footer>— Ayesha K. <small>Sample review</small></footer></blockquote>
        <blockquote><div className="stars">★★★★★</div><p>“Gloriously smoky BBQ in a relaxed setting. The mint chutney deserves a mention of its own.”</p><footer>— Hamza R. <small>Sample review</small></footer></blockquote>
        <blockquote><div className="stars">★★★★★</div><p>“Generous portions, gracious service and a lovely spot to catch up with friends over dinner.”</p><footer>— Sana M. <small>Sample review</small></footer></blockquote>
      </div></div></section>

      <section className="reservation-section section" id="reservation">
        <div className="reservation-copy"><Eyebrow>YOUR TABLE IS WAITING</Eyebrow><h2>Make it a<br /><em>meal to remember.</em></h2><p>Planning a family dinner or an evening with your favourite people? Tell us when you are coming and we will have your table ready.</p><div className="reservation-detail"><span>✳</span><div><b>Walk-ins are always welcome</b><small>Reservations are recommended for larger groups.</small></div></div></div>
        <ReservationForm />
      </section>

      <section className="visit-section" id="visit">
        <div className="visit-info"><Eyebrow light>COME FIND US</Eyebrow><h2>Pull up a chair.<br /><em>We’ll light the grill.</em></h2>
          <div className="visit-row"><MapPin className="visit-icon" /><div><b>Our location</b><p>F-7 Markaz, Islamabad, Pakistan</p><a href="https://www.google.com/maps/search/?api=1&query=F-7+Markaz+Islamabad+Pakistan" target="_blank" rel="noopener noreferrer">Get Directions ↗</a></div></div>
          <div className="visit-row"><Clock3 className="visit-icon" /><div><b>Opening hours</b><p>Every day · 12:00 PM – 11:30 PM</p></div></div>
          <div className="visit-row"><Phone className="visit-icon" /><div><b>Give us a call</b><p>+92 300 1234567</p><a href="tel:+923001234567">Call The Restaurant ↗</a></div></div>
        </div>
        <div className="map-frame"><iframe title="Map showing F-7 Markaz, Islamabad" src="https://maps.google.com/maps?q=F-7%20Markaz%2C%20Islamabad%2C%20Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><div className="map-caption"><span>📍</span><div><b>Zaiqa Grill & Karahi</b><small>F-7 Markaz · Islamabad</small></div></div></div>
      </section>
    </main>

    <footer className="site-footer"><div className="footer-top"><Brand footer /><p>Good food, warm company<br />and always a place at our table.</p><div className="social-links"><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook ↗</a></div></div><div className="footer-bottom"><span>© 2026 Zaiqa Grill & Karahi</span><span>Made with warmth in Islamabad.</span><a href="#home">Back To Top ↑</a></div></footer>
    <a className="mobile-order" href={WA_LINK} target="_blank" rel="noopener noreferrer"><span className="wa-icon">◉</span> Order On WhatsApp <span>↗</span></a>
  </>;

} 
