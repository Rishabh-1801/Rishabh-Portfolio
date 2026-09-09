import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I build modern, responsive web applications — from pixel-perfect
          frontends to robust Django backends. I specialize in Python, Django,
          Bootstrap 5, and JavaScript, and I love creating web experiences that
          are both visually impressive and technically solid. Currently based in
          Gandhinagar, Gujarat, and always open to new projects and
          collaborations.
        </p>
        <div className="about-highlights">
          <span className="about-badge">Full Stack Developer</span>
          <span className="about-badge">Python &amp; Django</span>
          <span className="about-badge">Gandhinagar, Gujarat</span>
        </div>
      </div>
    </div>
  );
};

export default About;
