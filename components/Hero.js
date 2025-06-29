import '../styles/Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-image-wrapper">
        <img
          src="/Portfolio.jpg" // <-- replace with your image path (public folder)
          alt="Diluka Athukorala"
          className="hero-image"
        />
      </div>
      <h1 className="hero-title">Diluka Athukorala</h1>
      <p className="hero-subtitle">
        <span style={{ color: 'white', fontWeight: '600' }}>
          Full-Stack Web Developer
        </span>
      </p>
    </section>
  );
}
