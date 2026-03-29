const fs = require('fs');
const path = require('path');

// APP_DATA_DIR is set by netlify/functions/server.js when running serverless
const DATA_DIR = process.env.APP_DATA_DIR || path.join(__dirname, '../data');

// On Netlify/serverless, fs writes go to /tmp (writable, ephemeral)
const IS_SERVERLESS = process.env.NETLIFY === 'true' || process.env.AWS_LAMBDA_FUNCTION_NAME;
const TMP_DIR = '/tmp/fuelapp_data';

function ensureTmpDir() {
  if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
  }
}

/**
 * Read a JSON data file.
 * @param {string} filename - e.g. 'consumers'
 * @returns {Array|Object}
 */
function readData(filename) {
  // In serverless: prefer /tmp copy (has writes), fall back to bundled data
  if (IS_SERVERLESS) {
    ensureTmpDir();
    const tmpPath = path.join(TMP_DIR, `${filename}.json`);
    if (fs.existsSync(tmpPath)) {
      return JSON.parse(fs.readFileSync(tmpPath, 'utf-8'));
    }
  }
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Write data to a JSON file.
 * @param {string} filename - e.g. 'consumers'
 * @param {Array|Object} data
 */
function writeData(filename, data) {
  if (IS_SERVERLESS) {
    ensureTmpDir();
    const tmpPath = path.join(TMP_DIR, `${filename}.json`);
    fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
    return;
  }
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Find one record by field value.
 * @param {string} filename
 * @param {string} field
 * @param {*} value
 * @returns {Object|null}
 */
function findOne(filename, field, value) {
  const records = readData(filename);
  return records.find(r => r[field] === value) || null;
}

/**
 * Find all records matching a condition.
 * @param {string} filename
 * @param {Function} predicate
 * @returns {Array}
 */
function findAll(filename, predicate) {
  const records = readData(filename);
  if (!predicate) return records;
  return records.filter(predicate);
}

/**
 * Insert a new record into a JSON array file.
 * @param {string} filename
 * @param {Object} record
 */
function insertOne(filename, record) {
  const records = readData(filename);
  records.push(record);
  writeData(filename, records);
}

/**
 * Update a record by id field.
 * @param {string} filename
 * @param {string} id
 * @param {Object} updates
 * @param {string} idField - defaults to 'id'
 * @returns {boolean}
 */
function updateOne(filename, id, updates, idField = 'id') {
  const records = readData(filename);
  const idx = records.findIndex(r => r[idField] === id);
  if (idx === -1) return false;
  records[idx] = { ...records[idx], ...updates };
  writeData(filename, records);
  return true;
}

/**
 * Delete a record by id.
 * @param {string} filename
 * @param {string} id
 * @param {string} idField
 * @returns {boolean}
 */
function deleteOne(filename, id, idField = 'id') {
  let records = readData(filename);
  const before = records.length;
  records = records.filter(r => r[idField] !== id);
  if (records.length === before) return false;
  writeData(filename, records);
  return true;
}

module.exports = { readData, writeData, findOne, findAll, insertOne, updateOne, deleteOne };
