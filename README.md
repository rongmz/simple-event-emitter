# Simple Event Emitter

A simple event emitter. Can be used as replacement of Redux.

## Getting Started

Install from npm 
```
npm i @rongmz/simple-event-emitter
```

Import EventEmitter from module
```javascript
import EventEmitter from '@rongmz/simple-event-emitter';
```

Emit an event with optional data
```javascript
EventEmitter.emit('event_name', anyData)
  .then(data => {
    // data is the value returned from last listener
  });
```

Subscribe and Unsubscribe to/from an event
```javascript
const unsubscribe = EventEmitter.on('event_name', function(data, chainValue) {
  // The emitted data is available as data.
  // chainValue contains value returned from previous listeners for this event.
  // any value required for next listeners of this event must be returned form this current listener.
  return `This is optional sample data retrned to be 
          used in next listener for this event, or to
          be resolved in emit function.`
});

// we can easily remove the attached listener from the event by calling the unsubscribe function
unsubscribe();
```

Remove all listeners from an event
```javascript
EventEmitter.offAll('event_name');
```