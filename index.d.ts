/**
 * Event emitter
 * 
 * @author Rounak Saha
 * @license MIT
 */
type EventEmitter<A,B,C> = {
  /**
   * Dispatch event to attached listeners.
   * 
   * @param event the event name
   * @param data any event data
   * @param callback
   * @returns Returns promise that will be resolved once the listener chain finishes executing. 
   * The resolved value will be the value returned from the last listener in the chain.
   * 
   * **Note:** Supports listener chaining. Listeners are executed in the same sequence they are added with 
   * ```EventEmitter.on``` method. one listener will have access to the return value of next listener in the chain.
   */
  emit: (event: A, data?: B, callback?: (data: C) => void) => Promise<C>,

  /**
   * Subscribe to an event.
   * 
   * @param event The event name
   * @param listener The event listener
   * @returns The unsubscriber function.
   * 
   * **Note:** Supports listener chaining. Listeners are executed in the same sequence they are added with 
   * ```EventEmitter.on``` method. one listener will have access to the return value of next listener in the chain.
   */
  on: (event: A, listener: (data?: B, previousValue?: C) => C) => () => void,

  /**
   * Unsubscribe to an event.
   * 
   * @param event The event name
   * @param listener The event listener
   * 
   * **Note:** Supports listener chaining. Listeners are executed in the same sequence they are added with 
   * ```EventEmitter.on``` method. one listener will have access to the return value of next listener in the chain.
   */
  off: (event: A, listener: (data?: B, previousValue?: C) => C) => void,

  /**
   * Remove the entire listener chain for an event.
   * 
   * @param event The event name
   * 
   * **Note:** Supports listener chaining. Listeners are executed in the same sequence they are added with 
   * ```EventEmitter.on``` method. one listener will have access to the return value of next listener in the chain.
   */
  offAll: (event: A) => void,

}

/**
 * The EventEmitter Singleton 
 */
export default EventEmitter;