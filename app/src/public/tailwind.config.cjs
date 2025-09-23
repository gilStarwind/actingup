module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.6' }],
        sm: ['0.95rem', { lineHeight: '1.65' }],
        base: ['1.0625rem', { lineHeight: '1.7' }],
        lg: ['1.1875rem', { lineHeight: '1.75' }],
        xl: ['1.375rem', { lineHeight: '1.8' }],
        '2xl': ['1.625rem', { lineHeight: '1.85' }],
        '3xl': ['1.875rem', { lineHeight: '1.9' }],
      },
    },
  },
  plugins: [],
}
