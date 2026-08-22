import { useState, useMemo } from "react";
import { faqs, caseStories } from "../data/knowledgeHub";

const colors = ["#5B5FDE", "#FFC700", "#2ECC71", "#FF6B6B"];

function KnowledgeHub() {
  const [openFaq, setOpenFaq] = useState(null);
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();

  const filteredFaqs = useMemo(() => {
    if (!query) return faqs;
    return faqs.filter(
      (f) =>
        f.q.toLowerCase().includes(query) ||
        f.a.toLowerCase().includes(query)
    );
  }, [query]);

  const filteredStories = useMemo(() => {
    if (!query) return caseStories;
    return caseStories.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.summary.toLowerCase().includes(query) ||
        s.tags.some((t) => t.toLowerCase().includes(query))
    );
  }, [query]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F9FD",
        padding: "1.5rem 1rem 4rem",
        fontFamily: "var(--sans)",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Hero */}
        <div
          style={{
            background: "linear-gradient(135deg, #5B5FDE, #5B5FDECC)",
            borderRadius: "28px",
            padding: "2rem",
            color: "#FFFFFF",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 12px 30px #5B5FDE35",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              right: "-45px",
              top: "-45px",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.10)",
              left: "-30px",
              bottom: "-30px",
            }}
          />

          <div style={{ fontSize: "3rem", marginBottom: "0.5rem", position: "relative", zIndex: 1 }}>
            📚
          </div>

          <h1
            style={{
              margin: "0 0 0.5rem",
              fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
              fontWeight: 800,
              lineHeight: "1.2",
              padding: "0.1em 0",
              position: "relative",
              zIndex: 1,
              fontFamily: "var(--heading)",
            }}
          >
            Knowledge Hub
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: "1rem",
              opacity: 0.9,
              fontWeight: 600,
              position: "relative",
              zIndex: 1,
            }}
          >
            Your digital library of rights, answers, and real stories.
          </p>
        </div>

        {/* Search Bar */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "999px",
            padding: "0.9rem 1.3rem",
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            boxShadow: "0 8px 24px rgba(91, 95, 222, 0.08)",
            border: "2px solid #EEF0FF",
            marginBottom: "1.8rem",
          }}
        >
          <span style={{ fontSize: "1.1rem" }}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs or case stories..."
            style={{
              border: "none",
              outline: "none",
              flex: 1,
              fontSize: "0.95rem",
              color: "#08060D",
              background: "transparent",
              fontFamily: "var(--sans)",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                border: "none",
                background: "#F0F0F5",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                cursor: "pointer",
                color: "#6B6375",
                fontWeight: 700,
                fontSize: "0.8rem",
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* FAQ Section */}
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "12px",
                background: "#FFF4CC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ❓
            </span>
            <h2 style={{ margin: 0, color: "#08060D", fontSize: "1.3rem", fontWeight: 800, fontFamily: "var(--heading)" }}>
              FAQs
            </h2>
          </div>

          {filteredFaqs.length === 0 && (
            <p style={{ color: "#6B6375", fontSize: "0.9rem" }}>
              No FAQs match your search.
            </p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {filteredFaqs.map((item, i) => {
              const isOpen = openFaq === item.id;
              const accent = colors[i % colors.length];
              return (
                <div
                  key={item.id}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "18px",
                    border: "2px solid #EEF0FF",
                    boxShadow: "0 6px 18px rgba(91, 95, 222, 0.06)",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : item.id)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.8rem",
                      padding: "1rem 1.1rem",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "var(--sans)",
                    }}
                  >
                    <span
                      style={{
                        minWidth: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        background: accent,
                        color: accent === "#FFC700" ? "#08060D" : "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.9rem",
                        fontWeight: 800,
                      }}
                    >
                      ❓
                    </span>
                    <span
                      style={{
                        flex: 1,
                        fontWeight: 700,
                        color: "#08060D",
                        fontSize: "0.98rem",
                      }}
                    >
                      {item.q}
                    </span>
                    <span
                      style={{
                        color: "#6B6375",
                        fontSize: "0.9rem",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      ▼
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: "0 1.1rem 1.1rem 3.5rem",
                        color: "#4F4A58",
                        fontSize: "0.92rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Case Stories Section */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "12px",
                background: "#E9F9EF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              📖
            </span>
            <h2 style={{ margin: 0, color: "#08060D", fontSize: "1.3rem", fontWeight: 800, fontFamily: "var(--heading)" }}>
              Case Stories
            </h2>
          </div>

          {filteredStories.length === 0 && (
            <p style={{ color: "#6B6375", fontSize: "0.9rem" }}>
              No stories match your search.
            </p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {filteredStories.map((story, i) => (
              <div
                key={story.id}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "1.2rem 1.3rem",
                  border: "2px solid #EEF0FF",
                  boxShadow: "0 8px 20px rgba(91, 95, 222, 0.07)",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 0.5rem",
                    color: "#08060D",
                    fontSize: "1.05rem",
                    fontWeight: 800,
                    fontFamily: "var(--heading)",
                  }}
                >
                  {story.title}
                </h3>

                <p
                  style={{
                    margin: "0 0 0.9rem",
                    color: "#4F4A58",
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                  }}
                >
                  {story.summary}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {story.tags.map((tag, ti) => {
                    const tagColor = colors[(i + ti) % colors.length];
                    return (
                      <span
                        key={tag}
                        style={{
                          background: `${tagColor}1A`,
                          color: tagColor === "#FFC700" ? "#8A6D00" : tagColor,
                          padding: "0.3rem 0.7rem",
                          borderRadius: "999px",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                        }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom encouragement */}
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            color: "#6B6375",
            fontSize: "0.85rem",
          }}
        >
          🌟 Knowledge is power — the more you know, the stronger your voice!
        </div>
      </div>
    </div>
  );
}

export default KnowledgeHub;