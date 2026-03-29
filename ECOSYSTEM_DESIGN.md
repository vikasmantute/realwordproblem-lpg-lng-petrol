# Fuel & Energy Ecosystem Design
## Real-World Problem: LPG | LNG | CNG | Petrol Distribution & Crisis Management Platform

---

## 1. Context & Background

### 1.1 Geopolitical Energy Crisis Reference
- The **Iran–Iraq War (1980–1988)** disrupted global oil supply chains, causing fuel shortages, price spikes, and rationing across Asia and the Middle East.
- India, being heavily dependent on oil imports from the Gulf region, experienced severe **fuel scarcity, black market fuel trade, and public panic**.
- History repeats: Any escalation in the **Strait of Hormuz** (through which ~20% of global oil passes) directly threatens India's LPG/LNG/Petrol supply.
- **Lesson learned:** A distributed, transparent, and technology-driven fuel management ecosystem can prevent hoarding, panic buying, and supply-chain collapse.

### 1.2 India-Specific Energy Challenges
- India imports ~85% of its crude oil requirements.
- Over **320 million LPG cylinder subscribers** under PMUY and other schemes.
- Panic situations arise due to:
  - Sudden price hikes by oil marketing companies (IOC, BPCL, HPCL)
  - Natural disasters disrupting road/rail logistics
  - Political instability in oil-exporting nations
  - Cyber attacks on refinery SCADA systems
  - Strikes by truck unions (fuel tanker drivers)
- Consumers rush to fill cylinders, jerry cans, and vehicles, creating artificial shortages.

### 1.3 Energy Limitation Factors
- Finite fossil fuel reserves
- Distribution bottlenecks (last-mile delivery)
- Cylinder/tank availability mismatch
- Seasonal demand spikes (winter LPG surge)
- Rural vs. Urban access inequality
- Electricity grid instability affecting CNG station compressors

---

## 2. Ecosystem Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                    FUEL ECOSYSTEM PLATFORM                        │
│                                                                    │
│   ┌─────────────┐   ┌──────────────┐   ┌──────────────────────┐  │
│   │ Public Page │   │ Consumer App │   │ Service Provider App │  │
│   │  (No Login) │   │  (Login Req) │   │    (Login Required)  │  │
│   └─────────────┘   └──────────────┘   └──────────────────────┘  │
│                                                                    │
│   ┌────────────────────────────────────────────────────────────┐  │
│   │              Backend API + Real-Time Engine                │  │
│   └────────────────────────────────────────────────────────────┘  │
│                                                                    │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐   │
│   │ Govt/OMC │  │  Tanker  │  │ Cylinder │  │  Payment GW   │   │
│   │  API     │  │Tracking  │  │ Registry │  │  (UPI/BHIM)   │   │
│   └──────────┘  └──────────┘  └──────────┘  └───────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 3. Platform Modules

---

### 3.1 PUBLIC PAGE (No Login Required)

**Purpose:** Provide transparent, real-time fuel information to any citizen without registration. Reduces panic by ensuring open access to availability data.

#### 3.1.1 Live Fuel Availability Map
- Interactive map showing nearby:
  - LPG distributors (cylinder availability count)
  - CNG stations (queue length, compressor status: Online/Offline)
  - LNG dispensing points (industrial/transport hubs)
  - Petrol pumps (stock level: High / Medium / Low / Dry)
- Color-coded indicators:
  - 🟢 Green — Available, no queue
  - 🟡 Yellow — Limited stock, moderate queue
  - 🔴 Red — Critical stock, long queue
  - ⚫ Black — Out of stock / Station closed

#### 3.1.2 Today's Fuel Prices
- Real-time price board updated daily at 06:00 AM IST
- Price breakup displayed:
  - Base price (refinery gate price)
  - Central Excise Duty
  - State VAT/Sales Tax
  - Dealer commission
  - **Final retail price per litre / per cylinder**
- Historical price graph (last 30 / 90 / 365 days)
- Price comparison across cities (Metro / Tier-2 / Rural)

#### 3.1.3 Crisis Alerts & Notifications
- Government-issued shortage warnings
- Estimated resupply date for affected areas
- Authorized rationing rules (if applicable)
- Emergency helpline numbers (OMC toll-free, district supply officer)

#### 3.1.4 Fuel Education Center
- What is LPG, LNG, CNG, Petrol — explained in simple terms
- Safety guidelines for each fuel type
- How to detect gas leaks
- Cylinder inspection checklist
- Subsidy eligibility checker (BPL / PMUY)
- Conversion benefits: Petrol → CNG FAQ

#### 3.1.5 Supply Chain Transparency Dashboard
- Total tanker trucks dispatched today (state-wise)
- Refinery production output (last 24 hours)
- Port import data (Hazira LNG terminal, Ennore terminal)
- Railway freight movement of fuel (Rail Wagon tracker)

#### 3.1.6 Consumer App — Public Preview (No Login Required)
**Purpose:** Allow any user to see booking availability, queue status, and expected wait time before deciding to register, removing the fear of "is there even stock?"

- **Booking Slot Availability Widget:**
  - Instantly shows available time slots for LPG delivery in the user's PIN code area
  - Shows: Next available slot, slots remaining today, next 3 days calendar view
  - No login needed — just enter PIN code or allow location access
- **Live Token Queue Viewer:**
  - See current token number being served at nearby distributor/CNG station
  - See your estimated position in virtual queue before even booking
  - Queue depth per fuel type displayed (LPG, CNG, Petrol cans)
- **City-Wide Stock Heatmap:**
  - District/zone level colour heatmap showing aggregate fuel availability
  - Updated every 30 minutes from warehouse and distributor data
  - Drill down: State → District → Zone → PIN code → Individual outlet
- **"Check Before You Go" Tool:**
  - Enter your nearest CNG station or LPG distributor
  - See: Queue length, compressor status, stock level, last restocked time
  - Recommendation: Go now / Wait 2 hours / Try alternate location
- **Estimated Delivery Date Preview:**
  - Enter PIN code → system shows "If you book today, expected delivery: [Date]"
  - Based on real warehouse stock, delivery agent capacity, and pending orders
  - No login required — public transparency tool
- **Slot Popularity Graph:**
  - Bar chart of peak booking hours for each day of the week
  - Helps consumers avoid rush periods
  - "Best time to book" recommendation displayed

---

### 3.2 CONSUMER LOGIN

**Purpose:** Registered consumers can manage their fuel needs, book deliveries, track orders, and receive personalized alerts.

#### 3.2.1 Consumer Registration & KYC
- Registration fields:
  - Full name, mobile number (OTP verified)
  - Aadhaar number (for subsidy linking) — optional
  - Address with PIN code
  - Property type: Domestic / Commercial / Industrial
- KYC documents:
  - Aadhaar Card
  - Ration Card (for BPL subsidy)
  - Vehicle RC (for CNG/Petrol consumers)
- Fuel type preference selection:
  - [ ] LPG (Domestic cooking)
  - [ ] CNG (Vehicle)
  - [ ] LNG (Industrial/Commercial)
  - [ ] Petrol/Diesel (Vehicle)

#### 3.2.2 LPG Cylinder Management
- Registered cylinder serial numbers linked to account
- Booking:
  - One-click refill booking
  - Scheduled booking (choose date & time slot)
  - Emergency booking (crisis mode — priority queue, higher fee)
- Booking status tracking:
  - Confirmed → Dispatched → Out for Delivery → Delivered
- Delivery person real-time location (last-mile GPS tracking)
- Proof of delivery (OTP-based confirmation)
- Receipt download (PDF)
- Annual consumption history
- **Cylinder Safety Audit:**
  - Last inspection date
  - Cylinder age (mandatory replacement after 15 years)
  - Regulator condition log
  - Rubber tube replacement reminder

#### 3.2.2-A Online Booking System — Detailed Flow

