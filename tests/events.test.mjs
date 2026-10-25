import assert from 'node:assert/strict';
import test from 'node:test';
import { outpourEvent } from '../src/data/events.ts';
import { getEventTiming, getUpcomingEvents, getFeaturedEvent } from '../src/utils/events.ts';

const at = (date) => getEventTiming(outpourEvent, Date.parse(date));

test('counts down to November 15 at 9 AM WAT', () => {
  const timing = at('2026-10-25T09:00:00+01:00');
  assert.equal(timing.status, 'upcoming');
  assert.equal(timing.remaining, 21 * 86400000);
  assert.equal(timing.label, 'November 15 · First service');
});

test('today uses the Lagos calendar day, not the next 24 hours', () => {
  assert.equal(at('2026-11-14T12:00:00+01:00').status, 'upcoming');
  assert.equal(at('2026-11-15T00:00:00+01:00').status, 'today');
});

test('shows live only during a service and advances to each next service', () => {
  assert.equal(at('2026-11-15T09:00:00+01:00').status, 'started');
  assert.equal(at('2026-11-15T10:59:59+01:00').status, 'started');
  const evening = at('2026-11-15T11:00:00+01:00');
  assert.equal(evening.status, 'today');
  assert.equal(evening.label, 'November 15 · Second service');
  assert.equal(at('2026-11-15T18:00:00+01:00').status, 'started');
  const nextSunday = at('2026-11-15T20:00:00+01:00');
  assert.equal(nextSunday.status, 'upcoming');
  assert.equal(nextSunday.label, 'November 29 · First service');
  assert.equal(at('2026-11-29T09:00:00+01:00').status, 'started');
  assert.equal(at('2026-11-29T11:00:00+01:00').label, 'November 29 · Second service');
  assert.equal(at('2026-11-29T18:00:00+01:00').status, 'started');
});

test('expires immediately at the end of the final service', () => {
  const now = Date.parse('2026-11-29T20:00:00+01:00');
  assert.equal(getEventTiming(outpourEvent, now).status, 'ended');
  assert.deepEqual(getUpcomingEvents([outpourEvent], now), []);
  assert.equal(getFeaturedEvent([outpourEvent], now), null);
});

test('keeps CMS events and returns to them when the featured event ends', () => {
  const cmsEvent = {
    ...outpourEvent, id: 'cms-event', detailsPath: undefined, sessions: undefined,
    primary: { ...outpourEvent.primary, event_name: 'Christmas service',
      start_date_and_time: '2026-12-25T09:00:00+01:00', end_date_and_time: '2026-12-25T11:00:00+01:00' },
  };
  assert.equal(getFeaturedEvent([cmsEvent, outpourEvent], Date.parse('2026-10-25T09:00:00+01:00')), outpourEvent);
  assert.equal(getFeaturedEvent([cmsEvent, outpourEvent], Date.parse('2026-11-29T20:00:00+01:00')), cmsEvent);
  assert.equal(getEventTiming(cmsEvent, Date.parse('2026-12-25T10:00:00+01:00')).status, 'started');
});

test('invalid or missing CMS dates do not create perpetual promotions', () => {
  const invalid = { ...outpourEvent, sessions: undefined, primary: { ...outpourEvent.primary, start_date_and_time: null, end_date_and_time: null } };
  assert.deepEqual(getUpcomingEvents([invalid], Date.now()), []);
  invalid.primary.end_date_and_time = '2026-12-25T11:00:00+01:00';
  assert.deepEqual(getUpcomingEvents([invalid], Date.parse('2026-10-25T09:00:00+01:00')), []);
});
