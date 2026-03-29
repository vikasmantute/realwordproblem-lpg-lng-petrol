# ⛽ FuelIndia — Consumer Fuel Management Platform

> **Solving the Real-World Problem of Fuel Crowd, Panic Buying & Supply Crisis from the Consumer's Perspective**

---

## ⚠️ Disclaimer

> **This is a Prototype / Educational Project.**
>
> All data, stations, prices, bookings, user accounts, and availability figures shown in this application are **entirely fictional and generated for demonstration purposes only**.
> This project is **NOT connected** to any:
> - Live fuel pricing APIs (IOC / BPCL / HPCL / MGL / MNGL)
> - Real LPG distributor networks
> - Actual CNG station infrastructure
> - Any commercial, government, or regulated fuel supply system
>
> This prototype was built as a **design and technology education exercise** to explore how digital platforms can reduce public panic and crowd formation during fuel scarcity events. It is not intended for deployment, commercial use, or any real-world fuel distribution activity.

---

## 🧩 The Real-World Problem

### Why Crowds and Panic Form at Fuel Stations

Every time there is a fuel price hike announcement, a political crisis, a natural disaster, or a supply disruption, the following chain reaction occurs within hours:

```
Rumour / News Breaks
        ↓
Citizens rush to nearest petrol pump / LPG dealer / CNG station
        ↓
Queues form quickly — often 30–90 minutes long
        ↓
Physical crowding creates safety hazards (heat, accidents, arguments)
        ↓
Actual supply runs out faster due to panic-driven over-purchasing
        ↓
Genuine needs (ambulances, commercial vehicles, cooking fuel) go unmet
        ↓
Black market pricing and hoarding begin
        ↓
Government rationing kicks in — but too late
```

### India-Specific Scale

| Metric | Figure |
|--------|--------|
| LPG subscribers in India | ~320 million households |
| CNG vehicles on road | ~6 million+ |
| Petrol pumps across India | ~82,000+ |
| Oil import dependency | ~85% of crude requirement |
| Key supply choke point | Strait of Hormuz (20% of global oil supply) |

Any geopolitical event (Iran–Iraq region, Red Sea tensions, Gulf instability) immediately triggers supply uncertainty — and citizens respond with panic, not information.

---

## 💡 The Solution — From the Consumer's Perspective

The platform gives every registered consumer **real-time information + advance booking capabilities** so they never need to physically rush or stand in a queue.

### Core Consumer Philosophy

> **"Know before you go. Book before you travel. Track without calling."**

---

## 🔑 Consumer Features — Detailed Breakdown

---

### 1. 📊 Real-Time Fuel Availability Dashboard

**Problem it solves:** Citizens have no reliable source to check if their nearby station actually has fuel stock before physically going there.

**How it works:**
- Dashboard shows live stock levels for Petrol pumps, LPG distributors, CNG stations
- Stock classified into three tiers:
  - 🟢 **High** (>60% capacity) — Go anytime, no queue
  - 🟡 **Medium** (30–60% capacity) — Slight wait expected
  - 🔴 **Low** (<30% capacity) — Pre-book strongly recommended
- Station pressure levels, nozzle availability, and compressor status shown for CNG
- Last updated timestamp visible on every card

**Crowd prevention impact:**
- Consumers spread themselves across multiple stations instead of all rushing to the nearest one
- Informed decisions replace fear-driven behaviour

---

### 2. 🔵 LPG Cylinder Pre-Booking

**Problem it solves:** During scarcity, all consumers call the same distributor simultaneously — phone lines jam, delivery dates are unknown, and cylinders are sold under the counter.

**How it works:**
- Consumer selects their LPG distributor from a geo-sorted list
- Checks real-time cylinder availability count
- Books a **specific delivery date slot** up to 7 days in advance
- Receives a **unique booking token** (e.g., `LPG-2026-XXXX`)
- Delivery status tracked through three stages:
  - `Confirmed` → `Out for Delivery` → `Delivered`

**Consumer protections built in:**
- One active booking per consumer at a time (prevents hoarding)
- Booking confirmation via session token
- Cancellation allowed up to 24 hours before delivery date
- Historical booking log accessible anytime

**Crowd prevention impact:**
- Distributor knows exact demand 7 days ahead — can plan supply accordingly
- Consumers do not rush distributors or retail outlets
- Delivery driver routes can be optimised (clustered by area)

---

### 3. ⛽ Petrol Pump QR Pre-Booking

**Problem it solves:** Long queues at petrol pumps during price-hike days, festivals, and pre-weekend rushes. Vehicles idle in queues, burning the very fuel they came to buy.

**How it works:**
- Consumer browses nearby petrol pumps with current stock status
- Selects a **30-minute arrival window** (e.g., 10:30 AM – 11:00 AM)
- Chooses fuel type (Petrol / Diesel) and target fill amount
- Receives a **QR code** tied to the booking slot
- At the pump: scans QR → goes to dedicated pre-booked lane → fuelled in under 5 minutes

