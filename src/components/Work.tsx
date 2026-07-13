import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    number: "01",
    name: "OmnexaAI",
    category: "Company Website",
    description:
      "A modern, fully responsive company website with Django backend, Bootstrap 5 frontend, and particles.js animations.",
    tech: "Python · Django · Bootstrap 5 · JavaScript · HTML · CSS",
    link: "https://omnexaai.com",
    image: "/images/omnexaai.png",
  },
  {
    number: "02",
    name: "Personal Portfolio v1",
    category: "Portfolio Website",
    description:
      "My first personal portfolio — responsive, clean, and professional with smooth scroll animations.",
    tech: "HTML5 · CSS3 · Bootstrap 5 · JavaScript · AOS.js",
    link: "#",
    image: "/images/portfolio-3d.png",
  },
  {
    number: "03",
    name: "Sokhda Nagrik Mandal",
    category: "Mobile Application",
    description:
      "A community-focused mobile application currently in development using Flutter, designed to connect and serve the members of Sokhda Nagrik Mandal.",
    tech: "Flutter · Dart · Cross-platform Development",
    link: "#",
    image: "/images/placeholder.webp",
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up (optional, good practice)
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project) => (
            <div className="work-box" key={project.number}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tech}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
