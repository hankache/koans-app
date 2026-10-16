type Events = { login: { user: string }; logout: undefined; error: { code: number } };
const handlers = new Map<string, ((data: never) => void)[]>();
function on<K extends keyof Events>(name: K, handler: (data: Events[K]) => void) {
  handlers.set(name, [...(handlers.get(name) ?? []), handler]);
}
function emit<K extends keyof Events>(name: K, data: Events[K]) {
  for (const handler of handlers.get(name) ?? []) (handler as (data: Events[K]) => void)(data);
}
const log: string[] = [];
on('login', p => log.push(`hi ${p.user}`));
on('error', p => log.push(`error ${p.code}`));
emit('login', { user: 'ada' });
emit('error', { code: 404 });
emit('logout', undefined);
expect(log, 'each listener got its own payload').toEqual(['hi ada', 'error 404']);
expectTypeOf<keyof Events>().toEqualTypeOf<'login' | 'logout' | 'error'>(); // the event names on accepts
expectTypeOf<Parameters<typeof emit<'error'>>[1]>().toEqualTypeOf<{ code: number }>(); // the payload follows the name
