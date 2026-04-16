# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

# Serve

python3 -m http.server 3000

http://localhost:3000/test.html

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