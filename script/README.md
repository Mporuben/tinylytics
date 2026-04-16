# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

# Serve

```bash
python3 -m http.server 3000
```

This serves all files in the folder:
- http://localhost:3000/test.html - main test page
- http://localhost:3000/referrer-test.html - test referrer tracking

# API Endpoint

Tracking data is sent to: `http://brrrrm.i-shipped.it/tlfab/logo.jpg` 
Script file is served from: `http://brrrrm.i-shipped.it/script.js`

# Todo list

## 🖥️ Frontend (Script) Work
- [x] Pageview tracking (`e=pageview`)
- [x] Click tracking (`e=click`)
- [x] UUID generation (`u`)
- [x] Page path (`p`)
- [x] Timestamp (`t`)
- [x] Form submissions (`e=form_submit`, `fid=form-id`)
- [x] Contact clicks (`e=contact_click`, `ct=phone|email`)
- [x] Visit duration (`e=leave`, `dur=seconds`)
- [x] Device type (`d=mobile|desktop`)
- [x] Referrer (`r=url`)

## 🔧 Backend Work
- [ ] API endpoint to receive tracking data
- [ ] Store events in database
- [ ] Total Visitors - `COUNT(DISTINCT u)`
- [ ] New vs Returning visitors - Check if `u` first seen today or before
- [ ] Visits (sessions) - Group by `u` + time gaps (>30min = new session)
- [ ] Top pages by views - `COUNT(*) GROUP BY p`
- [ ] Unique visitors by page - `COUNT(DISTINCT u) GROUP BY p`
- [ ] Top landing pages - First `p` in each session
- [ ] Top exit pages - Last `p` in each session
- [ ] Top countries - GeoIP lookup from request IP
- [ ] Realtime / Live visitors - Events where `t > now - 5min`

## ❌ Needs Hosting Level
- [ ] Performance/Speed - Server-side timing
- [ ] Uptime - Server monitoring
- [ ] 404 errors - Server logs

---

# Dashboard Info Texts (for ℹ️ icons)

Use these texts for the info icons on the analytics dashboard.

## Session
> A **session** is a group of user interactions within a **30-minute** window. If the user is inactive for more than 30 minutes, the next interaction starts a new session.

## Events

### Page View
> Counted each time a visitor loads or views a page on your website. Multiple views of the same page by the same visitor are counted separately.

### Click
> Counted each time a visitor clicks anywhere on your page. Useful for measuring engagement and interaction with your content.

### Form Submit
> Counted when a visitor submits a form on your website (e.g., contact form, newsletter signup, registration). This is a key conversion metric.

### Contact Click
> Counted when a visitor clicks a phone number (`tel:` link) or email address (`mailto:` link). Indicates intent to contact you directly.

### Leave (Visit Duration)
> Recorded when a visitor leaves your page. Includes the total time (in seconds) they spent on the page before leaving.

## Metrics

### Total Visitors
> The total number of unique visitors to your website. Each visitor is identified by a unique ID stored in their browser.

### New vs Returning Visitors
> **New visitors** are seeing your site for the first time. **Returning visitors** have visited before (their unique ID was seen on a previous day).

### Visits (Sessions)
> Total number of sessions. One visitor can have multiple sessions if they return after 30+ minutes of inactivity.

### Top Pages
> Pages ranked by total number of views. Shows which content is most popular.

### Unique Visitors by Page
> Number of unique visitors per page. Unlike page views, this counts each visitor only once per page.

### Top Landing Pages
> The first page visitors see when they arrive at your site. Shows where visitors enter your website.

### Top Exit Pages
> The last page visitors see before leaving your site. High exit rates may indicate problems with that page.

### Top Countries
> Visitor locations based on their IP address. Shows where your audience is located geographically.

### Realtime / Live Visitors
> Visitors who have been active on your site in the last 5 minutes. Shows current activity on your website.

### Device Type
> Whether visitors are using **mobile** (phones, tablets) or **desktop** (computers, laptops) devices.