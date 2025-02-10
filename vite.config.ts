import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

import react from '@vitejs/plugin-react';

export default defineConfig({
	base: '/fe-exercise/',
	plugins: [react(), tailwindcss()],
	server: {
		proxy: {
			'/auth': {
				target: 'https://frontend-take-home-service.fetch.com',
				changeOrigin: true,
				secure: false,
				xfwd: true,
			},
			'/dogs': {
				target: 'https://frontend-take-home-service.fetch.com',
				changeOrigin: true,
				secure: false,
				xfwd: true,
			},
			'/locations': {
				target: 'https://frontend-take-home-service.fetch.com',
				changeOrigin: true,
				secure: false,
				xfwd: true,
			},
		},
	},
});