**Step 1 — Booking Initiation:**
- Consumer taps "Book Refill" from dashboard
- System auto-detects registered address PIN code
- System queries city warehouse allocation engine in real-time
- Displays:
  - Current stock at nearest distributor
  - Available delivery slots for next 7 days
  - Estimated delivery window (not just date — 2-hour time band)
  - Expected confirmation status: Instant / Delayed (explained below)

**Step 2 — Slot Selection:**
- Calendar view with slot availability:
  ```
  Mon 31 Mar   ████████░░  8 slots left
  Tue 01 Apr   ██████████  Full — 0 slots
  Wed 02 Apr   ░░░░░░░░░░  Opening soon
  Thu 03 Apr   ████░░░░░░  12 slots left  ← Recommended
  ```
- Filter by: Morning (8am–12pm) / Afternoon (12pm–4pm) / Evening (4pm–7pm)
- Priority slot indicator: Slots reserved for medical/elderly consumers flagged
- Consumer picks preferred slot → provisional hold placed (15-minute hold timer)

**Step 3 — Warehouse Allocation Check (Real-Time):**
- Platform queries the City Warehouse Allocation Engine (see Section 3.4)
- If stock confirmed at city warehouse → slot locked immediately
- If stock in transit (tanker en route) → Delayed Confirmation mode triggered (see Section 3.5)
- If no stock expected within 48 hours → consumer placed in Priority Waitlist

**Step 4 — Payment:**
- Payment at booking time (recommended) — locks the slot
- Pay on delivery option (slot held but not locked — can be released if not confirmed)
- Supported: UPI, BHIM, card, net banking, fuel wallet
- For Delayed Confirmation bookings: No charge until delivery confirmed

**Step 5 — Booking Confirmation:**
- **Instant Confirmation:** Booking ID + QR code issued immediately (stock available)
- **Delayed Confirmation:** Booking reference issued; confirmed within 4–48 hours based on stock arrival
- Consumer receives:
  - SMS confirmation
  - WhatsApp message with booking details
  - In-app notification with live tracking link

**Step 6 — Delivery Day:**
- Morning of delivery: Push notification "Your delivery is scheduled today between 10am–12pm"
- 1 hour before: "Delivery agent [Name] is on the way — Track here: [link]"
- Live GPS map of delivery agent
- OTP sent to registered mobile — share with agent to confirm delivery
- Post-delivery: Rating prompt + receipt download

#### 3.2.3 CNG Vehicle Management
- Register vehicle (RC number, vehicle type, engine CC)
- Nearest CNG station locator with:
  - Queue time estimate (in minutes)
  - Compressor capacity (kg/hour)
  - Operating hours
  - Ratings & reviews
- Fuel consumption tracker:
  - Log fill-ups manually or via auto-sync (OBD device integration)
  - Mileage per kg CNG
  - Monthly CNG expense report
  - CO₂ savings vs. Petrol equivalent (environmental impact)
- CNG Kit Registration (for retro-fitted vehicles):
  - Kit serial number
  - Installation center details
  - RTO approval certificate upload
  - Annual renewal reminder

#### 3.2.4 Petrol/Diesel Tracking
- Nearby pump finder with live stock status
- Price alerts: notify when petrol price changes in home city
- Fuel log (manual entry):
  - Date, pump name, litres filled, amount paid, odometer reading
  - Auto-calculate fuel efficiency (km/litre)
  - Monthly expense tracking
- Loyalty points from participating fuel stations

---

#### 3.2.4-A Petrol Pump Pre-Booking & QR Slot System

**Core Idea:** Consumer pre-books a timed filling slot at a specific petrol pump from the app. On arrival, they scan a QR code at the pump — the nozzle activates for their vehicle, quantity, and pre-paid amount. Zero physical queue. Zero waiting in line.

---

##### 3.2.4-A.1 How Petrol Pre-Booking Works (Consumer Flow)

```
Consumer opens App
        ↓
Searches "Petrol Pump" by GPS / PIN code / Name
        ↓
Selects specific pump (e.g., "HP Petrol Pump, Andheri East")
        ↓
Views available time slots for today / next 3 days
        ↓
Selects slot (e.g., 11:00 AM – 11:15 AM)
        ↓
Enters: Vehicle number + Fuel quantity (litres) + Fuel grade
        ↓
Pays online (UPI / Card / Fuel Wallet)
        ↓
QR Code generated — booking confirmed
        ↓
Arrives at pump within slot window
        ↓
Scans QR at designated nozzle bay
        ↓
Nozzle auto-authorised → Pump dispenses exact pre-booked litres
        ↓
Digital receipt generated → Fuel log updated automatically
```

---

##### 3.2.4-A.2 Per-Pump Slot Capacity Model

Every registered petrol pump has a **unique slot configuration** based on its physical infrastructure:

| Pump Parameter | Description |
|---|---|
| Number of nozzles | Physical dispensing points (e.g., 6 nozzles) |
| Nozzle flow rate | Litres per minute (typically 40–60 LPM) |
| Slot duration | Time per vehicle (default: 10 minutes per slot) |
| Slots per hour per nozzle | 60 min ÷ slot duration = 6 slots/hour/nozzle |
| Total slots per hour | Nozzles × slots per hour (e.g., 6 × 6 = 36 slots/hour) |
| Booking open window | Slots open 24h in advance (configurable by pump owner) |
| Walk-in buffer | 20% slots reserved for walk-in customers (not pre-bookable) |
| Advance booking cap | Max 80% of slots available for pre-booking |

**Example calculation for a 6-nozzle pump:**
$$\text{Total Bookable Slots/hour} = 6 \text{ nozzles} \times 6 \text{ slots/nozzle} \times 80\% = 28 \text{ slots/hour}$$

---

##### 3.2.4-A.3 Slot Booking Screen — Consumer View

```
┌─────────────────────────────────────────────────────────────────┐
│  🔴 HP Petrol Pump — Andheri East, Mumbai                       │
│  Stock Level: Medium  |  Distance: 1.2 km  |  Rating: 4.3 ★    │
├─────────────────────────────────────────────────────────────────┤
│  SELECT DATE:   Today  |  Tomorrow  |  Mon 31 Mar               │
├───────────┬───────────┬───────────┬───────────┬─────────────────┤
│  09:00 AM │  09:10 AM │  09:20 AM │  09:30 AM │  09:40 AM       │
│  ██ FULL  │  ██ FULL  │  ✅ 3 left│  ✅ 8 left│  ✅ 12 left     │
├───────────┴───────────┴───────────┴───────────┴─────────────────┤
│  10:00 AM  ██ FULL    10:10 AM  ✅ 5 left    10:20 AM ✅ 9 left │
│  10:30 AM  ✅ 11 left  10:40 AM  ✅ 14 left ← RECOMMENDED       │
├─────────────────────────────────────────────────────────────────┤
│  BOOKING DETAILS:                                               │
│  Vehicle No:  [ MH01AB1234      ]  (from your garage)           │
│  Fuel Grade:  ○ Regular (₹94.5/L)  ● Premium (₹99.0/L)         │
│  Quantity:    [ 10 ] litres    Amount: ₹990.00                  │
│  Nozzle bay auto-assigned on arrival                            │
├─────────────────────────────────────────────────────────────────┤
│  [  PAY ₹990 & BOOK SLOT  ]         [ CANCEL ]                  │
└─────────────────────────────────────────────────────────────────┘
```

---

##### 3.2.4-A.4 QR Code — Generation & Structure

**QR code is generated immediately after payment.**

Encoded data inside QR:
```json
{
  "booking_id": "PTR-MUM-2026-049281",
  "pump_id": "HP-ANDH-EAST-001",
  "slot_time": "2026-03-29T10:40:00+05:30",
  "slot_window_minutes": 10,
  "vehicle_number": "MH01AB1234",
  "fuel_grade": "PREMIUM",
  "quantity_litres": 10.0,
  "amount_paid": 990.00,
  "payment_ref": "UPI-NPCI-8847291034",
  "consumer_id_hash": "sha256-hashed",
  "signature": "ECDSA-signed-by-platform"
}
```