**Consumer guard rails:**
- QR code expires if consumer arrives more than 10 minutes after slot start
- Maximum fill limit per booking (prevents jerry-can hoarding)
- Vehicle number registered at booking (prevents proxy bookings)

**Crowd prevention impact:**
- Walk-in queue is physically separated from pre-booked lane
- Station attendants can predict load 30 minutes ahead
- Peak hours (7–9 AM, 5–7 PM) distributed across time slots, reducing simultaneous arrivals by ~60–70%

---

### 4. 💨 CNG Station Slot Management

**Problem it solves:** CNG queues can be 45–90 minutes during morning peaks. Vehicles queue up from 5 AM, blocking roads and causing traffic congestion around stations.

**How it works:**
- Consumer opens CNG station list — sees live pressure level, current occupancy, and estimated wait time
- Selects a **5-minute fill slot** for their vehicle type (Two-Wheeler / Four-Wheeler / Heavy Vehicle)
- System enforces capacity per slot based on number of active nozzles
- Token generated with station, date, time, vehicle type, and max kg allowed
- Consumer arrives in the correct window, fills without waiting, and exits

**Smart slot features:**
- Walk-in buffer maintained (20% of slots reserved for on-site arrivals)
- Heavy vehicles directed to off-peak slots automatically
- Advance booking available for up to 3 days (prevents last-minute rush on busy days)

**Crowd prevention impact:**
- Station knows exactly how many vehicles to expect per 5-minute window
- Road queues outside stations eliminated
- Two-wheelers and four-wheelers no longer compete for the same nozzle window

---

### 5. 📋 My Bookings — Unified Fuel History

**Problem it solves:** Consumers forget their booking tokens, lose paper receipts, and have no single view of all their fuel transactions.

**How it works:**
- Single dashboard shows:
  - Active Petrol bookings (QR + time slot)
  - Active LPG delivery bookings (token + status)
  - Active CNG slot bookings (token + station + time)
  - Completed history for all three fuel types
- Cancel any active booking from the same screen
- Re-book with one tap from history (carries forward station preference)

---

### 6. 👤 Consumer Profile & Preferences

**Problem it solves:** Consumers waste time re-entering vehicle numbers, addresses, and fuel preferences on every booking.

**How it works:**
- Saved profile: name, mobile, address, pin code
- Default vehicle type stored for CNG bookings
- LPG connection type (domestic / commercial) stored once
- Preferred petrol pump and CNG station saved as favourites
- Emergency contact for LPG delivery confirmation

---

## 🗺️ How the Full Consumer Journey Works (Crisis Scenario)

```
Day 1 — Price Hike Announced at 6:00 PM
│
├─ Consumer opens FuelIndia app at 6:05 PM
│
├─ Dashboard shows:
│   • Nearest petrol pump: MEDIUM stock (55%) — 2 slots available at 7:30 PM
│   • LPG distributor: HIGH stock — booking open for tomorrow
│   • CNG station: HIGH pressure — slots available for 7:00 AM tomorrow
│
├─ Consumer pre-books:
│   • Petrol → 7:30 PM slot → receives QR code
│   • CNG → tomorrow 7:00 AM slot → receives token CNG-2026-XXXX
│
├─ Consumer arrives at petrol pump at 7:28 PM
│   • Scans QR → pre-booked lane → done in 4 minutes
│   • No queue, no panic, no wasted idle time
│
├─ Next morning — Consumer arrives at CNG station at 6:58 AM
│   • Shows token → fills in allocated 5-minute window
│   • Road outside station is clear (slots spread arrivals)
│
└─ LPG delivered to door within 2 days — no phone calls, no uncertainty
```

---

## 🏗️ Technical Architecture (Consumer App)

