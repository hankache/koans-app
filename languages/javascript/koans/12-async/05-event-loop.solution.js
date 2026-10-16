const order = [];
setTimeout(() => order.push('timeout'), 0);
Promise.resolve().then(() => order.push('promise'));
queueMicrotask(() => order.push('microtask'));
order.push('sync');
expect(order, 'only the synchronous part has run so far').toEqual(['sync']);
await new Promise(resolve => setTimeout(resolve, 10));
expect(order, 'then microtasks, then timers').toEqual(['sync', 'promise', 'microtask', 'timeout']);
