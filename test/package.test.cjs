'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');

test('package.json exists and JSON parses', () => {
  const raw = fs.readFileSync(PACKAGE_JSON_PATH, 'utf8');
  const pkg = JSON.parse(raw);
  assert.ok(pkg !== null && typeof pkg === 'object' && !Array.isArray(pkg));
});

test('AC 1: identity and workspaces', () => {
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  assert.equal(pkg.name, 'nextmove');
  assert.equal(pkg.private, true);
  assert.ok(Array.isArray(pkg.workspaces));
  assert.ok(pkg.workspaces.includes('apps/*'));
});

test('AC 2: pinned npm and Node 22 engines', () => {
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  assert.equal(pkg.packageManager, 'npm@10');
  assert.ok(pkg.engines && typeof pkg.engines === 'object');
  assert.equal(pkg.engines.node, '22.x');
});

test('AC 3: turbo 2.x devDependency and turbo-run scripts', () => {
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  assert.ok(pkg.devDependencies && typeof pkg.devDependencies === 'object');
  assert.equal(pkg.devDependencies.turbo, '^2.5.0');
  assert.match(pkg.devDependencies.turbo, /\^?2\./);
  assert.equal(pkg.scripts.build, 'turbo run build');
  assert.equal(pkg.scripts.test, 'turbo run test');
  assert.equal(pkg.scripts.lint, 'turbo run lint');
});