```
consumer-app/
├── app.js                    — Express server, session, flash, routes
├── package.json              — Dependencies
├── tailwind.config.js        — Tailwind CSS config
├── .env                      — Session secret, port
│
├── data/                     — JSON-based flat storage (no database)
│   ├── consumers.json        — Registered consumer accounts
│   ├── pumps.json            — Petrol pump master data
│   ├── distributors.json     — LPG distributor master data
│   ├── stations_cng.json     — CNG station master data
│   ├── bookings_petrol.json  — Petrol pre-bookings
│   ├── bookings_lpg.json     — LPG pre-bookings
│   └── bookings_cng.json     — CNG slot bookings
│
├── helpers/
│   ├── storage.js            — Read/write JSON data helpers
│   └── queue.js              — Slot generation, token logic, capacity calc
│
├── middleware/
│   └── auth.js               — Session auth guard, flash variable injector
│
├── routes/
│   ├── index.js              — Public home, about
│   ├── auth.js               — Login, register, logout
│   ├── dashboard.js          — Consumer dashboard
│   ├── petrol.js             — Pump listing, QR booking, cancel
│   ├── lpg.js                — LPG booking, track
│   ├── cng.js                — CNG station list, slot booking, QR, cancel
│   ├── booking.js            — My Petrol / My LPG / My CNG / All bookings
│   └── profile.js            — View & edit profile
│
├── views/
│   ├── layout/
│   │   ├── header.ejs        — DOCTYPE, Tailwind CDN, styles, top disclaimer bar
│   │   └── footer.ejs        — Footer, scripts
│   ├── partials/
│   │   └── navbar.ejs        — Responsive nav, mobile menu
│   └── pages/
│       ├── index.ejs         — Landing page
│       ├── about.ejs         — About the platform
│       ├── dashboard.ejs     — Consumer dashboard
│       ├── auth/             — login.ejs, register.ejs
│       ├── petrol/           — pumps.ejs, book.ejs, qr.ejs
│       ├── lpg/              — book.ejs, track.ejs
│       ├── cng/              — stations.ejs, book.ejs, qr.ejs
│       ├── booking/          — my_petrol.ejs, my_lpg.ejs, my_cng.ejs, all.ejs
│       └── profile.ejs
│
└── public/
    └── css/
        ├── input.css         — Tailwind base input
        └── output.css        — Compiled CSS (generated by build)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Installation

```bash
cd consumer-app
npm install
```

### Running the App

```bash
# Development (auto-restart on file changes)
npm run dev

# Production
npm start
```

App runs at: **http://localhost:3000**

### CSS Build

```bash
# One-time build
npm run build

# Watch mode (rebuilds on CSS changes)
npm run build:watch
```

### Demo Login

| Field | Value |
|-------|-------|
| Mobile | `9876543210` |
| Password | `password123` |

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `express` | HTTP server and routing |
| `ejs` | Server-side HTML templating |
| `express-session` | Consumer login session management |
| `connect-flash` | One-time success/error messages |
| `bcryptjs` | Password hashing |
| `qrcode` | QR code generation for bookings |
| `uuid` | Unique booking token generation |
| `nodemon` | Dev auto-restart |
| `tailwindcss` | Utility-first CSS (CLI build) |

---

## 🌐 Application Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page |
| `/about` | Public | Platform overview |
| `/auth/login` | Public | Consumer login |
| `/auth/register` | Public | New consumer registration |
| `/dashboard` | Login required | Personal dashboard |
| `/petrol/pumps` | Login required | Browse petrol pumps |
| `/petrol/book/:pumpId` | Login required | Book a petrol slot |
| `/petrol/qr/:bookingId` | Login required | View QR for booking |
| `/lpg/book` | Login required | Book LPG cylinder delivery |
| `/lpg/track` | Login required | Track LPG delivery status |
| `/cng/stations` | Login required | Browse CNG stations |
| `/cng/book/:stationId` | Login required | Book a CNG time slot |
| `/cng/qr/:bookingId` | Login required | View CNG booking QR |
| `/booking/my-petrol` | Login required | My petrol bookings |
| `/booking/my-lpg` | Login required | My LPG bookings |
| `/booking/my-cng` | Login required | My CNG bookings |
| `/booking/all` | Login required | All bookings (unified view) |
| `/profile` | Login required | View & edit profile |

---

## 📉 Measurable Impact Goals (Conceptual)

If deployed at scale, the platform targets:

| Problem | Current State | Target Improvement |
|---------|--------------|-------------------|
| Average petrol pump queue time (crisis day) | 45–90 min | < 10 min (pre-booked lane) |
| LPG panic calls to distributor | 500–1,000/day | < 50/day (booking deflects calls) |
| CNG road queue length at peak | 15–25 vehicles | < 5 vehicles (slot distribution) |
| Fuel hoarding per consumer | Uncontrolled | Capped per booking rules |
| Black market fuel sales | High during crises | Near zero (verified booking chain) |
| Consumer information access | Word of mouth | Real-time data in <30 seconds |

---

## 🔭 Future Scope (Beyond This Prototype)

- **Aadhaar-linked booking** — one booking per family per crisis window
- **SMS/WhatsApp notification** — slot reminders, delivery alerts
- **Government authority portal** — emergency rationing controls
- **IoT sensor integration** — real-time tank level from physical sensors
- **AI demand forecasting** — predict rush 48 hours ahead based on news sentiment
- **Multi-language support** — Hindi, Marathi, Tamil, Bengali, Telugu
- **Offline mode** — last-mile areas with poor connectivity
- **Grievance redressal** — in-app complaint filing to regulator (PNGRB / MoPNG)

---

## 📄 License

This project is released for **educational and portfolio purposes only**. No commercial use, redistribution, or connection to real fuel infrastructure is permitted or implied.

---

*Built as a conceptual prototype to explore how technology can bring calm, order, and equity to essential resource distribution during times of scarcity and public panic.*
