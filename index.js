#!/usr/bin/env node

const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const path = require('path');

const DEFAULT_LENGTH = 16;
const alphabet = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}|;:,.<>?'
};

function generatePassword(length = DEFAULT_LENGTH, options = {}) {
  const includeLower = options.lower ?? true;
  const includeUpper = options.upper ?? true;
  const includeDigits = options.digits ?? true;
  const includeSymbols = options.symbols ?? false;

  let pool = '';
  if (includeLower) pool += alphabet.lower;
  if (includeUpper) pool += alphabet.upper;
  if (includeDigits) pool += alphabet.digits;
  if (includeSymbols) pool += alphabet.symbols;

  if (!pool.length) {
    throw new Error('Must include at least one character set (lower, upper, digits, symbols)');
  }

  const bytes = crypto.randomBytes(length);
  let password = '';

  for (let i = 0; i < length; i++) {
    const idx = bytes[i] % pool.length;
    password += pool[idx];
  }

  return password;
}

function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(cors());
  app.use(express.json());

  app.get('/api/password', (req, res) => {
    const length = Number.parseInt(req.query.length, 10) || DEFAULT_LENGTH;
    const symbols = req.query.symbols === 'true';
    const noLower = req.query.noLower === 'true';
    const noUpper = req.query.noUpper === 'true';
    const noDigits = req.query.noDigits === 'true';

    try {
      const password = generatePassword(length, {
        lower: !noLower,
        upper: !noUpper,
        digits: !noDigits,
        symbols
      });
      res.json({ password });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.use(express.static(path.join(__dirname, 'public')));

  app.listen(port, () => {
    console.log(`Password web service running at http://localhost:${port}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { generatePassword };
