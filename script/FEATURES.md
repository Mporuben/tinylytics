# Dashboard Features

## 1. Total Visitors
**Title:** Zobraziť celkový počet jedinečných návštevníkov za zvolený časový úsek.

**User Story:** As a hosting-customer, I want to see the Total Visitors KPI on the dashboard, so that I instantly know how many different users have reached my website during the selected period.

**Definition:** Počet unikátnych IP/Browser-ID (deduplikované). Indikuje dosah a rast publika.

**Acceptance Criteria:**
- [ ] KPI karta zobrazuje číslo a jednotku "visitors"
- [ ] Môže byť filtrovaná na Last 7 days / 30 days / 90 days
- [ ] Pri kliknutí sa otvorí detail s grafom trendu (line) a možnosť exportu CSV

---

## 2. New Visitors
**Title:** Zobraziť podiel nových (prvé-návštevy) návštevníkov.

**User Story:** As a hosting-customer, I want to see the New Visitors metric, so that I can understand how many visitors are seeing my site for the first time.

**Definition:** Návštevy, kde nie je zaznamenané predchádzajúce ID v systéme. Ukazuje efektivitu akvizičných kanálov (SEO, referral).

**Acceptance Criteria:**
- [ ] KPI karta zobrazuje percentuálny podiel a absolútny počet (napr. 12 000 (45 %))
- [ ] Tooltip: "Noví = prvá návšteva v zvolenom období"
- [ ] Porovnanie s predchádzajúcim obdobím (↑/↓)

---

## 3. Returning Visitors
**Title:** Zobraziť podiel vracajúcich sa návštevníkov.

**User Story:** As a hosting-customer, I want to see the Returning Visitors metric, so that I can gauge how well my site retains audience.

**Definition:** Návštevy, kde je v systéme zaznamenaný existujúci ID. Vyšší podiel → dobrý obsah a lojalita.

**Acceptance Criteria:**
- [ ] KPI karta zobrazuje percentuálny podiel a absolútny počet
- [ ] Bar-chart vedľa New Visitors pre vizuálne porovnanie

---

## 4. Visits (All Sessions)
**Title:** Zobraziť celkový počet session (všetky návštevy).

**User Story:** As a hosting-customer, I want to see the Visits count, so that I get a quick snapshot of overall traffic volume regardless of uniqueness.

**Definition:** Počet sessions (každý otvorenie webu alebo interakcia po 30 min necinnosti je nová session). Indikuje celkovú aktivitu.

**Acceptance Criteria:**
- [ ] Číslo zobrazené v KPI karte a graf trendu (line) pod 7-dňovým a 30-dňovým výberom
- [ ] Možnosť prepnúť "Sessions" ↔ "Page Views" (voliteľné)

---

## 5. Average Visit Duration
**Title:** Zobraziť priemerný čas strávený na stránke na jednu session.

**User Story:** As a hosting-customer, I want to see Average Visit Duration, so that I can assess how engaging my site's content is.

**Definition:** Vypočítané ako Σ (session duration) / #sessions. Dlhšia doba → zaujímavejší alebo relevantnejší obsah.

**Acceptance Criteria:**
- [ ] KPI karta ukazuje čas v min:sec (napr. 02:15)
- [ ] Tooltip: "Priemerná dĺžka všetkých sessions v zvolenom období"
- [ ] Graf – "Avg Duration" (area chart) možno overlayovať s visits

---

## 6. Top Pages by Views
**Title:** Zobraziť zoznam stránok s najvyšším počtom zobrazení.

**User Story:** As a hosting-customer, I want to see Top Pages by Views, so that I know which content attracts the most traffic.

**Definition:** Zoradené podľa page-view count (vrátane opakovaných zobrazení). Pomáha identifikovať populárny obsah.

**Acceptance Criteria:**
- [ ] Tabuľka s Top 5 (alebo nastavený limit) – stĺpce: Page URL, Views, % of total
- [ ] Každý riadok je klikateľný → otvorí detailnú štatistiku danej stránky

---

## 7. Unique Visitors by Page
**Title:** Zobraziť počet jedinečných návštevníkov pre každú top stránku.

**User Story:** As a hosting-customer, I want to see Unique Visitors per Page, so that I understand how many individual users actually read each piece of content.

**Definition:** Počet unikátnych IP/Browser-ID na konkrétnu URL. Odlišuje "povrchové" kliky od skutočného dosahu.

