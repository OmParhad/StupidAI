import "../index.css";

type LicenseProps = {
  onBack: () => void;
};

function License({ onBack }: LicenseProps) {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>

          <span className="legal-label">LEGAL</span>
        </div>

        <section className="legal-hero">
          <div className="legal-icon">📜</div>

          <h1>MIT License</h1>

          <p>Copyright © 2026 Om Parhad</p>
        </section>

        <section className="legal-section">
          <h2>Permission</h2>

          <p>
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation
            files, to deal in the software without restriction, including
            without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and sell copies of the software.
          </p>

          <p>
            The software is provided "as is", without warranty of any kind,
            express or implied.
          </p>
        </section>

        <section className="legal-section">
          <h2>License Notice</h2>

          <p>
            This project is released under the MIT License. You are free to
            use, modify, distribute, and contribute to the project subject
            to the terms of the license.
          </p>

          <p>
            The complete license text is available in the <strong>LICENSE</strong>
            file included in the project repository.
          </p>
        </section>

        <footer className="legal-footer">
          <p>Stupid AI · Independent experimental student project</p>

          <button className="back-button" onClick={onBack}>
            ← Back to Stupid AI
          </button>
        </footer>
      </div>
    </main>
  );
}

export default License;