const { v4: uuidv4 } = require('uuid');
const { readData, writeData, findOne, findAll, insertOne, updateOne } = require('./storage');

/**
 * Generate a slot grid for a petrol pump for a given date.
 * Returns array of slot objects with availability.
 */
function generatePumpSlots(pump, dateStr) {
  const allBookings = findAll('bookings_petrol', b =>
    b.pump_id === pump.id &&
    b.slot_date === dateStr &&
    !['CANCELLED', 'NO_SHOW'].includes(b.status)
  );

  const [openH, openM] = pump.operating_hours.open === '24hrs'
    ? [0, 0]
    : pump.operating_hours.open.split(':').map(Number);
  const [closeH, closeM] = pump.operating_hours.close === '24hrs' || pump.operating_hours.close === '23:59'
    ? [23, 50]
    : pump.operating_hours.close.split(':').map(Number);

  const slotDuration = pump.slot_duration_minutes || 10;
  const slotsPerNozzle = Math.floor(60 / slotDuration);
  const totalSlotsPerHour = pump.nozzles * slotsPerNozzle;
  const walkInBuffer = pump.walk_in_buffer_percent / 100;
  const maxBookablePerSlotTime = Math.floor(pump.nozzles * (1 - walkInBuffer));

  const slots = [];
  let cursor = new Date(`${dateStr}T${String(openH).padStart(2,'0')}:${String(openM).padStart(2,'0')}:00`);
  const closeTime = new Date(`${dateStr}T${String(closeH).padStart(2,'0')}:${String(closeM).padStart(2,'0')}:00`);

  while (cursor < closeTime) {
    const timeStr = cursor.toTimeString().slice(0, 5); // HH:MM
    const booked = allBookings.filter(b => b.slot_time === timeStr).length;
    const available = Math.max(0, maxBookablePerSlotTime - booked);

    slots.push({
      time: timeStr,
      booked,
      available,
      capacity: maxBookablePerSlotTime,
      full: available === 0,
      percent_full: Math.round((booked / maxBookablePerSlotTime) * 100)
    });

    cursor = new Date(cursor.getTime() + slotDuration * 60 * 1000);
  }

  return slots;
}

/**
 * Generate a unique booking token for petrol.
 */
function generatePetrolToken(cityCode = 'MUM') {
  const seq = String(Math.floor(Math.random() * 900000) + 100000);
  return `PTR-${cityCode}-${new Date().getFullYear()}-${seq}`;
}

/**
 * Generate a unique booking token for LPG.
 */
function generateLPGToken(cityCode = 'MUM') {
  const seq = String(Math.floor(Math.random() * 900000) + 100000);
  return `LPG-${cityCode}-${new Date().getFullYear()}-${seq}`;
}

/**
 * Get today's date string YYYY-MM-DD.
 */
function todayStr() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get next N date strings from today.
 */
function nextDays(n = 7) {
  const days = [];
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
}

/**
 * Format date nicely: "Mon, 29 Mar 2026"
 */
function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
}

/**
 * Calculate max litres allowed for booking based on pump stock level.
 */
function getMaxLitres(pump, crisis) {
  if (crisis.rationing_active) return crisis.max_petrol_per_vehicle_daily;

  const stock = pump.stock_percent;
  if (stock > 70) return 40;
  if (stock >= 40) return 25;
  if (stock >= 20) return 15;
  return 10;
}

/**
 * Get advance booking days allowed based on pump stock.
 */
function getAdvanceBookingDays(pump) {
  const stock = pump.stock_percent;
  if (stock > 70) return 3;   // 72h
  if (stock >= 40) return 1;  // 24h
  if (stock >= 20) return 0;  // same day only
  return 0;
}

/**
 * Estimate next available slot for a pump (first non-full slot today or tomorrow).
 */
function getNextAvailableSlot(pump) {
  const days = nextDays(3);
  for (const day of days) {
    const slots = generatePumpSlots(pump, day);
    const available = slots.find(s => !s.full);
    if (available) {
      return { date: day, time: available.time, formatted: `${formatDate(day)} at ${available.time}` };
    }
  }
  return null;
}

/**
 * Get LPG queue position for a distributor.
 */
function getLPGQueuePosition(distributorId, bookingId) {
  const bookings = findAll('bookings_lpg', b =>
    b.distributor_id === distributorId &&
    ['PENDING', 'QUEUED', 'CONFIRMED'].includes(b.status)
  );
  const sortedIds = bookings.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map(b => b.id);
  const pos = sortedIds.indexOf(bookingId);
  return pos === -1 ? null : pos + 1;
}

module.exports = {
  generatePumpSlots,
  generatePetrolToken,
  generateLPGToken,
  todayStr,
  nextDays,
  formatDate,
  getMaxLitres,
  getAdvanceBookingDays,
  getNextAvailableSlot,
  getLPGQueuePosition
};
