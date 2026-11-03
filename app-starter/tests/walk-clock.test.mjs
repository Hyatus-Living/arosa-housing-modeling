import test from 'node:test';
import assert from 'node:assert/strict';
import {advanceWalkClock,startWalkClock} from '../frontend/walk-clock.mjs';

test('display clock stops when hidden, resumes once, and cancels its pending frame on cleanup',()=>{
  const frames=new Map(),listeners=new Map(),times=[];
  let id=0;
  const document={visibilityState:'visible',addEventListener:(name,fn)=>listeners.set(name,fn),removeEventListener:name=>listeners.delete(name)};
  const stop=startWalkClock(time=>times.push(time),{
    document,requestAnimationFrame:fn=>{frames.set(++id,fn);return id;},cancelAnimationFrame:id=>frames.delete(id),
  });
  const render=time=>{const [id,fn]=frames.entries().next().value;frames.delete(id);fn(time);};
  render(1000);render(1016);
  assert.deepEqual(times,[1,1.016]);
  assert.equal(frames.size,1);
  document.visibilityState='hidden';listeners.get('visibilitychange')();
  assert.equal(frames.size,0);
  document.visibilityState='visible';listeners.get('visibilitychange')();
  assert.equal(frames.size,1);
  render(5000);
  assert.equal(times.at(-1),5);
  stop();
  assert.equal(frames.size,0);
  assert.equal(listeners.size,0);
});
