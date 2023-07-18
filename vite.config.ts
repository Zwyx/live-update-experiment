import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{
				find: "~",
				replacement: "/src",
			},
		],
	},
	build: {
		outDir: "docs",
	},
	base: "live-update-experiment",
});
