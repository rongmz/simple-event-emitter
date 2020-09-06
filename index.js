const EventEmitter = {
  // The events map
  events: {},

  /**
   * Dispatch event to attached listeners.
   * 
   * @param event {String} the event name
   * @param data {any|undefined} any event data
   * @param callback {(data:any) => void|undefined}
   * @returns {Promise} Returns promise that will be resolved once the listener chain finishes executing. 
   * The resolved value will be the value returned from the last listener in the chain.
   * 
   * **Note:** Supports listener chaining. Listeners are executed in the same sequence they are added with 
   * ```EventEmitter.on``` method. one listener will have access to the return value of next listener in the chain.
   */
  emit: (event, data, callback) => {
    return new Promise(resolve => {
      if (!EventEmitter.events[event]) return resolve();
      let valuecache = undefined;
      EventEmitter.events[event].forEach((listener, i, arr) => {
        valuecache = listener(data, valuecache);
        if (i === arr.length - 1) {
          if (callback) callback(valuecache);
          resolve(valuecache);
        }
      });
    });
  },

  /**
   * Subscribe to an event.
   * 
   * @param event {String} The event name
   * @param listener {(data?:any, previousValue?:any) => any} The event listener
   * @returns {() =>void} The unsubscriber function.
   * 
   * **Note:** Supports listener chaining. Listeners are executed in the same sequence they are added with 
   * ```EventEmitter.on``` method. one listener will have access to the return value of next listener in the chain.
   */
  on: (event, listener) => {
    if (!EventEmitter.events[event]) EventEmitter.events[event] = [];
    EventEmitter.events[event].push(listener);
    return () => EventEmitter.off(event, listener);
  },

  /**
   * Unsubscribe to an event.
   * 
   * @param event {String} The event name
   * @param listener {(data?:any, previousValue?:any) => any} The event listener
   * @returns {void}
   * 
   * **Note:** Supports listener chaining. Listeners are executed in the same sequence they are added with 
   * ```EventEmitter.on``` method. one listener will have access to the return value of next listener in the chain.
   */
  off: (event, listener) => {
    EventEmitter.events[event] = (EventEmitter.events[event] || []).filter(l => (l !== listener));
  },

  /**
   * Remove the entire listener chain for an event.
   * 
   * @param event {String} The event name
   * @returns {void}
   * 
   * **Note:** Supports listener chaining. Listeners are executed in the same sequence they are added with 
   * ```EventEmitter.on``` method. one listener will have access to the return value of next listener in the chain.
   */
  offAll: (event) => {
    EventEmitter.events[event] = [];
  },

}

/**
 * The EventEmitter Singleton 
 */
export default EventEmitter;