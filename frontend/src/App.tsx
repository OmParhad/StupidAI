import { useEffect, useState, type KeyboardEvent } from "react";
import "./index.css";

import About from "./Legal/About";
import Disclaimer from "./Legal/Disclamier";
import License from "./Legal/Licenses";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Theme = "light" | "dark";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [showAbout, setShowAbout] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showLicense, setShowLicense] = useState(false);

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("stupid-gpt-theme");

    return savedTheme === "dark" ? "dark" : "light";
  });

  // Save theme
  useEffect(() => {
    localStorage.setItem("stupid-gpt-theme", theme);
  }, [theme]);

  // Toggle light / dark mode
  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  };

  // Send message to backend
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: input,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.answer,
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "The stupidity engine exploded. 💥🧠",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Enter = send
  // Shift + Enter = new line
  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendMessage();
    }
  };

  /*
   * ==========================================
   * ABOUT PAGE
   * ==========================================
   */

  if (showAbout) {
    return (
      <div className={`app ${theme}`}>
        <About
          onBack={() => setShowAbout(false)}
        />
      </div>
    );
  }

  /*
   * ==========================================
   * DISCLAIMER PAGE
   * ==========================================
   */

  if (showDisclaimer) {
    return (
      <div className={`app ${theme}`}>
        <Disclaimer
          onBack={() => setShowDisclaimer(false)}
        />
      </div>
    );
  }

  /*
   * ==========================================
   * LICENSE PAGE
   * ==========================================
   */

  if (showLicense) {
    return (
      <div className={`app ${theme}`}>
        <License
          onBack={() => setShowLicense(false)}
        />
      </div>
    );
  }

  /*
   * ==========================================
   * MAIN APP
   * ==========================================
   */

  return (
    <div className={`app ${theme}`}>

      {/* Header */}

      <header className="header">

        <div className="header-left">
          <div className="logo">
            Stupid AI
          </div>
        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${
            theme === "light"
              ? "dark"
              : "light"
          } mode`}
          title={`Switch to ${
            theme === "light"
              ? "dark"
              : "light"
          } mode`}
        >
          {theme === "light"
            ? "🌙"
            : "☀️"}
        </button>

      </header>

      {/* Chat */}

      <main className="chat-container">

        {messages.length === 0 ? (

          <div className="welcome">

            <div className="welcome-icon">
              🍌
            </div>

            <h1>
              Welcome to Stupid AI
            </h1>

            <p>
              Ask anything. Receive something
              confidently stupid.
            </p>

            <div className="examples">

              <button
                onClick={() =>
                  setInput(
                    "What keeps the doctor away?"
                  )
                }
              >
                What keeps the doctor away?
              </button>

              <button
                onClick={() =>
                  setInput(
                    "Why is the sky blue?"
                  )
                }
              >
                Why is the sky blue?
              </button>

              <button
                onClick={() =>
                  setInput(
                    "What is a computer?"
                  )
                }
              >
                What is a computer?
              </button>

            </div>

          </div>

        ) : (

          <div className="messages">

            {messages.map(
              (message, index) => (

                <div
                  key={index}
                  className={`message ${message.role}`}
                >

                  <div className="message-label">
                    {message.role === "user"
                      ? "You"
                      : "Stupid AI"}
                  </div>

                  <div className="message-content">
                    {message.content}
                  </div>

                </div>

              )
            )}

            {loading && (

              <div className="message assistant">

                <div className="message-label">
                  Stupid AI
                </div>

                <div className="message-content">
                  Thinking incorrectly... 🤔
                </div>

              </div>

            )}

          </div>

        )}

      </main>

      {/* Input */}

      <div className="input-area">

        <div className="input-box">

          <textarea
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Ask something... preferably something complicated."
            rows={1}
            disabled={loading}
          />

          <button
            onClick={sendMessage}
            disabled={
              !input.trim() || loading
            }
          >
            ↑
          </button>

        </div>

        {/* Disclaimer / Legal Links */}

        <div className="disclaimer">

          <p>
            Stupid AI intentionally generates
            absurd and incorrect answers.
            Do not rely on its responses for
            important decisions.
          </p>

          <div className="legal-links">

            <span>
              © 2026 Om Parhad
            </span>

            <span>·</span>

            <span>
              v1.0.0
            </span>

            <span>·</span>

            <button
              className="legal-link"
              onClick={() =>
                setShowAbout(true)
              }
            >
              About
            </button>

            <span>·</span>

            <button
              className="legal-link"
              onClick={() =>
                setShowDisclaimer(true)
              }
            >
              Disclaimer & Legal Notice
            </button>

            <span>·</span>

            <button
              className="legal-link"
              onClick={() =>
                setShowLicense(true)
              }
            >
              MIT License
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;