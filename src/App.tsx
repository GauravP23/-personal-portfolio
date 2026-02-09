import { useEffect, useRef } from 'react'
import './App.css'
import GridBackground from './GridBackground'
import PixelAvatar from './PixelAvatar'
import PixelFace from './PixelFace'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('fade-section'); io.unobserve(el) } },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.63 7.63 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
)
const ExternalIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.75 2A1.75 1.75 0 002 3.75v8.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 12.25v-3.5a.75.75 0 00-1.5 0v3.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-8.5a.25.25 0 01.25-.25h3.5a.75.75 0 000-1.5h-3.5zm6.5 0a.75.75 0 000 1.5h1.19L6.22 8.72a.75.75 0 101.06 1.06L12.5 4.56v1.19a.75.75 0 001.5 0v-3A.75.75 0 0013.25 2h-3z"/></svg>
)
const DownloadIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.75 14A1.75 1.75 0 011 12.25v-2.5a.75.75 0 011.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25v-2.5a.75.75 0 011.5 0v2.5A1.75 1.75 0 0113.25 14H2.75zm5-1.844a.75.75 0 01-.53-.22L4.47 9.19a.75.75 0 011.06-1.06L7.25 9.85V2.75a.75.75 0 011.5 0v7.1l1.72-1.72a.75.75 0 111.06 1.06l-2.75 2.75a.75.75 0 01-.53.22z"/></svg>
)

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const skills = [
  { name: 'Python',       icon: `${DEVICON}/python/python-original.svg` },
  { name: 'JavaScript',   icon: `${DEVICON}/javascript/javascript-original.svg` },
  { name: 'TypeScript',   icon: `${DEVICON}/typescript/typescript-original.svg` },
  { name: 'C/C++',        icon: `${DEVICON}/cplusplus/cplusplus-original.svg` },
  { name: 'Java',         icon: `${DEVICON}/java/java-original.svg` },
  { name: 'SQL',          icon: `${DEVICON}/azuresqldatabase/azuresqldatabase-original.svg` },
  { name: 'HTML/CSS',     icon: `${DEVICON}/html5/html5-original.svg` },
  { name: 'React.js',     icon: `${DEVICON}/react/react-original.svg` },
  { name: 'Tailwind CSS', icon: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
  { name: 'Redux',        icon: `${DEVICON}/redux/redux-original.svg` },
  { name: 'Express.js',   icon: `${DEVICON}/express/express-original.svg` },
  { name: 'Socket.IO',    icon: `${DEVICON}/socketio/socketio-original.svg` },
  { name: 'MongoDB',      icon: `${DEVICON}/mongodb/mongodb-original.svg` },
  { name: 'MySQL',        icon: `${DEVICON}/mysql/mysql-original.svg` },
  { name: 'PostgreSQL',   icon: `${DEVICON}/postgresql/postgresql-original.svg` },
  { name: 'Git',          icon: `${DEVICON}/git/git-original.svg` },
  { name: 'AWS',          icon: `${DEVICON}/amazonwebservices/amazonwebservices-plain-wordmark.svg` },
  { name: 'Figma',        icon: `${DEVICON}/figma/figma-original.svg` },
  { name: 'Vercel',       icon: `${DEVICON}/vercel/vercel-original.svg` },
]

const projects = [
  {
    num: '01',
    title: 'Nimbus Cloud',
    desc: 'Self-hosted, end-to-end encrypted cloud storage with zero-knowledge encryption and role-based access.',
    stack: ['Express.js', 'PostgreSQL', 'React.js', 'Cloudflare Tunnels'],
    github: 'https://github.com/GauravP23',
    live: 'https://divya-agrawal.notion.site/Nimbus-Cloud-Services-21fec9fe9e428092a5e2c80975720bd0',
    image: '/screenshots/nimbus.png',
  },
  {
    num: '02',
    title: 'MangaKen',
    desc: 'Full-stack manga reader with real-time access to 20,000+ titles, live search, and multi-mode chapter reader.',
    stack: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'Tailwind CSS'],
    github: 'https://github.com/GauravP23/Mangaken',
    live: 'https://mangaken.netlify.app/',
    image: '/screenshots/mangaken.png',
  },
  {
    num: '03',
    title: 'UpStyle',
    desc: 'E-commerce website with wishlist management, Razorpay payment gateway, and skeleton loaders.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    github: 'https://github.com/dipak-01/E-commerce-Website',
    live: 'https://sahil7741.github.io/UpStyle/frontend/html/landingPage.html',
    image: '/screenshots/upstyle.png',
  },
]

