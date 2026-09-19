import { useState, useMemo, useEffect } from "react";
import {
  Search,
  BookOpen,
  ChevronDown,
  Lightbulb,
  FileText,
  Tag,
} from "lucide-react";

import { faqs, caseStories } from "../data/knowledgeHub";
import { getArticles } from "../services/api";

const colors = [
  "#4f46e5",
  "#fbbf24",
  "#10b981",
  "#f43f5e",
];

function KnowledgeHub() {
  const [openFaq, setOpenFaq] = useState(null);
  const [openStory, setOpenStory] = useState(null);
  const [search, setSearch] = useState("");

  // Local data is used as the initial/fallback data.
  const [hubFaqs, setHubFaqs] = useState(faqs);
  const [hubStories, setHubStories] = useState(caseStories);

  // Load Knowledge Hub content from the backend.
  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await getArticles();

        const articles = data.articles || [];

        // Convert backend FAQ articles into the format
        // already used by this page.
        const backendFaqs = articles
          .filter((article) => article.category === "FAQ")
          .map((article) => ({
            id: article.tags?.[0] || article._id,
            q: article.title,
            a: article.body,
          }));

        // Convert backend Case Story articles into the format
        // already used by this page.
        const backendStories = articles
          .filter((article) => article.category === "Case Story")
          .map((article) => ({
            id:
              article.tags?.find((tag) =>
                /^s\d+$/.test(tag)
              ) || article._id,
            title: article.title,
            tags:
              article.tags?.filter(
                (tag) => !/^s\d+$/.test(tag)
              ) || [],
            summary: article.body,
          }));

        // Only replace local data when backend data exists.
        // This keeps the page working if the API is unavailable.
        if (backendFaqs.length > 0) {
          setHubFaqs(backendFaqs);
        }

        if (backendStories.length > 0) {
          setHubStories(backendStories);
        }
      } catch (error) {
        console.error("Knowledge Hub API error:", error);
      }
    };

    loadArticles();
  }, []);

  const query = search.trim().toLowerCase();

  /* ================================
     FILTER FAQs
  ================================= */

  const filteredFaqs = useMemo(() => {
    if (!query) return hubFaqs;

    return hubFaqs.filter(
      (faq) =>
        faq.q.toLowerCase().includes(query) ||
        faq.a.toLowerCase().includes(query)
    );
  }, [query, hubFaqs]);

  /* ================================
     FILTER CASE STORIES
  ================================= */

  const filteredStories = useMemo(() => {
    if (!query) return hubStories;

    return hubStories.filter(
      (story) =>
        story.title.toLowerCase().includes(query) ||
        story.summary.toLowerCase().includes(query) ||
        story.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        )
    );
  }, [query, hubStories]);

  return (
    <main className="hub-page">
      {/* Background decorations */}
      <div className="hub-bg hub-bg-one" />
      <div className="hub-bg hub-bg-two" />

      <div className="hub-container">

        {/* ================================
            HERO
        ================================= */}

        <section className="hub-hero">
          <div className="hub-hero-icon">
            <BookOpen size={30} strokeWidth={2.3} />
          </div>

          <span className="hub-kicker">
            KNOWLEDGE HUB
          </span>

          <h1>
            Learn More.{" "}
            <span>Know Your Rights.</span>
          </h1>

          <p>
            Your digital library of rights, answers,
            and real stories.
          </p>

          {/* Search */}
          <div className="hub-search">
            <Search size={20} />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search FAQs or case stories..."
            />

            {search && (
              <button
                type="button"
                className="hub-search-clear"
                onClick={() => setSearch("")}
              >
                Clear
              </button>
            )}
          </div>
        </section>

        {/* ================================
            FAQ SECTION
        ================================= */}

        <section className="hub-section">
          <div className="hub-section-heading">
            <div className="hub-section-heading-left">
              <div className="hub-section-icon hub-section-icon-gold">
                <Lightbulb size={20} />
              </div>

              <div>
                <span className="hub-section-kicker">
                  HAVE QUESTIONS?
                </span>

                <h2>Frequently Asked Questions</h2>
              </div>
            </div>

            <span className="hub-result-count">
              {filteredFaqs.length}{" "}
              {filteredFaqs.length === 1
                ? "question"
                : "questions"}
            </span>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="hub-empty-small">
              <Search size={28} />

              <p>
                No FAQs match your search.
              </p>
            </div>
          ) : (
            <div className="hub-list">
              {filteredFaqs.map((item, index) => {
                const isOpen =
                  openFaq === item.id;

                const accent =
                  colors[index % colors.length];

                return (
                  <article
                    key={item.id}
                    className={`hub-item ${
                      isOpen
                        ? "hub-item-open"
                        : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="hub-item-header"
                      onClick={() =>
                        setOpenFaq(
                          isOpen ? null : item.id
                        )
                      }
                    >
                      <div
                        className="hub-item-icon"
                        style={{
                          color: accent,
                          background:
                            `${accent}15`,
                        }}
                      >
                        <span className="hub-question-mark">
                          ?
                        </span>
                      </div>

                      <div className="hub-item-title">
                        <span>
                          QUESTION {index + 1}
                        </span>

                        <h3>{item.q}</h3>
                      </div>

                      <div className="hub-chevron">
                        <ChevronDown size={20} />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="hub-item-body">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* ================================
            CASE STORIES
        ================================= */}

        <section className="hub-section hub-stories-section">
          <div className="hub-section-heading">
            <div className="hub-section-heading-left">
              <div className="hub-section-icon hub-section-icon-green">
                <FileText size={20} />
              </div>

              <div>
                <span className="hub-section-kicker">
                  REAL-LIFE EXAMPLES
                </span>

                <h2>Case Stories</h2>
              </div>
            </div>

            <span className="hub-result-count">
              {filteredStories.length}{" "}
              {filteredStories.length === 1
                ? "story"
                : "stories"}
            </span>
          </div>

          {filteredStories.length === 0 ? (
            <div className="hub-empty-small">
              <Search size={28} />

              <p>
                No case stories match your search.
              </p>
            </div>
          ) : (
            <div className="story-grid">
              {filteredStories.map(
                (story, index) => {
                  const isOpen =
                    openStory === story.id;

                  const accent =
                    colors[
                      (index + 2) % colors.length
                    ];

                  return (
                    <article
                      key={story.id}
                      className={`story-card ${
                        isOpen
                          ? "story-card-open"
                          : ""
                      }`}
                    >
                      <button
                        type="button"
                        className="story-card-button"
                        onClick={() =>
                          setOpenStory(
                            isOpen
                              ? null
                              : story.id
                          )
                        }
                      >
                        <div
                          className="story-icon"
                          style={{
                            color: accent,
                            background:
                              `${accent}15`,
                          }}
                        >
                          <FileText
                            size={22}
                          />
                        </div>

                        <div className="story-content">
                          <h3>{story.title}</h3>

                          <div className="story-tags">
                            {story.tags.map(
                              (tag) => (
                                <span
                                  key={tag}
                                >
                                  <Tag
                                    size={11}
                                  />
                                  {tag}
                                </span>
                              )
                            )}
                          </div>
                        </div>

                        <div className="story-chevron">
                          <ChevronDown
                            size={19}
                          />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="story-summary">
                          <p>
                            {story.summary}
                          </p>
                        </div>
                      )}
                    </article>
                  );
                }
              )}
            </div>
          )}
        </section>

        {/* ================================
            BOTTOM TIP
        ================================= */}

        <div className="hub-tip">
          <div className="hub-tip-icon">
            <Lightbulb size={20} />
          </div>

          <div>
            <strong>
              Remember, Explorer!
            </strong>

            <p>
              Knowing your rights is the first
              step towards protecting them. 💜
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}

export default KnowledgeHub;