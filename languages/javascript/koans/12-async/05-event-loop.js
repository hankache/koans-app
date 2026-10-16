// title: The event loop
// intro: Code runs to the end before anything queued: promise callbacks (microtasks) run next, then timers (macrotasks), even a timer of 0 ms.
const order = [];
setTimeout(() => order.push('timeout'), 0);
Promise.resolve().then(() => order.push('promise'));
queueMicrotask(() => order.push('microtask'));
order.push('sync');
expect(order, 'only the synchronous part has run so far').toEqual(___);
await new Promise(resolve => setTimeout(resolve, 10));
expect(order, 'then microtasks, then timers').toEqual(___);
