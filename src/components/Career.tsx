import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Self-Learning & Skill Building</h4>
                <h5>Full Stack Learner</h5>
              </div>
              {/* <h3>2023–2024</h3> */}
            </div>
            <p>
              Mastered Python, Django, HTML, CSS, JavaScript, and REST APIs
              through hands-on projects and real-world application development.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Developer</h4>
                <h5>OmnexaAI</h5>
              </div>
              {/* <h3>2024–2025</h3> */}
            </div>
            <p>
              Developed the complete OmnexaAI company website: Django backend,
              Bootstrap 5 frontend, particles.js animations, and clean modern
              design.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>Freelance</h5>
              </div>
              {/* <h3>NOW</h3> */}
            </div>
            <p>
              Building end-to-end web applications with Django backend and
              Bootstrap 5 frontend for multiple clients and projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
