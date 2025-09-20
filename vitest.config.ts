
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',            // precisa para React
    globals: true,                   // describe/it/expect globais
    setupFiles: './vitest.setup.ts',  // importa jest-dom
  },
});