**QR Security Features:**
- Digitally signed by platform (ECDSA) — cannot be forged or screenshot-reused
- One-time use: QR invalidates after first successful scan
- Time-bound: QR only scannable within ±15 minutes of booked slot time
- Vehicle number printed on QR — pump attendant cross-checks with vehicle plate
- If vehicle plate mismatch → QR scan rejected, pump does not activate

---

##### 3.2.4-A.5 At the Pump — Arrival & Scanning

**Pump-side hardware:**
- QR scanner unit at each nozzle bay (weatherproof, outdoor-grade)
- Display screen showing: "Ready to scan / Scan your booking QR"
- Connected to pump controller unit via local network (LAN / 4G fallback)
- Pump controller authorises nozzle release after valid QR scan

**Consumer Steps at Pump:**
1. Drive into designated pre-booking bay (marked with "PRE-BOOK LANE" signage)
2. Open app → tap "Show QR" on booking card
3. Hold QR in front of bay scanner
4. Screen shows: "✅ MH01AB1234 — 10L Premium — AUTHORISED"
5. Nozzle activates — attendant picks up nozzle and begins dispensing
6. Pump auto-stops at exactly 10 litres (quantity locked at booking)
7. Screen shows: "✅ Dispensing complete — 10.00 L dispensed"
8. Consumer drives away — no cash transaction needed

**Grace Period:**
- Consumer can arrive up to 5 minutes before slot start
- Late arrival: up to 10 minutes after slot starts (grace window)
- If not arrived within grace window → slot cancelled, refund processed within 2 hours

---

##### 3.2.4-A.6 Petrol Pump — Separate Booking Management (Pump Owner View)

Each petrol pump is an **independent entity** in the system with its own configuration, slot calendar, and booking management. No two pumps share slots.

**Pump Owner Configuration Panel:**
- Set nozzle count and slot duration (default 10 min, configurable to 5/15/20)
- Define peak hours (slots per hour can vary: allow 4 slots during peak, 6 during off-peak)
- Set advance booking window (24h / 48h / 72h ahead)
- Define walk-in reserve %: how many slots kept for on-the-spot customers
- Set per-vehicle quantity limit (e.g., max 20 litres per booking during crisis mode)
- Blackout periods: block slots for shift change, tanker arrival, maintenance

**Pump Booking Dashboard (Live View):**
```
┌──────────────────────────────────────────────────────────┐
│  HP ANDHERI EAST — Today's Slot Board    10:35 AM        │
├───────────┬─────────────┬────────────┬───────────────────┤
│  Slot     │  Status     │  Vehicle   │  Litres           │
├───────────┼─────────────┼────────────┼───────────────────┤
│  10:30 AM │  COMPLETED  │ MH02CD5678 │  15L Regular      │
│  10:40 AM │  ARRIVED ✅ │ MH01AB1234 │  10L Premium      │
│  10:50 AM │  CONFIRMED  │ MH03EF9012 │  20L Regular      │
│  11:00 AM │  CONFIRMED  │ MH04GH3456 │   8L Premium      │
│  11:10 AM │  CONFIRMED  │ MH05IJ7890 │  12L Regular      │
│  11:20 AM │  WALK-IN    │  Reserved  │  (not pre-booked) │
│  11:30 AM │  AVAILABLE  │     —      │  (not yet booked) │
├───────────┴─────────────┴────────────┴───────────────────┤
│  Today: 84 pre-booked | 12 walk-in | 18 slots remaining  │
│  Revenue so far: ₹72,450   |   Stock: ~4,200L remaining  │
└──────────────────────────────────────────────────────────┘
```

---

##### 3.2.4-A.7 Limited Capacity Booking Controls

**Normal Mode:**
- 80% of slots pre-bookable; 20% walk-in reserved
- Max per vehicle: 40 litres per day (platform enforced, not just pump rules)
- Max bookings per vehicle RC per day: 1 (prevents multiple bookings at different pumps)
- Same-vehicle duplicate booking blocked across all registered pumps in the city

**Crisis Mode (triggered by platform Level 2+):**
- Pre-booking cap: 60% of slots (walk-in buffer raised to 40%)
- Max per vehicle reduced to: **10 litres per day** (two-wheelers), **20 litres per day** (four-wheelers)
- Maximum 1 booking per vehicle RC per 48 hours
- Aadhaar-linked household limit: max 2 vehicles bookable per household per day
- Panic-booking detection: if same device attempts booking at 3+ pumps → account suspended 24h
- Tanker truck & commercial vehicle bookings shifted to off-peak slots (11 PM – 6 AM)

**Stock-Based Dynamic Capping:**
| Pump Stock Level | Max Pre-Book Quantity/Vehicle | Booking Window Opens |
|---|---|---|
| >70% full | 40 litres | 48 hours advance |
| 40–70% full | 25 litres | 24 hours advance |
| 20–40% full | 15 litres | 6 hours advance |
| <20% full | 10 litres | 2 hours advance only |
| <5% full (Critical) | Booking SUSPENDED — walk-in only | — |

---

##### 3.2.4-A.8 No-Show, Cancellation & Refund Rules

| Scenario | Action | Refund |
|---|---|---|
| Cancel 2+ hours before slot | Instant cancellation | Full refund within 30 min |
| Cancel within 1–2 hours of slot | Cancellation allowed | 90% refund (10% convenience fee retained) |
| Cancel within 1 hour of slot | Cancellation allowed | 75% refund |
| No-show (missed slot, no cancel) | Slot released, marked no-show | 50% refund |
| 3 no-shows in 30 days | Pre-booking privilege suspended for 7 days | — |
| Pump machine failure during dispensing | Full refund + ₹25 platform credit | Auto-refund |
| Stock out at pump after booking confirmed | Full refund + priority slot at nearest alternate pump | Auto-refund |

---

##### 3.2.4-A.9 Multi-Pump Discovery & Comparison

**Smart Pump Finder (Consumer App):**
- Search by: GPS proximity / Area name / Pump brand (IOCL / BPCL / HPCL / Private)
- Filter by:
  - Fuel grade available (Regular / Premium / Super Premium)
  - Slots available today (Yes/No)
  - Distance (<1 km / <3 km / <5 km)
  - Rating (4+ stars only)
  - Payment method accepted (UPI / Card / Cash / All)
  - Verified stock level (High / Medium / Low)
- Compare up to 3 pumps side-by-side:

```
┌──────────────────┬──────────────────┬──────────────────┐
│  HP Andheri East │  IOCL Jogeshwari │  BPCL Goregaon   │
├──────────────────┼──────────────────┼──────────────────┤
│  1.2 km away     │  2.4 km away     │  3.8 km away     │
│  ₹94.5 / L       │  ₹94.5 / L       │  ₹94.5 / L       │
│  Slots: 8 left   │  Slots: FULL     │  Slots: 14 left  │
│  Next: 10:40 AM  │  Next: 3:10 PM   │  Next: 10:20 AM  │
│  Stock: Medium   │  Stock: Low      │  Stock: High     │
│  Rating: 4.3 ★   │  Rating: 3.9 ★   │  Rating: 4.6 ★   │
│  [BOOK HERE]     │  [WAITLIST]      │  [BOOK HERE]     │
└──────────────────┴──────────────────┴──────────────────┘
```

- **"Best Match" algorithm** recommends the optimal pump based on: distance + slots available + stock level + travel time (Google Maps/MapMyIndia ETA)

---

##### 3.2.4-A.10 Vehicle Garage (Consumer Profile)

Consumer pre-registers all vehicles to enable fast slot booking:

| Field | Example |
|---|---|
| RC Number | MH01AB1234 |
| Vehicle Type | Four-wheeler / Two-wheeler / Three-wheeler / Commercial |
| Fuel Type | Petrol / Diesel / CNG / EV |
| Tank Capacity | 40 litres |
| Brand & Model | Maruti Suzuki Swift |
| Year | 2022 |
| Fuel Preference | Premium (95 RON) |
| Usual Fill Quantity | 15 litres (saves on booking screen) |

