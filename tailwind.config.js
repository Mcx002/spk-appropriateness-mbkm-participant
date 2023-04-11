/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#006BCD',
        'darker-primary': '#005fb4',
        'darker-primary2': '#054888',
        'dark-1': '#111111',
        'dark-2': '#333333',
        danger: '#F34949',
        placeholder: '#CBCDD8',
        'main-grey': '#D9D9D9',
        'white-card': '#FFFDFD',
        'heading-login': '#4F4A4A',
        'input-label': '#464646'
      },
      fontFamily: {
        body: ["'Poppins'"],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'heading-login': '45px'
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
                'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        'sliding-right': {
          '0%': {
            transform: 'translateX(0%)',
          },
          '50%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
        'sliding-left': {
          '0%': {
            transform: 'translateX(0%)',
          },
          '50%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        'sliding-right': 'sliding-right 1s linear infinite',
        'sliding-left': 'sliding-left 1s linear infinite',
        'slide-in': 'slide-in 0.5s cubic-bezier(.41,.73,.51,1.02)',
      },
      transitionProperty: {
        height: 'height',
      },
      screens: {
        300: '300px',
        350: '350px',
        400: '400px',
        450: '450px',
        500: '500px',
        550: '550px',
      },
      lineHeight: {
        150: '150%',
      },
      spacing: {
        8.5: '2.125rem',
      },
      height: {
        30: '7.5rem',
        'bg-login-height': '425.81px'
      },
      width: {
        30: '7.5rem',
        '450px': '450px',
        'bg-login-width': '577px',
        'card-register': '635px',
        'content-normal': '1158px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
