import "../index.css";

type AboutProps = {
  onBack: () => void;
};

function About({ onBack }: AboutProps) {
  return (
    <main className="about-page">
      <div className="about-container">

        {/* Header */}
        <div className="about-header">
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>

          <span className="about-label">ABOUT</span>
        </div>

        {/* Hero */}
        <section className="about-hero">
          <div className="about-icon">🍌</div>

          <h1>
            Meet <span>Stupid AI</span>
          </h1>

          <p className="about-subtitle">
            An AI that is deliberately terrible at being an AI.
          </p>
        </section>

        {/* What is Stupid AI */}
        <section className="about-section">
          <h2>What is Stupid AI?</h2>

          <p>
            Stupid AI is an experimental AI project built around a
            deliberately ridiculous idea:
          </p>

          <blockquote>
            What happens when you build an AI whose job is to be
            confidently wrong?
          </blockquote>

          <p>
            Instead of trying to provide the most accurate answer,
            Stupid AI generates answers that are absurd, humorous,
            and confidently incorrect — while still attempting to
            understand what you asked.
          </p>
        </section>

        {/* Why */}
        <section className="about-section">
          <h2>Why build something this stupid?</h2>

          <p>
            Because building software doesn't always have to solve
            a serious problem.
          </p>

          <p>
            Stupid AI started as a fun experiment and became a way
            to explore how modern AI applications are actually built.
            Behind the ridiculous answers are real engineering
            concepts.
          </p>
        </section>

        {/* How it works */}
        <section className="about-section">
          <h2>How does it work?</h2>

          <div className="about-flow">

            <div className="about-step">
              <span className="step-number">01</span>
              <div>
                <h3>You ask something</h3>
                <p>
                  Send Stupid AI a perfectly reasonable question.
                </p>
              </div>
            </div>

            <div className="flow-arrow">↓</div>

            <div className="about-step">
              <span className="step-number">02</span>
              <div>
                <h3>The AI misunderstands it</h3>
                <p>
                  The model is instructed to produce an absurd
                  but question-related answer.
                </p>
              </div>
            </div>

            <div className="flow-arrow">↓</div>

            <div className="about-step">
              <span className="step-number">03</span>
              <div>
                <h3>Stupidity is evaluated</h3>
                <p>
                  The Stupidity Judge checks whether the response
                  actually meets the project's idea of stupid.
                </p>
              </div>
            </div>

            <div className="flow-arrow">↓</div>

            <div className="about-step final-step">
              <span className="step-number">04</span>
              <div>
                <h3>You receive something stupid</h3>
                <p>
                  Hopefully something funny enough to justify
                  building an entire AI for it.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Technical side */}
        <section className="about-section">
          <h2>What's behind the banana?</h2>

          <div className="tech-grid">

            <div className="tech-card">
              <span>🧠</span>
              <h3>AI Generation</h3>
              <p>
                A language model generates the deliberately absurd
                responses.
              </p>
            </div>

            <div className="tech-card">
              <span>⚙️</span>
              <h3>Backend</h3>
              <p>
                A Node.js and Express backend handles requests,
                validation, and communication with the AI API.
              </p>
            </div>

            <div className="tech-card">
              <span>🔍</span>
              <h3>Stupidity Judge</h3>
              <p>
                An evaluation layer determines whether an answer
                is sufficiently stupid.
              </p>
            </div>

            <div className="tech-card">
              <span>🛡️</span>
              <h3>Rate Limiting</h3>
              <p>
                Usage limits help prevent the project from
                accidentally burning through API resources.
              </p>
            </div>

          </div>
        </section>

        {/* Philosophy */}
        <section className="about-section about-philosophy">
          <div className="philosophy-icon">🍌</div>

          <h2>Built for fun. Built to learn.</h2>

          <p>
            Stupid AI is an independent student project.
            It isn't trying to replace serious AI assistants.
          </p>

          <p>
            It's simply an excuse to experiment, build things,
            break things, learn how AI applications work, and
            occasionally make a banana explain computer science.
          </p>
        </section>

        {/* Footer */}
        <footer className="about-footer">
          <p>
            Stupid AI · An independent experimental project
          </p>

          <button
            className="back-button footer-back"
            onClick={onBack}
          >
            ← Back to Stupid AI
          </button>
        </footer>

      </div>
    </main>
  );
}

export default About;