- Max 4 vehicles per consumer account
- RC verification: cross-checked with Vahan (MoRTH) database via API
- Stolen vehicle flag: if RC reported stolen in Vahan, booking blocked and alert sent to police integration API

---

##### 3.2.4-A.11 Petrol Booking Notifications & Reminders

| Trigger | Notification |
|---|---|
| Booking confirmed | "Slot booked: HP Andheri East, 10:40 AM — QR attached" |
| 2 hours before slot | "Reminder: Your petrol slot is in 2 hours. Leave on time!" |
| 30 minutes before slot | "Slot in 30 min — Tap to view QR" |
| Slot time reached | "Your slot has started! Show QR at the pump bay." |
| Grace period expiry warning | "5 minutes left in grace period — hurry!" |
| Slot expired (no-show) | "Slot missed. Partial refund of ₹XXX processed." |
| Stock alert at booked pump | "⚠ Stock running low at your pump — your booking is safe." |
| Price change after booking | "Petrol price changed, but your booking is locked at ₹94.5/L" |

**Price Lock Guarantee:**
- Once paid and confirmed, price per litre is **locked at booking time**
- If price rises before delivery: consumer pays old (lower) price — platform absorbs delta
- If price falls before delivery: consumer pays new (lower) price — platform credits difference

---

##### 3.2.4-A.12 Analytics — Consumer Petrol Dashboard

- Total litres filled this month / year
- Total spend (₹) — monthly and yearly trend
- Average price per litre over time (personal chart)
- Fuel efficiency trend (km/litre) — plotted from odometer entries
- CO₂ footprint estimate (grams CO₂ per km) — with suggestion to switch to CNG/EV
- Cost comparison: "If you had a CNG vehicle, you'd save ₹X/month"
- Pump loyalty score — points earned at each pump chain
- Green score: carbon offset contribution (if ethanol-blended fuel used)

---

#### 3.2.5 LNG for Household / Commercial Consumers
- Applicable for:
  - Large housing societies with piped LNG
  - Commercial kitchens / restaurants
  - Small industrial units
- Account features:
  - Monthly metered consumption bill
  - Burst pressure log
  - Pipeline inspection schedule
  - Contract renewal alerts

#### 3.2.6 Subsidy & Payment Management
- DBTL (Direct Benefit Transfer for LPG) subsidy status
- Bank account linked for subsidy credit
- Payment history (all fuel payments)
- Supported payment modes:
  - UPI (PhonePe, GPay, Paytm, BHIM)
  - Debit / Credit Card
  - Net banking
  - Fuel wallet (prepaid balance)
- Invoice history (downloadable PDF)
- EMI option for CNG kit installation

#### 3.2.7 Crisis Mode Features (Panic Situation Management)
- **Rationing Dashboard:**
  - Government-assigned monthly quota per household
  - Units consumed vs. units remaining
  - Next refill eligibility date
- **Emergency Request:**
  - One-time emergency cylinder request
  - Reason selection: Medical, Elderly, Restaurant/Livelihood
  - Approval by local distributor within 2 hours
- **Community Sharing Board (Hyperlocal):**
  - Post surplus cylinder availability (neighbor-to-neighbor)
  - Request from nearby verified consumers
  - Anti-hoarding flag system (report suspicious bulk buyers)
- **Price Gouging Report:**
  - Report black-market selling with photo evidence
  - Directly forwarded to district supply officer
  - Track complaint status

#### 3.2.8 Notifications & Alerts (Consumer)
- Refill booking confirmation & delivery updates
- Price change alerts (LPG/Petrol/CNG)
- Subsidy credit confirmation
- Safety recall alerts (defective cylinder batches)
- Government scheme enrollment reminders
- Nearby station outage alerts
- Monthly consumption summary

---

### 3.2-B VIRTUAL QUEUE SYSTEM — No Physical Waiting

**Core Philosophy:** No consumer should ever stand in a physical queue for fuel. All waiting happens digitally, with full transparency and time estimates.

#### 3.2-B.1 How the Virtual Queue Works

```
Consumer Books Online
        ↓
System checks City Warehouse Stock
        ↓
   ┌────┴────┐
 Stock      No Stock
Available   Available
   ↓            ↓
Token        Waitlist
Issued       Position
   ↓            ↓
Slot         Auto-assign
Locked       when stock
   ↓          arrives
Delivery    ↓
Scheduled  Notify Consumer
           → Confirm or
             Cancel
```

#### 3.2-B.2 Token System
- Every booking generates a unique **Virtual Token** (e.g., `LPG-MUM-2026-038471`)
- Token contains encoded priority level, zone, fuel type, and sequence number
- Token is the single source of truth for queue position
- Consumer can share token with family members (one token per booking, non-transferable)
- **Token States:**
  | State | Meaning |
  |---|---|
  | PENDING | Booking received, warehouse check in progress |
  | CONFIRMED | Stock allocated, delivery date fixed |
  | QUEUED | In waitlist, position visible to consumer |
  | DISPATCHED | Cylinder loaded on delivery vehicle |
  | OUT_FOR_DELIVERY | Agent en route, GPS tracking live |
  | DELIVERED | Delivered, awaiting OTP confirmation |
  | CANCELLED | Cancelled by consumer or system (no stock in 72h) |
  | RESCHEDULED | Delivery slot changed due to route or stock issue |

#### 3.2-B.3 Queue Position Visibility
- Consumer sees exact position: "You are #47 in queue for your area"
- Consumers ahead per hour (processing rate): "~12 deliveries/hour in your zone"
- Estimated time to delivery: "Approx. 4 hours remaining" (live, updates every 15 min)
- Zone-wise queue depth indicator on public map (no login needed to see)
- If queue moves faster (e.g., distributor adds delivery vehicle), ETA updates automatically

#### 3.2-B.4 Queue Priority Rules
```
Priority 1 (P1) — Medical/Hospital consumers
Priority 2 (P2) — PMUY / BPL households
Priority 3 (P3) — Elderly (70+), pregnant women flagged accounts
Priority 4 (P4) — Standard domestic consumers
Priority 5 (P5) — Commercial consumers
Priority 6 (P6) — Industrial consumers
```
- Priority bumping: If a P4 consumer has waited >72 hours, they auto-elevate to P3 handling
- No consumer can be kept waiting beyond **maximum SLA** (48h normal, 72h crisis mode)
- Maximum SLA breach triggers escalation to distributor's OMC supervisor automatically

#### 3.2-B.5 Waitlist Management
- If no stock: Consumer placed in waitlist with exact position shown
- Automatic notification when:
  - New stock arrives at city warehouse
  - Consumer's turn approaches (2 slots ahead)
  - Consumer's slot is confirmed
- Consumer can set preferences while in waitlist:
  - Accept any available slot OR specific time preference
  - Willing to accept alternate distributor (closer to stock) — YES/NO toggle
  - Emergency flag (willing to pay premium for faster processing)
- Consumer can exit waitlist any time — full refund if pre-paid

#### 3.2-B.6 No-Show & Rescheduling Policy
- If consumer is not available on delivery day:
  - Reschedule via app (up to 2 times per booking)
  - 3rd reschedule: booking cancelled, token re-enters queue at original position
- Delivery agent marks: Consumer Unavailable → system auto-sends reschedule link
- Reschedule window: up to 48 hours in advance
- Same-day reschedule: allowed until 2 hours before delivery window

---

### 3.3 SERVICE PROVIDER LOGIN

**Purpose:** Fuel distributors, CNG station operators, LNG suppliers, petrol pump owners, and delivery agents manage operations, inventory, and deliveries through a dedicated portal.

#### 3.3.1 Service Provider Types & Registration

