import { useState, FormEvent } from "react";
import { MdArrowOutward, MdCopyright, MdEmail, MdCheckCircle, MdError } from "react-icons/md";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import "./styles/Contact.css";

type Status = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:8000/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Could not connect to server. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <div className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-card">
          {/* ── LEFT: Info ── */}
          <div className="contact-left">
            <span className="contact-eyebrow">GET IN TOUCH</span>
            <h2 className="contact-heading">
              Let's work<br />together
            </h2>
            <p className="contact-desc">
              I'm open to full-stack web development projects, short or long-term.
              Company website, custom web app, or REST API — let's talk.
            </p>

            <div className="contact-links">
              <a href="mailto:rishabhshah95780@gmail.com" className="contact-link-item" data-cursor="disable">
                <span className="contact-link-icon"><MdEmail /></span>
                rishabhshah95780@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/rishabh-shah-b42751243" target="_blank" className="contact-link-item" data-cursor="disable">
                <span className="contact-link-icon"><FaLinkedinIn /></span>
                linkedin.com/in/rishabh-shah-b42751243
              </a>
              <a href="https://github.com/Rishabh-1801" target="_blank" className="contact-link-item" data-cursor="disable">
                <span className="contact-link-icon"><FaGithub /></span>
                github.com/Rishabh-1801
              </a>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div className="contact-right">
            {status === "success" ? (
              <div className="contact-success">
                <MdCheckCircle className="contact-success-icon" />
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I'll get back to you soon.</p>
                <button
                  className="contact-submit"
                  onClick={() => setStatus("idle")}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-row">
                  <div className="contact-field">
                    <label htmlFor="cf-name">Name <span>*</span></label>
                    <input
                      id="cf-name"
                      name="name"
                      type="text"
                      placeholder="Rishabh Shah"
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="cf-email">Email <span>*</span></label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      placeholder="hello@example.com"
                      required
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="contact-field">
                  <label htmlFor="cf-subject">Subject</label>
                  <input
                    id="cf-subject"
                    name="subject"
                    type="text"
                    placeholder="Project inquiry"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="cf-message">Message <span>*</span></label>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project…"
                    required
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                {status === "error" && (
                  <div className="contact-error">
                    <MdError /> {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="contact-submit"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending…" : <>Send message <MdArrowOutward /></>}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── Footer strip ── */}
        <div className="contact-footer">
          <span>Designed &amp; Developed by <strong>Rishabh Shah</strong></span>
          <span className="contact-copy"><MdCopyright /> 2025</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
