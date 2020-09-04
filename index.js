const EventEmitter = {
  // The events map
  events: {},

  /**
   * Dispatch event to attached listeners.
   * 
   * @param event {String} the event name
   * @param data {any|undefined} any event data
   * @returns {void}
   * 
   * **Note:** Supports listener chaining. Listeners are executed in the same sequence they are added with 
   * ```EventEmitter.on``` method. one listener will have access to the return value of next listener in the chain.
   */
  emit: (event, data) => {
    if (!EventEmitter.events[event]) return;
    let valuecache = undefined;
    EventEmitter.events[event].forEach(listener => {
      valuecache = listener(data, valuecache);
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