| Type | Examples |
|---|---|
| LPG Distributor | IOC/BPCL/HPCL authorized distributors |
| CNG Station Operator | IGL, MGL, GAIL Gas franchise |
| LNG Supplier | GSPC LNG, Shell LNG terminals |
| Petrol Pump Owner | IOCL, BPCL, HPCL, private retail outlets |
| Fuel Tanker Operator | Fleet owners with road tankers |
| Delivery Agent | Last-mile cylinder delivery personnel |

**Registration Requirements:**
- Business registration number (GST, FSSAI if applicable)
- OMC partnership license number
- Location/address with GPS coordinates
- Operating hours
- Tank/cylinder storage capacity (in litres / number of cylinders)
- Staff count and vehicle fleet details
- Bank account (for payment settlements)
- Emergency contact number

#### 3.3.2 Inventory Management

**LPG Distributor:**
- Total cylinders in stock (14.2 kg, 5 kg, 19 kg variants)
- Cylinders dispatched today
- Cylinders returned (empty)
- Pending delivery queue (consumer order list)
- Low stock alert threshold (configurable)
- Auto-reorder request to OMC depot when threshold breached
- Cylinder condition tracking (full / empty / defective / under inspection)
- Monthly reconciliation report (cylinders issued vs. returned)

**CNG Station Operator:**
- Compressor unit status (Online / Maintenance / Breakdown)
- Current gas pressure (bar)
- Storage cascade pressure
- Daily dispensed quantity (kg)
- Peak hour demand pattern (graph)
- Real-time queue management (estimated wait time)
- Compressor maintenance log & service schedule
- Emergency backup compressor status

**LNG Supplier:**
- Cryogenic tank level (% full, metric tonnes)
- Incoming tanker schedule
- Outgoing delivery schedule
- Boil-off gas (BOG) rate monitoring
- Tank pressure & temperature readings
- Customer contract volumes vs. actual delivery

**Petrol Pump Owner:**
- Underground storage tank levels (petrol, diesel, MS)
- Daily sales volume
- Tanker truck arrival schedule
- Nozzle meter calibration log
- Staff attendance & shift management
- Daily sales report (revenue, volume, transactions)

#### 3.3.3 Order & Delivery Management

- Incoming consumer orders list (real-time)
- Order assignment to delivery agents
- Route optimization (for multi-stop cylinder deliveries)
- Delivery agent GPS tracking (dispatcher view)
- Proof of delivery confirmation (OTP)
- Failed delivery management (consumer absent, address issue)
- Rescheduling of undelivered orders
- Daily delivery completion report

#### 3.3.4 Delivery Agent Sub-Profile
- Assigned orders for the day (sorted by optimized route)
- Navigation integration (Google Maps / MapMyIndia)
- OTP capture for delivery confirmation
- Cash collection tracker (for COD orders)
- Cylinder loading count at start of day
- Cylinder return count at end of day
- Attendance & earnings summary

#### 3.3.5 Staff & Fleet Management
- Employee roster (drivers, loaders, counter staff)
- Vehicle maintenance log (tankers, delivery vehicles)
- Vehicle fitness certificate expiry alerts
- Driver license renewal reminders
- GPS device status for all vehicles
- Fuel consumption of delivery fleet

#### 3.3.6 Compliance & Safety Management
- License renewal calendar (OMC license, explosive license, petroleum license)
- Safety inspection checklist (monthly/quarterly)
- Fire NOC validity tracker
- Statutory weight & measurement calibration due dates
- Incident report log (accidents, gas leaks, spills)
- Training records for staff (LPG safety, fire handling)
- PESO (Petroleum and Explosives Safety Organisation) compliance tracker

#### 3.3.7 Financial Management
- Daily sales summary (fuel type-wise)
- Payment received (UPI, cash, card, wallet)
- Pending payment collection
- Commission earned from OMC (per cylinder/per litre)
- Subsidy reimbursement status (for DBTL scheme)
- GST filing data export
- Monthly P&L report
- Outstanding dues from credit customers

#### 3.3.8 Crisis Mode — Service Provider Dashboard
- **Crisis Level Indicator:**
  - Normal → Elevated → Critical → Emergency
  - Set by government / OMC
- **Rationing Mode:**
  - System enforces per-consumer limits automatically
  - Booking system restricts multiple bookings per household
  - Priority queue for medical & elderly consumers
- **Supply Priority Allocation:**
  - Hospital & medical facilities — Priority 1
  - Schools & community kitchens — Priority 2
  - Domestic consumers — Priority 3
  - Commercial consumers — Priority 4
  - Industrial consumers — Priority 5
- **Emergency Stock Reporting:**
  - Report current stock to district authority (1-click)
  - Receive emergency replenishment orders
- **Blackout Communication:**
  - Push notification to all consumers in service area
  - Estimated restoration time update

#### 3.3.9 Analytics & Reports
- Daily / Weekly / Monthly sales trends
- Consumer demand forecast (AI-assisted, based on seasonal patterns)
- Delivery efficiency rate (on-time %)
- Customer satisfaction score (post-delivery rating)
- Inventory turnover rate
- Comparison with district/state average
- Export to Excel / PDF

---

## 3.4 City Warehouse Allocation Engine

**Purpose:** The central brain of the platform. Manages stock available at city-level warehouses and distributes it systematically across zones, distributors, and consumer orders — eliminating hoarding, favouritism, and supply mismatch.

### 3.4.1 City Warehouse Structure

```
┌─────────────────────────────────────────────────┐
│              STATE LEVEL DEPOT (OMC)            │
│   (Receives from refinery / import terminal)    │
└───────────────────────┬─────────────────────────┘
                        │
         ┌──────────────┼──────────────┐
         ↓              ↓              ↓
┌────────────┐  ┌────────────┐  ┌────────────┐
│ City       │  │ City       │  │ City       │
│ Warehouse  │  │ Warehouse  │  │ Warehouse  │
│ (Zone A)   │  │ (Zone B)   │  │ (Zone C)   │
└─────┬──────┘  └─────┬──────┘  └─────┬──────┘
      │               │               │
  ┌───┴───┐       ┌───┴───┐       ┌───┴───┐
  ↓       ↓       ↓       ↓       ↓       ↓
Dist-1  Dist-2  Dist-3  Dist-4  Dist-5  Dist-6
  ↓       ↓       ↓       ↓       ↓       ↓
PIN     PIN     PIN     PIN     PIN     PIN
Codes   Codes   Codes   Codes   Codes   Codes
```

### 3.4.2 Warehouse Data Points (Real-Time)
- Total cylinder stock (by type: 5kg / 14.2kg / 19kg)
- Stock physically available at warehouse
- Stock in transit (tanker en route — ETA tracked)
- Stock allocated to pending confirmed orders (reserved)
- Stock unallocated (available for new bookings)
- Stock flagged for inspection / defective (quarantined)
- Replenishment order placed — expected arrival date

**Stock Availability Formula:**
$$\text{Bookable Stock} = \text{Physical Stock} + \text{Inbound Stock (ETA ≤ 48h)} - \text{Allocated Stock} - \text{Safety Buffer (10\%)}$$

### 3.4.3 Zone-Based Allocation Logic

**Each city is divided into delivery zones (typically by PIN code clusters):**

| Zone | PIN Codes | Daily Capacity | Priority Households |
|---|---|---|---|
| Zone A — North | 400001–400010 | 800 cylinders/day | 1,200 PMUY households |
| Zone B — South | 400011–400020 | 650 cylinders/day | 800 PMUY households |
| Zone C — East | 400021–400030 | 500 cylinders/day | 600 PMUY households |
| Zone D — West | 400031–400040 | 700 cylinders/day | 1,000 PMUY households |

