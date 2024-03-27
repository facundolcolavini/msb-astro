export { renderers } from '../renderers.mjs';

const page = () => import('./pages/github_CyTh-i1q.mjs').then(n => n.g);

export { page };
