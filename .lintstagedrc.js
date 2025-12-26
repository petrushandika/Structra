module.exports = {
  // Frontend TypeScript files - format and type check
  'frontend/**/*.{ts,tsx}': (filenames) => {
    return [
      `prettier --write ${filenames.join(' ')}`,
      'cd frontend && npm run type-check',
    ]
  },

  // Frontend other files - format only
  'frontend/**/*.{js,jsx,json,css,scss,md}': ['prettier --write'],

  // Backend TypeScript files - format and type check
  'backend/**/*.ts': (filenames) => {
    return [
      `prettier --write ${filenames.join(' ')}`,
      'cd backend && bunx tsc --noEmit',
    ]
  },

  // Backend other files - format only
  'backend/**/*.{js,json,md}': ['prettier --write'],

  // Root files - format only
  '*.{js,json,md,yml,yaml}': ['prettier --write'],
}