**Daily Allocation Process (runs at 00:01 AM IST):**
1. System queries previous day's pending/undelivered orders per zone
2. Calculates new demand (bookings incoming from the day)
3. Checks city warehouse stock (physical + inbound within 24h)
4. Applies priority rules (P1 → P2 → P3 → P4 → P5 → P6)
5. Allocates stock zone-wise based on demand-to-capacity ratio
6. Issues `CONFIRMED` tokens to orders within stock capacity
7. Issues `QUEUED` / waitlist positions to orders beyond capacity
8. Sends allocation summary report to OMC depot for replenishment planning

### 3.4.4 Dynamic Reallocation
- Stock released from cancelled orders immediately returned to unallocated pool
- If Zone A has surplus, surplus reallocated to adjacent Zone B/C automatically
- Reallocation triggers immediate token upgrade for consumers in waitlist
- Reallocation window: every 2 hours during business hours (8AM–8PM)
- Emergency reallocation: triggered instantly on crisis level change

### 3.4.5 Tanker-to-Warehouse Tracking
- Every inbound tanker has a GPS transponder
- Platform shows ETA for tanker to warehouse (consumer-visible: "New stock arriving in ~3 hours")
- On unloading start: stock status changes `IN_TRANSIT → UNLOADING → AVAILABLE`
- Automatic: when stock becomes AVAILABLE, queued tokens are processed in sequence
- Driver app: tanker driver checks in at warehouse gate → triggers stock receipt workflow

### 3.4.6 Warehouse Capacity Planning
- Demand forecast model (7-day rolling): uses historical bookings, weather, events
- Auto-generates replenishment purchase orders to OMC depot when 72h buffer reached
- Festival demand surge pre-planning (Diwali, Eid, harvest season)
- Cold wave alert integration: spikes LPG demand forecast for northern zones
- Replenishment SLA tracker: depot must dispatch within 12 hours of warehouse request

### 3.4.7 Multi-City Warehouse Coordination
- If City A warehouse has surplus and City B is in shortage:
  - Inter-city stock transfer request raised (requires OMC approval)
  - Approved transfers appear as inbound stock on City B platform
- State-level dashboard shows all city warehouse levels simultaneously
- Government/OMC officer can trigger forced reallocation during declared crisis

---

## 3.5 Delayed Confirmation System

**Purpose:** Allow consumers to book in advance even when stock is not yet physically at the warehouse, without deceiving them. Builds trust through radical transparency.

### 3.5.1 When Delayed Confirmation Triggers
| Condition | Confirmation Type |
|---|---|
| Stock physically in warehouse AND slot available | Instant Confirmation |
| Stock in transit, ETA < 24 hours | Delayed — Short (confirm within 4–8 hours) |
| Stock in transit, ETA 24–48 hours | Delayed — Standard (confirm within 24 hours) |
| Stock not yet dispatched from depot, ETA 48–72h | Delayed — Extended (confirm within 48 hours) |
| No stock planned within 72 hours | Waitlist placement (no confirmation timeline given) |

### 3.5.2 Consumer Experience in Delayed Confirmation

**Booking Screen Message (Delayed Mode):**
```
┌──────────────────────────────────────────────────┐
│  📦 BOOKING RECEIVED — CONFIRMATION PENDING       │
│                                                  │
│  Your booking reference: LPG-DEL-2026-084321     │
│                                                  │
│  Stock at your area warehouse: LOW               │
│  New stock expected: ~Apr 02, 2026               │
│                                                  │
│  ⏳ Confirmation expected by: Apr 02, 6:00 PM    │
│                                                  │
│  Your queue position: #23 for Zone B             │
│                                                  │
│  ✅ No payment charged until confirmed           │
│  ❌ Cancel anytime — no penalty                 │
│                                                  │
│  We will notify you via SMS + WhatsApp           │
└──────────────────────────────────────────────────┘
```

### 3.5.3 Delayed Confirmation Communication Sequence

| Time | Action |
|---|---|
| T+0 (Booking placed) | SMS + WhatsApp: "Booking received, reference #XXXXX. Confirmation by [date]." |
| T+6h | In-app update: queue position refreshed |
| T+12h | Push notification: tanker ETA update (if changed) |
| T+24h | SMS reminder: "Still processing — stock arriving [date]" |
| T = Confirmation | SMS + WhatsApp: "CONFIRMED — Delivery on [date] between [time window]" |
| T = Delivery Day (Morning) | Push: "Your delivery is today! Agent [Name] assigned." |
| T = 1hr Before | Push + SMS: "Agent on the way — Track: [link]" |

### 3.5.4 Auto-Cancel & Consumer Protection Rules
- If stock does not arrive within the committed delay window → system auto-cancels the booking
- Consumer receives: full refund (if pre-paid) + ₹50 platform credit + apology notification
- Auto-cancel notification includes: "We have placed you at the front of the next available queue"
- Distributor SLA penalty applied: repeated delayed confirmations trigger OMC audit flag
- Consumer retains queue priority from auto-cancelled booking for 7 days

### 3.5.5 Delay Reason Transparency
Consumers are always told WHY the delay is happening:
- "Tanker delayed due to highway closure at [location]"
- "Importing vessel berthing delayed at Hazira terminal"
- "Higher-than-expected demand in your district — stock redirected from adjacent zone"
- "Weather conditions affecting road transport"
- This replaces vague "processing" messages with real, trackable reasons

### 3.5.6 Bulk Booking Prevention in Delayed Mode
- During Delayed Confirmation mode, a consumer cannot place a second booking
- Second booking attempt shows: "You already have a pending booking (#XXXXX). Cancel that first."
- Prevents consumers from booking at multiple distributors out of panic
- Cross-distributor booking detection: Aadhaar/mobile number based deduplication

---

## 4. Fuel Type Deep-Dive

---

### 4.1 LPG — Liquefied Petroleum Gas

| Parameter | Details |
|---|---|
| Composition | Propane (C₃H₈) + Butane (C₄H₁₀) mixture |
| State at storage | Liquid (under pressure, ~6–8 bar) |
| Calorific value | ~46 MJ/kg |
| Cylinder sizes | 5 kg (composite), 14.2 kg (domestic), 19 kg (commercial) |
| Color (flame) | Blue flame (clean combustion) |
| Odour | Naturally odourless; ethyl mercaptan added for leak detection |
| Boiling point | −42°C (propane) to −1°C (butane) |
| Flash point | −104°C to −60°C (highly flammable) |

**Supply Chain:**
```
Crude Oil → Refinery → Fractionation → LPG Extraction
→ Bottling Plant → Cylinder Filling → Quality Check
→ OMC Depot → Authorized Distributor → Consumer
```

**India-Specific Context:**
- ~320 million domestic connections (2024)
- Major OMCs: Indian Oil (Indane), BPCL (Bharatgas), HPCL (HP Gas)
- PMUY (Pradhan Mantri Ujjwala Yojana) — 100 million BPL connections
- India imports ~50% of LPG from Qatar, Saudi Arabia, UAE
- Gulf crisis → direct LPG shortage crisis in India
- Domestic price: ~₹800–₹950 per 14.2 kg cylinder (market rate, 2024)
- DBTL subsidy: Direct bank transfer to Aadhaar-linked accounts

**Safety Rules:**
- Never store cylinders in underground/basement rooms
- Always close valve after use
- Cylinder horizontal storage is prohibited
- Rubber tube replacement every 2 years
- Regulator replacement every 5 years
- Annual ISI mark inspection
- Never use open flame to detect leaks — use soapy water

**Crisis Impact:**
- Panic buying leads to queue outside distributors
- Black market cylinder price can reach 3–5x official price
- Rural consumers most vulnerable (distant from urban depots)
- EcoSystem response: Digital booking queue (no physical queue needed)

---

### 4.2 LNG — Liquefied Natural Gas

| Parameter | Details |
|---|---|
| Composition | Primarily Methane (CH₄) ~90–95% |
| State at storage | Liquid at −162°C (cryogenic) |
| Calorific value | ~54 MJ/kg |
| Storage pressure | Near atmospheric (but cryogenic temperature) |
| Color (flame) | Blue |
| Odour | Naturally odourless; odorant may be added |
| Energy density | ~2.4x higher than CNG (by volume) |
| Conversion | 1 MMBTU LNG ≈ 26.85 cubic meters of natural gas |