const contacts = [
  { label: 'Email:', value: 'gauravp23211@gmail.com', href: 'mailto:gauravp23211@gmail.com' },
  { label: 'GitHub:', value: 'github.com/GauravP23', href: 'https://github.com/GauravP23' },
  { label: 'LinkedIn:', value: 'linkedin.com/in/gaurav-pawar', href: 'https://www.linkedin.com/in/gaurav-pawar-929280262/' },
]

function App() {
  const heroRef  = useReveal()
  const skillRef = useReveal()
  const projRef  = useReveal()
  const resRef   = useReveal()
  const conRef   = useReveal()

  return (
    <>
      <GridBackground />
      <div className="portfolio">
      <section className="hero-card" ref={heroRef} style={{ animationDelay: '0s' }}>
        <div className="hero">
          <div className="avatar-wrap">
            <PixelAvatar size={56} />
          </div>
          <div className="hero-info">
            <h1 className="hero-name">
              <span className="accent">Gaurav</span> Pawar
            </h1>
            <p className="hero-role">Web Developer</p>
          </div>
        </div>
        <div className="hero-bottom">
          <p className="hero-desc">
            I'm a web developer who builds clean, responsive, and engaging websites.
            I turn ideas into functional, user-friendly digital experiences using modern web technologies.
            I'm always learning and refining my skills to deliver better, smarter solutions.
          </p>
          <PixelFace size={110} />
        </div>
      </section>

      <div ref={skillRef} style={{ animationDelay: '0.1s', width: '100%' }}>
        <h2 className="section-heading">Skills</h2>
        <section className="section-card">
          <div className="skills-grid">
            {skills.map((s) => (
              <span className="skill-chip" key={s.name}>
                <img className="skill-icon" src={s.icon} alt="" width="16" height="16" loading="lazy" />
                {s.name}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div ref={projRef} style={{ animationDelay: '0.18s', width: '100%' }}>
        <h2 className="section-heading">Projects</h2>
        <section className="section-card">
          <div className="projects-grid">
            {projects.map((p) => (
              <article className="project-item" key={p.title}>
                <p className="project-num">{p.num}</p>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>

                <div className="project-image">
                  <img src={p.image} alt={`${p.title} screenshot`} />
                </div>

                <div className="project-stack">
                  {p.stack.map((t) => (
                    <span className="stack-tag" key={t}>{t}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <a className="project-btn" href={p.github} target="_blank" rel="noreferrer">
                    <GitHubIcon /> GitHub
                  </a>
                  <a className="project-btn" href={p.live} target="_blank" rel="noreferrer">
                    <ExternalIcon /> Live
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div ref={resRef} style={{ animationDelay: '0.26s', width: '100%' }}>
        <h2 className="section-heading">Resume</h2>
        <section className="section-card">
          <a className="resume-btn" href="https://drive.google.com/file/d/1dUnmU_ZPNmt4MlB8kwOurCMpKJfWe5NC/view?usp=sharing" target="_blank" rel="noreferrer">
            <DownloadIcon /> Download my resume
          </a>
        </section>
      </div>

      <div ref={conRef} style={{ animationDelay: '0.34s', width: '100%' }}>
        <h2 className="section-heading">Contact</h2>
        <section className="section-card">
          <dl className="contact-table">
            {contacts.map((c) => (
              <div className="contact-row" key={c.label}>
                <dt>{c.label}</dt>
                <dd><a href={c.href} target="_blank" rel="noreferrer">{c.value}<span className="arrow">↗</span></a></dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

    </div>
    </>
  )
}

export default App
