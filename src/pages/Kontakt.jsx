import { useState } from 'react'
import { img } from '../data.js'
import PageHero from '../components/PageHero.jsx'
import { SecOrn, FolkBorder } from '../components/common.jsx'
import { CheckIcon, PhoneIcon, MailIcon } from '../components/icons.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const TEAM = [
  { name: 'Jan Erik Sundøy', role: 'Leder', phone: '905 86 311', img: 'https://stjordal-historielag.no/image/v2/image/7713/1923908/Jan_Erik.jpg?autorotate=true&width=400&height=400&mode=crop', delay: 1 },
  { name: 'Asbjørn Sjølseth Jakobsen', role: 'Kasserer', phone: '958 89 829', img: 'https://stjordal-historielag.no/image/v2/image/7713/1923907/Asbj%c3%b8rn.jpg?autorotate=true&width=400&height=400&mode=crop', delay: 2 },
  { name: 'Arve Rosvold Alver', role: 'Styremedlem', phone: '992 97 406', img: 'https://stjordal-historielag.no/image/v2/image/7713/10427908/Arve_Rosvold_Alver.png?autorotate=true&width=400&height=400&mode=crop', delay: 3 },
  { name: 'Unni Raaen Nysæther', role: 'Styremedlem', phone: '958 88 032', img: 'https://stjordal-historielag.no/image/v2/image/7713/5325038/Unni2.jpg?autorotate=true&width=400&height=400&mode=crop', delay: 4 },
  { name: 'Kjell Erik Pettersson', role: 'Styremedlem', phone: '482 92 196', img: 'https://stjordal-historielag.no/image/v2/image/7713/1068741/kjell-erik-pettersson-foto-privat.jpg?autorotate=true&width=400&height=400&mode=crop', delay: 5 },
  { name: 'Inger Synnøve Minde', role: 'Varamedlem', phone: '932 37 272', img: 'https://stjordal-historielag.no/image/v2/image/7713/11071282/Inger_Synn%c3%b8ve.jpg?autorotate=true&width=400&height=400&mode=crop', delay: 6 },
]

export default function Kontakt() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', msg: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const setField = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((er) => ({ ...er, [key]: false })) // clear error on input
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const next = {
      name: values.name.trim().length === 0,
      email: !(values.email.trim().length > 0 && EMAIL_RE.test(values.email.trim())),
      msg: values.msg.trim().length === 0,
    }
    setErrors(next)
    if (!next.name && !next.email && !next.msg) setSuccess(true)
  }

  const groupClass = (key) => 'form-group' + (errors[key] ? ' err' : '')

  return (
    <>
      <PageHero
        bg={img('169296/2593373/V%c3%a6rnes_Kirke_med_Pr%c3%a6stegaarden.jpg', 1800)}
        crumbs={[{ label: 'Hjem', to: '/' }, { label: 'Kontakt' }]}
        title="Kontakt oss"
        sub="Spørsmål, innspill eller lyst til å bli medlem?"
      />

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="contact-info-block">
                <p className="ci-label">E-post</p>
                <p><a href="mailto:stjordal.historielag@gmail.com">stjordal.historielag@gmail.com</a></p>
              </div>
              <div className="contact-info-block">
                <p className="ci-label">Postadresse</p>
                <p>c/o Jan Erik Sundøy<br />Torgvegen 10B<br />7506 Stjørdal</p>
              </div>
              <div className="contact-info-block">
                <p className="ci-label">Organisasjonsnummer</p>
                <p>981 195 744</p>
              </div>
              <div className="contact-info-block">
                <p className="ci-label">Følg oss</p>
                <p>
                  <a href="https://www.facebook.com/profile.php?id=100087643594442" target="_blank" rel="noopener noreferrer">Facebook</a>
                  &nbsp;·&nbsp;
                  <a href="https://stjordalmuseum.no/" target="_blank" rel="noopener noreferrer">Stjørdal museum</a>
                </p>
              </div>
            </div>

            <div className="contact-card">
              {!success ? (
                <form onSubmit={onSubmit} noValidate>
                  <div className={groupClass('name')}>
                    <label htmlFor="cf-name">Navn</label>
                    <input type="text" id="cf-name" value={values.name} onChange={setField('name')} />
                    <span className="form-error">Vennligst fyll inn navnet ditt.</span>
                  </div>
                  <div className={groupClass('email')}>
                    <label htmlFor="cf-email">E-post</label>
                    <input type="email" id="cf-email" value={values.email} onChange={setField('email')} />
                    <span className="form-error">Vennligst oppgi en gyldig e-postadresse.</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-subject">Emne</label>
                    <input type="text" id="cf-subject" value={values.subject} onChange={setField('subject')} />
                    <span className="form-error"></span>
                  </div>
                  <div className={groupClass('msg')}>
                    <label htmlFor="cf-msg">Melding</label>
                    <textarea id="cf-msg" value={values.msg} onChange={setField('msg')}></textarea>
                    <span className="form-error">Skriv gjerne noen ord til oss.</span>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Send melding</button>
                </form>
              ) : (
                <div className="form-success show">
                  <div className="fs-icon"><CheckIcon /></div>
                  <h4>Takk for henvendelsen!</h4>
                  <p>Vi har mottatt meldingen din og svarer så snart vi kan.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <FolkBorder />

      <section className="section section-alt">
        <div className="container">
          <div className="sec-hdr reveal">
            <SecOrn />
            <h2 className="sec-title">Styret</h2>
            <p className="sec-sub">Valgt av årsmøtet — kontakt oss gjerne</p>
          </div>
          <div className="team-grid">
            {TEAM.map((t) => (
              <div key={t.name} className={`team-card reveal reveal-d${t.delay}`}>
                <div className="team-avatar">
                  <img src={t.img} alt={t.name} />
                </div>
                <p className="team-name">{t.name}</p>
                <p className="team-role">{t.role}</p>
                <div className="team-contact">
                  <p className="team-phone"><PhoneIcon /> {t.phone}</p>
                  <a href="mailto:stjordal.historielag@gmail.com" className="team-email"><MailIcon /> Send e-post</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