**Applications:**
- Heavy-duty trucks and long-haul transport (LNG-fuelled trucks)
- Marine shipping (LNG-powered ships)
- Industrial heating (steel plants, ceramic factories)
- Power generation
- Peak shaving for city gas networks
- Residential use via city gas distribution (CGD) networks
- Floating Storage Regasification Units (FSRUs) for coastal towns

**India LNG Infrastructure:**
- Hazira LNG Terminal (Shell/TOTAL, Gujarat) — 5 MMTPA
- Dahej LNG Terminal (PLL, Gujarat) — 17.5 MMTPA
- Dabhol LNG Terminal (RGPPL, Maharashtra)
- Ennore LNG Terminal (IOC, Tamil Nadu)
- Proposed: Chhara LNG, Jafrabad LNG

**Supply Chain:**
```
Gas Field → Liquefaction Plant → LNG Carrier (Ship)
→ LNG Import Terminal (Regasification) → Pipeline
→ City Gas Distribution OR LNG Road Tanker
→ LNG Dispensing Station / Industrial Consumer
```

**Geopolitical Risk (Iran-Iraq Context):**
- Qatar (world's largest LNG exporter) ships through Strait of Hormuz
- Any conflict in Persian Gulf threatens LNG tanker routes
- India's LNG spot purchase contracts are at risk during crisis
- LNG price spikes to $70–80/MMBTU during supply crunch (vs. $10–15 normal)
- Buffer stock policy: India must maintain strategic LNG reserve

**Safety Rules:**
- Cryogenic burns — extreme cold (−162°C) can cause frostbite instantly
- LNG is lighter than air when vaporized — disperses upward (safer than LPG)
- Boil-off gas (BOG) must be managed — pressure relief systems critical
- Cryogenic tanks require double-wall vacuum insulation
- No sparks or open flame within 15m of LNG tanks
- Emergency shut-off valve (ESD) must be accessible at all times

---

### 4.3 CNG — Compressed Natural Gas

| Parameter | Details |
|---|---|
| Composition | Primarily Methane (CH₄) ~90%+ |
| State at storage | Gas (compressed at 200–250 bar) |
| Calorific value | ~53.6 MJ/kg |
| Octane rating | ~130 RON (higher than petrol ~91–98 RON) |
| Color (flame) | Blue |
| Odour | Odorant (mercaptan) added for leak detection |
| Vehicle tank pressure | 200 bar (standard) |
| Range per fill | ~250–400 km (depending on vehicle) |

**CNG vs Petrol Comparison:**

| Factor | CNG | Petrol |
|---|---|---|
| Cost per km | ₹2.0–₹3.5 | ₹6.0–₹9.0 |
| CO₂ emissions | ~25% less | Baseline |
| CO emissions | ~90% less | Baseline |
| PM2.5 | Near zero | Significant |
| Engine life | Higher (no carbon deposits) | Normal |
| Knock tendency | Very low | Moderate |
| Cold start | Slightly harder | Normal |

**CNG Infrastructure in India:**
- CGD (City Gas Distribution) networks in 300+ cities
- Key operators: IGL (Delhi), MGL (Mumbai), GAIL Gas, Adani Gas, Torrent Gas
- ~6,000+ CNG stations across India (2024)
- Target: 10,000 stations by 2030 (Government of India)
- CNG bus fleets: Delhi (DTC), Mumbai (BEST), Ahmedabad (AMTS)
- Auto-rickshaws, taxis, private cars

**Station Infrastructure:**
- Mother Station: Receives high-pressure pipeline gas, compresses to 200–250 bar
- Online Station: Directly connected to gas pipeline
- Daughter Station: Gas transported by mobile cascades from mother station
- Daughter-Booster Station: Hybrid of above

**Crisis Scenarios:**
- Power cut → compressors stop → CNG station goes offline
- Pipeline pressure drop → stations cannot dispense at full pressure
- Long vehicle queues → traffic snarls → city-wide gridlock
- EcoSystem response:
  - Real-time compressor status
  - Queue length display
  - Alternate station suggestions
  - Estimated wait time before driving to station

**Vehicle Conversion:**
- OEM CNG (factory-fitted): Factory warranty preserved
- Retro-fit CNG kit: Requires RTO approval and ARAI-certified kit
- Cost of retro-fit: ₹18,000–₹40,000 (Type-1 to Type-4 cylinders)
- Types of CNG cylinders:
  - Type 1: All steel (heavy, cheap)
  - Type 2: Steel with glass fibre wrap
  - Type 3: Aluminium with carbon/glass fibre full wrap
  - Type 4: Full composite (polymer liner + carbon fibre) — lightest

**Safety Rules:**
- CNG cylinder mandatory hydrostatic test every 3 years
- Cylinder life: 15–20 years (Type-1), 20 years (Type-2/3), 15 years (Type-4)
- No smoking within 5m of dispensing nozzle
- Generator/engine off during filling
- Approved pressure relief device (PRD) mandatory on all cylinders
- Cylinder visual inspection before every fill

---

### 4.4 Petrol (Motor Spirit / Gasoline)

| Parameter | Details |
|---|---|
| Composition | Complex mix of hydrocarbons (C₄–C₁₂) |
| State at ambient | Liquid |
| Calorific value | ~46.4 MJ/kg |
| Octane rating | 91 RON (Regular), 95 RON (Premium), 98 RON (Super Premium) |
| Flash point | −43°C (highly flammable) |
| Density | ~0.71–0.77 kg/litre |
| Ethanol blend | E10 (10% ethanol), E20 (20% ethanol — India 2025 target) |

**India Petrol Market:**
- ~1,000+ refineries with 5 million BPD capacity (India 2024)
- Retail outlets: ~85,000+ across India
- Daily consumption: ~100 million litres/day
- Price determination: Dynamic daily pricing (since 2017) by OMCs
- Price components: ~45% taxes (central + state)
- Two-wheeler fuel dependency: ~80 million two-wheelers on petrol

**Supply Chain:**
```
Crude Oil Import (Gulf, Russia, USA, West Africa)
→ Indian Refineries (Jamnagar, Panipat, Kochi, etc.)
→ Product Pipelines / Rail / Road Tankers
→ OMC Depots / Terminal
→ Petrol Pump Retail Outlet → Consumer
```

**Geopolitical Risk:**
- Russia-Ukraine war: Russia crude discount benefited India (2022–2024)
- Iran-Iraq/Gulf conflict: ~25% of India's crude from this region at risk
- Hormuz Strait blockage: Oil price spike to $150+/barrel (projected)
- Domestic response: India maintains 9.5 million barrels Strategic Petroleum Reserve (SPR) at Visakhapatnam, Mangaluru, Padur — approximately 9–10 days of demand buffer

**Ethanol Blending Programme (EBP):**
- E10 achieved nationally (2022)
- E20 target: 2025
- Benefits: Reduce import dependency, support sugarcane farmers, reduce emissions
- Challenge: E20 requires engine modification for older vehicles

**Panic Situation Management:**
- Petrol pump dry-out during strikes/disasters
- Classic scenario: Flood or truckers' strike → pumps go dry within 48 hours
- Platform response:
  - Live stock levels at each pump (refreshed every 30 min)
  - Estimated dry-out time (based on consumption rate)
  - Tanker ETA displayed publicly
  - Daily purchase limit enforced (e.g., max 10 litres per vehicle per day during crisis)

**Safety Rules:**
- No smoking or mobile phone use at petrol pumps
- Engine must be switched off during refuelling
- No overfilling of tank (leave 10% headspace)
- Never store petrol in plastic bottles
- Approved steel/HDPE jerry cans only
- Static electricity discharge before touching nozzle
- Authorized dispensing only (no siphoning)

---

## 5. Crisis Management Framework

### 5.1 Crisis Level Classification

| Level | Trigger | Platform Response |
|---|---|---|
| Level 0 — Normal | No disruption | Standard operations |
| Level 1 — Watch | <10% supply reduction | Public alerts, monitoring |
| Level 2 — Advisory | 10–25% supply reduction | Booking restrictions, consumer alerts |
| Level 3 — Warning | 25–50% supply reduction | Rationing mode, priority allocation |
| Level 4 — Emergency | >50% supply reduction | Emergency quota, government control |
| Level 5 — Critical | Complete supply disruption | Military/Civil supply authority takeover |

### 5.2 Anti-Hoarding Measures
- Per-household booking limits enforced at platform level
- Anomaly detection: Alert if same consumer books at multiple distributor IDs
- Cylinder serial number tracking: Prevent duplicate registration
- Cross-referencing with Aadhaar/ration card databases
- Community reporting: Consumers can flag black-market activity

### 5.3 Priority Consumer Categories (Crisis Mode)
1. Hospitals, ICUs, medical facilities
2. Pregnant women and newborn households (PMUY priority)
3. Elderly citizens (age 70+) living alone
4. Community kitchens / NGO-run free meal centers
5. Schools with midday meal programs
6. General domestic consumers
7. Commercial establishments
8. Industrial consumers

### 5.4 Strategic Reserve Integration
- Platform integrates with Government's Strategic Petroleum Reserve (SPR) data
- Reserve release triggers visible to consumers (builds confidence)
- SPR locations: Visakhapatnam (1.33 MMT), Mangaluru (1.5 MMT), Padur (2.5 MMT)
- Proposed SPR expansion: Chandikhol (Odisha), Rajkot (Gujarat)

---

## 6. Technology Stack (Reference Architecture)

### 6.1 Frontend
- **Public Page:** Static site (Next.js / Nuxt.js) — fast, SEO-indexed, CDN-distributed
- **Consumer App:** Progressive Web App (PWA) + Native Android/iOS
- **Service Provider Portal:** Web application (React / Vue.js)

### 6.2 Backend
- REST + GraphQL APIs
- Real-time updates: WebSocket / Server-Sent Events (SSE)
- Microservices architecture (decoupled by fuel type and service domain)
- Message queue: Apache Kafka (for high-volume event streaming)
- Cache: Redis (live stock data, session management)
- Database: PostgreSQL (transactional), Cassandra (time-series data)

### 6.3 Integration Points
- **UIDAI API** — Aadhaar-based KYC and subsidy verification
- **NPCI / UPI** — Payment processing
- **OMC APIs** — IOC, BPCL, HPCL stock & pricing data
- **GPS / Telematics** — Tanker and delivery agent tracking
- **MoPNG Portal** — Ministry of Petroleum & Natural Gas compliance data
- **PNGRB** — Petroleum and Natural Gas Regulatory Board compliance
- **PESO** — Explosives safety compliance data
- **MapMyIndia / Google Maps** — Location and routing
- **Weather API** — Demand forecasting (cold snap → LPG surge)
- **SMS Gateway** — OTP, delivery alerts, crisis notifications
- **WhatsApp Business API** — Rich consumer communication

### 6.4 Security
- OWASP Top 10 compliance
- End-to-end encryption for all transactions
- Role-based access control (RBAC)
- Fraud detection: ML model flagging suspicious booking patterns
- Rate limiting on all booking APIs
- Audit logs for all stock updates (tamper-evident)
- 2-Factor Authentication (2FA) for service providers
- CERT-In compliance for cybersecurity incident reporting

### 6.5 Offline Capability
- Consumer app works in low/no network (PWA offline mode)
- Service provider app: Local SQLite sync, uploads when connectivity restored
- Critical for rural areas with poor mobile network

---

## 7. Regulatory Compliance

| Regulation | Applicability |
|---|---|
| Petroleum Act, 1934 | Storage and transport of petroleum products |
| Explosives Act, 1884 | LPG cylinder and storage compliance |
| PNGRB Act, 2006 | City Gas Distribution regulation |
| BIS Standards (IS 3196) | LPG cylinder manufacturing standards |
| IS 8737 | LPG safety valves |
| PESO Circular 2023 | Cylinder inspection & testing norms |
| Consumer Protection Act, 2019 | Digital consumer rights, refund policy |
| IT Act, 2000 (amended) | Data privacy and cybersecurity |
| Aadhaar Act, 2016 | Biometric KYC usage restrictions |
| GST Act, 2017 | E-invoicing and tax compliance for fuel |
| Motor Vehicles Act, 1988 | CNG vehicle certification |
| CMVR Rules | CNG cylinder fitment norms for vehicles |

---

## 8. Key Metrics & KPIs

### Consumer-Side
- Average booking-to-delivery time (LPG target: <24 hours)
- CNG station wait time (target: <15 minutes)
- Consumer satisfaction score (target: >4.2/5.0)
- Subsidy credit receipt rate (target: >98%)
- App adoption rate in served areas

### Service Provider-Side
- On-time delivery rate (target: >95%)
- Inventory accuracy (target: >99%)
- Compressor uptime (CNG, target: >98%)
- Incident-free days (safety metric)
- Order fulfillment rate (target: >99.5%)

### Platform-Wide (Crisis Mode)
- Time from crisis declaration to rationing activation (<2 hours target)
- Black market complaint resolution time (<24 hours target)
- Priority consumer fulfillment rate in Level 4 crisis (>98% target)
- System uptime during crisis (>99.99% — critical infrastructure SLA)

---

## 9. Roadmap

### Phase 1 — Foundation (Month 1–3)
- [ ] Public fuel availability map (LPG + Petrol)
- [ ] Basic consumer registration + LPG booking
- [ ] Distributor portal — inventory & delivery management
- [ ] Payment integration (UPI)
- [ ] SMS notifications

### Phase 2 — Expansion (Month 4–6)
- [ ] CNG station integration + real-time status
- [ ] LNG consumer module
- [ ] Delivery agent mobile app
- [ ] GPS tracking (delivery + tankers)
- [ ] Subsidy (DBTL) integration with NPCI

### Phase 3 — Intelligence (Month 7–9)
- [ ] AI-based demand forecasting
- [ ] Anti-hoarding detection engine
- [ ] Predictive stock replenishment alerts
- [ ] WhatsApp bot integration
- [ ] Offline PWA capability

### Phase 4 — Crisis Management (Month 10–12)
- [ ] Crisis level classification engine
- [ ] Rationing module (automated enforcement)
- [ ] SPR integration with government API
- [ ] Priority consumer management
- [ ] Real-time situation dashboard for district/state authorities

---

## 10. Glossary

| Term | Definition |
|---|---|
| OMC | Oil Marketing Company (IOC, BPCL, HPCL) |
| DBTL | Direct Benefit Transfer for LPG |
| PMUY | Pradhan Mantri Ujjwala Yojana |
| CGD | City Gas Distribution |
| PNGRB | Petroleum and Natural Gas Regulatory Board |
| PESO | Petroleum and Explosives Safety Organisation |
| SPR | Strategic Petroleum Reserve |
| BOG | Boil-Off Gas (from LNG tanks) |
| ESD | Emergency Shut-off Device |
| PRD | Pressure Relief Device |
| MMT | Million Metric Tonnes |
| MMTPA | Million Metric Tonnes Per Annum |
| MMBTU | Million British Thermal Units |
| BPD | Barrels Per Day |
| RON | Research Octane Number |
| ARAI | Automotive Research Association of India |
| RTO | Regional Transport Office |
| PWA | Progressive Web App |
| KYC | Know Your Customer |
| OTP | One-Time Password |
| RBAC | Role-Based Access Control |

---

*Document Version: 1.0*
*Created: March 29, 2026*
*Domain: Energy Distribution | Crisis Management | Public Utility | India*
*Classification: Internal — Ecosystem Design Reference*
