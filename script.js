/* Portfolio — plain JavaScript, no libraries. Content lives in data.js. */
(() => {
  'use strict'
  const D = window.DATA, P = D.profile
  const $ = (s, r = document) => r.querySelector(s)
  const $$ = (s, r = document) => [...r.querySelectorAll(s)]
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  const ghUrl = (p) => `https://github.com/${p.owner || 'malladiravindra'}/${p.id}`
  const pad = (n) => String(n).padStart(2, '0')

  // subtle film grain, generated once (no image request)
  try {
    const c = document.createElement('canvas'); c.width = c.height = 64
    const x = c.getContext('2d'), im = x.createImageData(64, 64)
    for (let i = 0; i < im.data.length; i += 4) { im.data[i] = im.data[i + 1] = im.data[i + 2] = Math.random() * 255; im.data[i + 3] = 255 }
    x.putImageData(im, 0, 0)
    document.documentElement.style.setProperty('--grain', `url(${c.toDataURL()})`)
  } catch (e) { /* grain is decorative */ }

  /* ───────── fill static text ───────── */
  $('#hero-label').textContent = `${P.fullName} · ${P.location}`
  $('#hero-sub').textContent = `Creative developer — ${P.tagline}`
  $('#bio').textContent = P.bio
  $('#quote').textContent = P.quote
  $('#facts').innerHTML = P.facts.map(([k, v]) => `<div><dt class="label">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')
  $('#gh-link').href = P.github
  $('#li-link').href = P.linkedin
  $('#id-year').textContent = `Portfolio · ${P.year}`
  $('#id-year2').textContent = P.year
  $('#id-name').textContent = P.fullName
  $('#id-role').textContent = P.role
  $('#id-id').textContent = P.id
  $('#barcode').innerHTML = Array.from({ length: 38 }, (_, i) => `<i style="width:${1 + ((P.id.charCodeAt(i % P.id.length) * (i + 3)) % 4)}px"></i>`).join('')
  $('#targets').innerHTML = P.targets.map((t) => `<li>${esc(t)}</li>`).join('')
  $('#socials').innerHTML = [['GitHub', P.github], ['LinkedIn', P.linkedin], ['Email', `mailto:${P.email}`]]
    .map(([l, h]) => `<a class="btn btn-ghost magnetic" href="${esc(h)}" ${h.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>${l} ↗</a>`).join('')
  $('#contact-list').innerHTML = [
    ['Name', esc(P.fullName)],
    ['Phone', `<a href="tel:${P.phone.replace(/\s/g, '')}">${esc(P.phone)}</a>`],
    ['Email', `<a href="mailto:${esc(P.email)}">${esc(P.email)}</a>`],
    ['Location', esc(P.location)],
    ['GitHub', `<a href="${esc(P.github)}" target="_blank" rel="noreferrer">github.com/malladiravindra</a>`],
    ['LinkedIn', `<a href="${esc(P.linkedin)}" target="_blank" rel="noreferrer">linkedin.com/in/ravindra-babu-malladi</a>`],
  ].map(([k, v]) => `<li><span class="label">${k}</span>${v}</li>`).join('')
  $('#list-title').textContent = `GitHub projects (${D.projects.length})`
  $('#proj-list').innerHTML = D.projects.map((p) => `<li><a href="${ghUrl(p)}" target="_blank" rel="noreferrer">${esc(p.title)}</a></li>`).join('')
  $('#copy').textContent = `© ${P.year} ${P.fullName}`

  // photo with gradient-monogram fallback
  const img = new Image(); img.alt = `Portrait of ${P.fullName}`; img.width = 112; img.height = 128; img.draggable = false
  img.onload = () => { $('#photo').innerHTML = ''; $('#photo').appendChild(img) }
  img.src = P.photo

  // floating chips (desktop)
  const chipPos = [[62, 22], [80, 30], [70, 42], [86, 52], [60, 60], [78, 68], [90, 20], [66, 76]]
  $('#chips').innerHTML = D.chips.map((c, i) => `<span class="chip" style="left:${chipPos[i % 8][0]}%;top:${chipPos[i % 8][1]}%;animation-delay:${i * -.7}s;animation-duration:${5 + (i % 4)}s">${esc(c)}</span>`).join('')

  /* ───────── resume buttons: only link to the PDF if it exists ───────── */
  const resumeOk = fetch(P.resume, { method: 'HEAD' }).then((r) => r.ok && (r.headers.get('content-type') || '').includes('pdf')).catch(() => false)
  $$('[data-resume]').forEach(async (el) => {
    const cls = `btn btn-${el.dataset.style} magnetic`
    if (await resumeOk) el.outerHTML = `<a class="${cls}" href="${esc(P.resume)}" download>${el.textContent}</a>`
    else { el.className = 'btn btn-' + el.dataset.style; el.setAttribute('aria-disabled', 'true'); el.title = 'PDF will be added soon'; el.textContent = 'Resume coming soon' }
    bindMagnetic()
  })

  /* ───────── split headings into words that slide up through a mask ───────── */
  $$('[data-split]').forEach((h) => {
    const out = []
    h.childNodes.forEach((n) => {
      if (n.nodeType === 3) n.textContent.split(/\s+/).filter(Boolean).forEach((w) => out.push(`<span class="mask inline"><span class="w">${esc(w)}</span></span>`))
      else if (n.nodeName === 'EM') n.textContent.split(/\s+/).filter(Boolean).forEach((w) => out.push(`<span class="mask inline"><span class="w"><em>${esc(w)}</em></span></span>`))
    })
    const label = h.textContent
    h.innerHTML = `<span class="sr" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">${esc(label)}</span>` + out.join(' ')
    $$('.w', h).forEach((w, i) => (w.style.transitionDelay = `${i * 60}ms`))
    h.querySelectorAll('.mask').forEach((m) => m.setAttribute('aria-hidden', 'true'))
  })

  /* ───────── skills (periodic table) ───────── */
  const table = $('#table'), tip = $('#tooltip')
  const famNames = Object.keys(D.families)
  const skills = D.skills.map(([sym, name, family, where, repo], i) => ({ n: i + 1, sym, name, family, where, repo }))
  table.innerHTML = skills.map((s) => `<li><button class="tile" type="button" data-fam="${esc(s.family)}" data-i="${s.n - 1}" style="background:${D.families[s.family]}" aria-label="${esc(s.name)}. ${s.repo ? 'Used in ' + esc(s.repo) : esc(s.where)}"><span class="n">${pad(s.n)}</span><span class="s">${esc(s.sym)}</span><span class="f">${esc(s.name)}</span></button></li>`).join('')
  $('#filters').innerHTML = `<button type="button" aria-pressed="true" data-f="">All</button>` + famNames.map((f) => `<button type="button" aria-pressed="false" data-f="${esc(f)}"><i style="background:${D.families[f]}"></i>${esc(f)}</button>`).join('')
  $('#filters').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return
    const f = b.dataset.f, was = b.getAttribute('aria-pressed') === 'true'
    const active = was && f ? '' : f
    $$('#filters button').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.f === active)))
    $$('.tile').forEach((t) => { t.classList.toggle('dim', !!active && t.dataset.fam !== active); t.classList.toggle('hl', !!active && t.dataset.fam === active) })
    hideTip()
  })
  function showTip(tile) {
    if (tile.classList.contains('dim')) return hideTip()
    const s = skills[+tile.dataset.i]
    const proj = D.projects.find((p) => p.id === s.repo)
    tip.innerHTML = `<p style="margin:0;font-weight:600">${esc(s.name)} <span class="label">· ${esc(s.family)}</span></p><p style="margin:.25rem 0 0;color:rgba(31,42,92,.8)">${esc(s.where)}</p>` +
      (proj ? `<p style="margin:.25rem 0 0"><a href="${ghUrl(proj)}" target="_blank" rel="noreferrer">Used in: ${esc(proj.id)} ↗</a></p>` : `<p style="margin:.25rem 0 0;color:rgba(31,42,92,.75)">Used in: not linked to a public repo</p>`)
    tip.hidden = false
    const sec = $('#skills').getBoundingClientRect(), r = tile.getBoundingClientRect()
    tip.style.left = clamp(r.left - sec.left + r.width / 2 - 104, 0, sec.width - 208) + 'px'
    tip.style.top = r.top - sec.top - tip.offsetHeight - 8 + 'px'
  }
  function hideTip() { tip.hidden = true }
  table.addEventListener('mouseover', (e) => { const t = e.target.closest('.tile'); if (t) showTip(t) })
  table.addEventListener('focusin', (e) => { const t = e.target.closest('.tile'); if (t) showTip(t) })
  table.addEventListener('mouseleave', hideTip)
  table.addEventListener('focusout', hideTip)
  tip.addEventListener('mouseleave', hideTip)
  // 3D tilt toward the pointer
  table.addEventListener('mousemove', (e) => {
    const t = e.target.closest('.tile'); if (!t || reduce) return
    const r = t.getBoundingClientRect()
    t.style.transform = `perspective(600px) translateY(-6px) rotateX(${-((e.clientY - r.top) / r.height - .5) * 28}deg) rotateY(${((e.clientX - r.left) / r.width - .5) * 28}deg)`
  })
  table.addEventListener('mouseout', (e) => { const t = e.target.closest('.tile'); if (t) t.style.transform = '' })
  // diagonal wave entrance: delay = (row + col)
  function waveDelays() {
    const cols = getComputedStyle(table).gridTemplateColumns.split(' ').length
    $$('li', table).forEach((li, i) => (li.style.transitionDelay = `${(Math.floor(i / cols) + (i % cols)) * 60}ms`))
  }
  waveDelays(); addEventListener('resize', waveDelays)

  /* ───────── work: accordion + repo grid ───────── */
  const grads = [['#1F2A5C', '#8B7CF6'], ['#0F8B8D', '#1F2A5C'], ['#C2410C', '#7C3AED'], ['#BE185D', '#1F2A5C'], ['#B45309', '#0F8B8D'], ['#4F46E5', '#06B6D4']]
  const langColor = { Python: '#3776AB', TypeScript: '#3178C6', JavaScript: '#F7DF1E', HTML: '#E34F26', CSS: '#563D7C' }
  const feat = D.projects.filter((p) => p.feature), rest = D.projects.filter((p) => !p.feature)
  const panels = $('#panels')
  panels.innerHTML = feat.map((p, i) => {
    const g = grads[i % grads.length]
    return `<article class="panel" role="listitem" tabindex="0" aria-expanded="false" style="background:linear-gradient(135deg,${g[0]},${g[1]})">
      <span class="p-title"><small>${pad(i + 1)}</small>${esc(p.title)}</span>
      <div class="p-body" inert>
        <p class="label">${pad(i + 1)} / ${esc(p.lang)}</p><h3>${esc(p.title)}</h3><p class="d">${esc(p.desc)}</p>
        <div class="stack">${p.stack.map((s) => `<span>${esc(s)}</span>`).join('')}</div>
        <div class="btn-row"><a class="btn btn-white" href="${ghUrl(p)}" target="_blank" rel="noreferrer">GitHub ↗</a>${p.live ? `<a class="btn btn-outline" href="${esc(p.live)}" target="_blank" rel="noreferrer">Live ↗</a>` : ''}</div>
      </div></article>`
  }).join('')
  const desktopMQ = matchMedia('(min-width: 768px)')
  const items = $$('.panel', panels)
  function openPanel(i) {
    items.forEach((el, k) => { const o = k === i; el.classList.toggle('open', o); el.setAttribute('aria-expanded', String(o)); $('.p-body', el).inert = !o; $('.p-body', el).setAttribute('aria-hidden', String(!o)) })
  }
  openPanel(0)
  items.forEach((el, i) => {
    el.addEventListener('mouseenter', () => desktopMQ.matches && openPanel(i)) // desktop: hover
    el.addEventListener('focus', () => desktopMQ.matches && openPanel(i))
    el.addEventListener('click', (e) => {
      if (e.target.closest('a')) return
      openPanel(desktopMQ.matches || !el.classList.contains('open') ? i : -1) // mobile: tap toggles
    })
    el.addEventListener('keydown', (e) => { if (e.target === el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openPanel(el.classList.contains('open') && !desktopMQ.matches ? -1 : i) } })
  })

  $('#repo-grid').innerHTML = rest.map((p, i) => `<a class="repo glass" href="${ghUrl(p)}" target="_blank" rel="noreferrer" style="transition-delay:${(i % 3) * 80}ms">
      <p class="label">${pad(feat.length + i + 1)}</p><h4>${esc(p.title)}</h4><p>${esc(p.desc)}</p>
      <div class="meta"><span><i style="background:${langColor[p.lang] || '#8B7CF6'}"></i>${esc(p.lang)}</span><span>★ 0</span></div></a>`).join('')
  $$('.repo').forEach((c) => {
    c.addEventListener('mousemove', (e) => {
      if (reduce) return
      const r = c.getBoundingClientRect()
      c.style.transform = `perspective(700px) rotateX(${-((e.clientY - r.top) / r.height - .5) * 14}deg) rotateY(${((e.clientX - r.left) / r.width - .5) * 14}deg)`
    })
    c.addEventListener('mouseleave', () => (c.style.transform = ''))
  })

  /* ───────── experience, achievements ───────── */
  $('#tl-list').innerHTML = D.timeline.map((t) => `<li><span class="year" aria-hidden="true">${esc(t.year)}</span>
    <div class="tl-card glass"><span class="badge">${esc(t.badge)}</span><h3>${esc(t.title)}</h3><p class="org">${esc(t.org)}</p><ul>${t.points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div></li>`).join('')
  $('#training').innerHTML = D.training.map((t) => `<li class="glass reveal"><p class="label">${esc(t.year)}</p><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p></li>`).join('')
  D.counters.forEach((c) => { if (c.value === 'REPOS') c.value = D.projects.length })
  $('#counters').innerHTML = D.counters.map((c) => `<div><dd data-count="${c.value}" data-suffix="${c.suffix}">0${c.suffix}</dd><dt class="label">${esc(c.label)}</dt></div>`).join('')
  $('#repo-count').dataset.count = D.projects.length
  $('#ach').innerHTML = D.achievements.map((a, i) => `<div class="ach glass" style="transition-delay:${i * 100}ms"><p class="label">${pad(i + 1)}</p><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></div>`).join('')

  /* ───────── scroll reveals + counters ───────── */
  function countUp(el) {
    const to = +el.dataset.count, suf = el.dataset.suffix || ''
    if (reduce) { el.textContent = to + suf; return }
    const t0 = performance.now()
    const tick = (t) => { const p = clamp((t - t0) / 1600); el.textContent = Math.round((1 - (1 - p) ** 3) * to) + suf; if (p < 1) requestAnimationFrame(tick) }
    requestAnimationFrame(tick)
  }
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return
    e.target.classList.add('in'); if (e.target.dataset.count !== undefined) countUp(e.target)
    io.unobserve(e.target)
  }), { rootMargin: '0px 0px -10% 0px' })
  $$('.reveal, .facts, .table, .repo, .ach, #tl-list > li, [data-split], [data-count]').forEach((el) => io.observe(el))

  /* ───────── magnetic buttons ───────── */
  function bindMagnetic() {
    if (reduce || !finePointer) return
    $$('.magnetic:not([data-bound])').forEach((b) => {
      b.dataset.bound = '1'
      b.addEventListener('mousemove', (e) => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .3}px,${(e.clientY - r.top - r.height / 2) * .3}px)` })
      b.addEventListener('mouseleave', () => (b.style.transform = ''))
    })
  }
  bindMagnetic()

  /* ───────── custom cursor (mouse only) ───────── */
  if (finePointer && !reduce) {
    document.body.classList.add('has-cursor')
    const dot = $('#cursor-dot'), ring = $('#cursor-ring')
    let mx = -100, my = -100, rx = -100, ry = -100
    addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; ring.classList.toggle('big', !!e.target.closest('a, button, input, textarea, .idcard, .panel')) })
    ;(function loop() { rx += (mx - rx) * .15; ry += (my - ry) * .15; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(loop) })()
  }

  /* ───────── one scroll handler: progress, nav, parallax, heading morph, timeline ───────── */
  const nav = $('#nav'), pill = $('#nav-pill'), links = $$('a', nav), sections = links.map((a) => $(a.getAttribute('href')))
  const morphEls = $$('[data-morph]'), heroBg = $('.hero-bg'), tlFill = $('#tl-fill'), tl = $('#timeline'), bar = $('#progress')
  let current = null
  function movePill() {
    const a = links[current]
    if (!a) { pill.style.opacity = 0; return }
    pill.style.opacity = 1; pill.style.width = a.offsetWidth + 'px'; pill.style.transform = `translateX(${a.offsetLeft}px)`
  }
  function onScroll() {
    const vh = innerHeight, y = scrollY, max = document.documentElement.scrollHeight - vh
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`
    // active nav link
    let cur = null
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top <= vh * .45) cur = i })
    if (cur !== current) { links.forEach((a, i) => a.classList.toggle('active', i === cur)); current = cur; movePill() }
    if (!reduce) {
      heroBg.style.transform = `translateY(${Math.min(y, 800) * .25}px)`
      // big headings sharpen as they enter and blur/stretch as they leave
      morphEls.forEach((h) => {
        const r = h.getBoundingClientRect()
        if (r.bottom < -vh * .3 || r.top > vh * 1.05) return
        const p = clamp((vh * .98 - r.top) / (vh * .28)), q = clamp((vh * .16 - r.bottom) / (vh * .41))
        const blur = 14 * (1 - p) + 12 * q
        h.style.filter = blur > .3 ? `blur(${blur.toFixed(1)}px)` : ''
        h.style.opacity = clamp(1 - .8 * (1 - p) - .85 * q, .15, 1)
        h.style.transform = blur > .3 || q > 0 ? `scale(${(.96 + .04 * p + .04 * q).toFixed(3)})` : ''
      })
    }
    // timeline line draws itself
    const tr = tl.getBoundingClientRect()
    tlFill.style.transform = `scaleY(${clamp((vh * .6 - tr.top) / tr.height)})`
  }
  let ticking = false
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; onScroll() }) } }, { passive: true })
  addEventListener('resize', () => { movePill(); onScroll() })

  /* ───────── lanyard: pendulum physics ───────── */
  ;(() => {
    const root = $('#lanyard'), rope = $('#rope'), card = $('#card-wrap')
    const G_OVER_L = 26, DAMP = 1.4
    const st = { th: reduce ? 0 : .5, w: 0, ph: 0, pw: 0, drag: false, last: { a: 0, t: 0 } }
    let raf = 0, prev = performance.now(), visible = true
    const draw = () => { rope.style.transform = `rotate(${st.th}rad)`; card.style.transform = `rotate(${st.ph}rad)` }
    const tick = (now) => {
      const dt = Math.min((now - prev) / 1000, .033); prev = now
      if (!st.drag && !reduce) {
        const acc = -G_OVER_L * Math.sin(st.th) - DAMP * st.w
        st.w += acc * dt; st.th += st.w * dt
        const pacc = -60 * st.ph - 4.5 * st.pw - acc * .45 // card wobbles relative to the rope
        st.pw += pacc * dt; st.ph += st.pw * dt
      }
      draw()
      if (visible) raf = requestAnimationFrame(tick)
    }
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { prev = performance.now(); raf = requestAnimationFrame(tick) } }).observe(root)
    const angle = (e) => { const r = root.getBoundingClientRect(); return clamp(Math.atan2(e.clientX - (r.left + r.width / 2), Math.max(e.clientY - r.top, 20)), -1.3, 1.3) }
    card.addEventListener('pointerdown', (e) => { if (reduce) return; st.drag = true; card.setPointerCapture(e.pointerId); st.last = { a: angle(e), t: performance.now() }; st.w = 0 })
    card.addEventListener('pointermove', (e) => {
      if (!st.drag) return
      const a = angle(e), t = performance.now(), dt = Math.max((t - st.last.t) / 1000, .001)
      st.w = (a - st.last.a) / dt * .6 + st.w * .4; st.ph = -(a - st.th) * .6; st.th = a; st.last = { a, t }
    })
    const up = () => { if (st.drag) { st.drag = false; st.w = clamp(st.w, -9, 9) } }
    card.addEventListener('pointerup', up); card.addEventListener('pointercancel', up)
    draw()
  })()

  /* ───────── contact form ───────── */
  const form = $('#form'), status = $('#form-status'), send = $('#send')
  const say = (cls, msg) => { status.innerHTML = `<p class="${cls}">${msg}</p>` }
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (!form.checkValidity()) { say('err', 'Please fill in your name, a valid email and a message.'); return }
    const data = new FormData(form)
    if (data.get('_gotcha')) return say('ok', '✓ Thanks — your message was sent.')
    if (!D.formspreeId) { // mailto fallback only while no Formspree ID is set in data.js
      location.href = `mailto:${P.email}?subject=${encodeURIComponent('Portfolio enquiry')}&body=${encodeURIComponent(data.get('message') + '\n\n— ' + data.get('name') + ' (' + data.get('email') + ')')}`
      return
    }
    send.disabled = true; send.textContent = 'Sending…'
    try {
      const r = await fetch(`https://formspree.io/f/${D.formspreeId}`, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (r.ok) { say('ok', "✓ Thanks — your message was sent. I'll reply soon."); form.reset() } else say('err', "Couldn't send that. Please try again or email me directly.")
    } catch (err) { say('err', "Couldn't send that. Please try again or email me directly.") }
    send.disabled = false; send.textContent = 'Send message →'
  })
  const talk = $('#talk-em')
  $('#talk').addEventListener('mouseenter', () => (talk.textContent = 'build.'))
  $('#talk').addEventListener('mouseleave', () => (talk.textContent = 'talk.'))

  /* ───────── loader → hero ───────── */
  const loader = $('#loader'), hero = $('#hero')
  const typed = P.fullName
  function reveal() { hero.classList.add('on'); onScroll() }
  if (reduce) { loader.remove(); reveal() } else {
    document.documentElement.style.overflow = 'hidden'
    const t0 = performance.now(), dur = 800
    let fired = false
    const step = (t) => {
      const p = clamp((t - t0) / dur)
      $('#loader-count').textContent = Math.round(p * 100)
      $('#loader-text').textContent = typed.slice(0, Math.ceil(p * typed.length))
      if (p > .75 && !fired) { fired = true; reveal() } // hero starts just before the loader slides away
      if (p < 1) return requestAnimationFrame(step)
      setTimeout(() => { loader.classList.add('done'); document.documentElement.style.overflow = ''; setTimeout(() => loader.remove(), 1000) }, 100)
    }
    requestAnimationFrame(step)
  }
  onScroll()
})()
