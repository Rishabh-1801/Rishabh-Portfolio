import { useEffect, useState } from "react";
import "./styles/Learning.css";

/* ── Types ── */
interface Skill {
  id: number;
  name: string;
  level: "beginner" | "intermediate" | "advanced";
  progress: number;
}

interface Post {
  id: number;
  title: string;
  summary: string;
  tags_list: string[];
  created_at: string;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  color: string;
  skills: Skill[];
  posts: Post[];
}

/* ── Helpers ── */
const API_URL = "https://portfolio-backend-yq4h.onrender.com/api/learning/";

const levelLabel: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const Learning = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((data: Category[]) => {
        setCategories(data);
        if (data.length > 0) setActive(data[0].id);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const current = categories.find((c) => c.id === active) ?? null;

  return (
    <div className="learning-section" id="learning">
      <div className="learning-container section-container">
        {/* ── Header ── */}
        <div className="learning-header">
          <h2>
            What I'm <span>Learning</span>
          </h2>
          <p className="learning-subtitle">
            Skills I'm actively building — from zero to production-ready.
          </p>
        </div>

        {loading && (
          <div className="learning-state">
            <div className="learning-spinner" />
            <p>Loading…</p>
          </div>
        )}

        {error && (
          <div className="learning-state learning-error">
            <span>⚠️</span>
            <p>
              Couldn't reach the backend. Please try again later.
            </p>
          </div>
        )}

        {!loading && !error && categories.length === 0 && (
          <div className="learning-state">
            <p>No learning items yet — add some from the Django admin!</p>
          </div>
        )}

        {!loading && !error && categories.length > 0 && (
          <div className="learning-body">
            {/* ── Tab row ── */}
            <div className="learning-tabs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`learning-tab ${active === cat.id ? "active" : ""}`}
                  style={
                    active === cat.id
                      ? ({ "--tab-color": cat.color } as React.CSSProperties)
                      : {}
                  }
                  onClick={() => setActive(cat.id)}
                >
                  <span className="learning-tab-icon">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* ── Content panel ── */}
            {current && (
              <div
                className="learning-panel"
                style={{ "--panel-color": current.color } as React.CSSProperties}
                key={current.id}
              >
                {/* Left: Skills */}
                <div className="learning-skills-col">
                  <h3 className="learning-col-title">Skills & Progress</h3>
                  <p className="learning-cat-desc">{current.description}</p>
                  <div className="learning-skills">
                    {current.skills.map((skill) => (
                      <div className="learning-skill" key={skill.id}>
                        <div className="learning-skill-header">
                          <span className="learning-skill-name">{skill.name}</span>
                          <span className="learning-skill-level">
                            {levelLabel[skill.level]}
                          </span>
                        </div>
                        <div className="learning-bar-track">
                          <div
                            className="learning-bar-fill"
                            style={{ width: `${skill.progress}%` }}
                          />
                        </div>
                        <span className="learning-skill-pct">{skill.progress}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="learning-divider" />

                {/* Right: Posts */}
                <div className="learning-posts-col">
                  <h3 className="learning-col-title">Learning Notes</h3>
                  {current.posts.length === 0 ? (
                    <p className="learning-no-posts">No notes yet.</p>
                  ) : (
                    <div className="learning-posts">
                      {current.posts.map((post) => (
                        <div className="learning-post" key={post.id}>
                          <div className="learning-post-top">
                            <span className="learning-post-date">
                              {new Date(post.created_at).toLocaleDateString(
                                "en-IN",
                                { day: "2-digit", month: "short", year: "numeric" }
                              )}
                            </span>
                          </div>
                          <h4 className="learning-post-title">{post.title}</h4>
                          <p className="learning-post-summary">{post.summary}</p>
                          <div className="learning-tags">
                            {post.tags_list.map((tag) => (
                              <span className="learning-tag" key={tag}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Learning;