**Acceptance Criteria:**
- [ ] Vedľa Top Pages by Views zobrazíme druhý stĺpec Unique Visitors
- [ ] Percentuálny pomer Unique / Views je zobrazený (napr. 45 %)

---

## 8. Top Landing Pages
**Title:** Zobraziť stránky, na ktoré používatelia pristupujú ako prvé.

**User Story:** As a hosting-customer, I want to see Top Landing Pages, so that I know which entry points drive traffic to my site.

**Definition:** Landing page = URL, kde session začala (prvý request). Kritické pre SEO a kampane.

**Acceptance Criteria:**
- [ ] Tabuľka Top 5 – stĺpce: Landing URL, Sessions, % of total sessions
- [ ] Každý riadok má odkaz na detailnú analýzu (device, geo, bounce)

---

## 9. Top Exit Pages
**Title:** Zobraziť stránky, na ktorých návštevníci najčastejšie ukončujú session.

**User Story:** As a hosting-customer, I want to see Top Exit Pages, so that I can identify potential drop-off points in the user journey.

**Definition:** Stránka, kde posledný request v sessione bol vykonaný. Vysoký exit-rate → možné problémy.

**Acceptance Criteria:**
- [ ] Tabuľka Top 5 – stĺpce: Exit URL, Exits, Exit % of page views
- [ ] Ďalší graf: "Exit rate per page" (bar chart)

---

## 10. Form Submissions
**Title:** Zobraziť celkový počet odoslaných formulárov za zvolený časový úsek.

**User Story:** As a hosting-customer, I want to see Form Submissions, so that I can measure lead generation or user engagement via my contact forms.

**Definition:** Každé úspešné POST request na definovaný /form-handler je zaznamenané.

**Acceptance Criteria:**
- [ ] KPI karta zobrazuje počet (napr. 124)
- [ ] Kliknutím sa otvorí zoznam posledných 10 odchádzajúcich submission-ov (čas, URL, pole "subject")

---

## 11. Form Conversion Rate
**Title:** Vypočítať a zobraziť pomer Form Submissions / Visits.

**User Story:** As a hosting-customer, I want to see Form Conversion Rate, so that I know how efficiently my site turns visitors into leads.

**Definition:** Výpočet: (Form Submissions ÷ Visits) × 100 %. Jednoduchý benchmark.

**Acceptance Criteria:**
- [ ] KPI karta ukazuje percento (napr. 1.8 %)
- [ ] Hover/tooltip: "Form Submissions ÷ Visits (zvolený period)"
- [ ] Porovnanie s predchádzajúcim obdobím (↑/↓)

---

## 12. Top Countries
**Title:** Zobraziť krajiny s najvyšším počtom návštevníkov.

**User Story:** As a hosting-customer, I want to see Top Countries, so that I understand the geographic distribution of my audience.

**Definition:** Geolokácia podľa IP (max-mind alebo interný lookup). Umožňuje lokalizovať obsah.

**Acceptance Criteria:**
- [ ] Horizontálny bar-chart alebo mapa s Top 5 krajinami – stĺpce: Country, Visitors, % of total
- [ ] Kliknutím na krajinu zobrazí detail (cities, device mix)

---

## 13. Realtime - Live Visitors Now
**Title:** Zobraziť aktuálny počet aktívnych návštevníkov (posledných 5 minút).

**User Story:** As a hosting-customer, I want to see Live Visitors Now, so that I can monitor real-time traffic spikes.

**Definition:** Počet sessions, kde je posledná interakcia < 5 min. Aktualizácia každých 10 s.

**Acceptance Criteria:**
- [ ] Číselná indikácia (veľké písmo, zelený kruh)
- [ ] Animovaný counter, ktorý sa aktualizuje v reálnom čase
- [ ] Tooltip: "Sessions active in last 5 min"

---

## 14. Realtime - Top Country Now
**Title:** Zobraziť aktuálnu krajinu, z ktorej práve prichádza najviac live visitors.

**User Story:** As a hosting-customer, I want to see Top Country Now, so that I immediately know which region is generating the current traffic burst.

**Definition:** Na základe IP-geolokácií, počítané len za posledných 5 min.

**Acceptance Criteria:**
- [ ] Text/flag ikonka + počet live visitors z tejto krajiny
- [ ] Aktualizácia každých 10 s
- [ ] Tooltip: "Live visitors from this country in the last 5 min"
