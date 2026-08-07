/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F172A',
          light: '#1E293B',
          dark: '#020617',
        },
        offwhite: {
          DEFAULT: '#F8FAFC',
          pure: '#FFFFFF',
          dark: '#F1F5F9',
        },
        electric: {
          DEFAULT: '#2563EB',
          glow: 'rgba(37, 99, 235, 0.3)',
        },
        gold: {
          DEFAULT: '#64748B', // Repurposing for secondary text
          glow: 'rgba(100, 116, 139, 0.3)',
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(37, 99, 235, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}
