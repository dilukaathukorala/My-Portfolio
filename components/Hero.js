// File: Hero.js
import '../styles/Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        {/* Left Column */}
        <div className="hero-left">
          <p className="hero-intro">Welcome to my portfolio!</p>
          <h1 className="hero-title">
            Hello, my name’s <span className="highlight">Diluka</span>.
          </h1>
          <p className="hero-description">
            I'm a full-stack web developer from Sri Lanka. <br />
            Currently studying at <span className="mention">Sri Lanka Institute of Information Technoilogy</span> as a IT Specialist.
          </p>

          <div className="hero-buttons">
            <a href="/Diluka_CV.pdf" className="btn primary" download>Download CV</a>
            <a href="#portfolio" className="btn secondary">See my work →</a>
          </div>

        </div>

        {/* Right Column */}
        <div className="hero-right">
          <div className="back-ray-emitter">
            {[...Array(120)].map((_, i) => (
              <div
                key={i}
                className="dot-ray"
                style={{
                  transform: `rotate(${(360 / 120) * i}deg)`,
                  '--i': Math.floor(Math.random() * 5),
                  '--dot-size': `${4 + Math.random() * 3}px`,
                  '--speed': `${3 + Math.random()}1s`
                }}
              />
            ))}
          </div>


          <div className="hero-image-frame">
            <img
              src="/Portfolio.jpg"
              alt="Diluka Athukorala"
              className="hero-image"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
