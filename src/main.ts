import { mount } from 'svelte';
import { packById } from '../languages';
import App from './App.svelte';
import './fonts.css';
import './app.css';
import { startOffline } from './lib/offline';

// A language's own page (python/…, made for search engines: scripts/lib/pages.ts) runs the same
// app. It opens that language's path, at the site's own address, before anything uses the address.
const own = location.pathname.match(/^(.*\/)([\w-]+)\/(?:index\.html)?$/);
if (own && packById.has(own[2])) history.replaceState(null, '', `${own[1]}${location.hash || `#/${own[2]}/`}`);

startOffline();

// The page's plain HTML, for search engines and link previews, gives way to the app.
const target = document.getElementById('app')!;
target.replaceChildren();
export default mount(App, { target });
