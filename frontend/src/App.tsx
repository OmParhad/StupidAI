import { useState } from "react";
import "./index.css";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.answer,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "The stupidity engine exploded. 💥🧠",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          🧠 Stupid GPT
        </div>

        <div className="status">
          ● Stupidity Engine Online
        </div>
      </header>

      <main className="chat-container">
        {messages.length === 0 ? (
          <div className="welcome">
            <div className="welcome-icon">🍌</div>

            <h1>Welcome to Stupid GPT</h1>

            <p>
              Ask anything. Receive something confidently stupid.
            </p>

            <div className="examples">
              <button
                onClick={() =>
                  setInput("What keeps the doctor away?")
                }
              >
                What keeps the doctor away?
              </button>

              <button
                onClick={() =>
                  setInput("Why is the sky blue?")
                }
              >
                Why is the sky blue?
              </button>

              <button
                onClick={() =>
                  setInput("What is a computer?")
                }
              >
                What is a computer?
              </button>
            </div>
          </div>
        ) : (
          <div className="messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role}`}
              >
                <div className="message-label">
                  {message.role === "user"
                    ? "You"
                    : "Stupid GPT"}
                </div>

                <div className="message-content">
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="message assistant">
                <div className="message-label">
                  Stupid GPT
                </div>

                <div className="message-content">
                  Thinking incorrectly... 🤔
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <div className="input-area">
        <div className="input-box">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something... preferably something complicated."
            rows={1}
            disabled={loading}
          />

          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
          >
            ↑
          </button>
        </div>

        <p className="disclaimer">
          Stupid GPT may confidently provide answers that are wrong.
        </p>
      </div>
    </div>
  );
}

export default App;