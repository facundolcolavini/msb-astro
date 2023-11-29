/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		animate: ['responsive', 'hover', 'focus'],
		animation: {
			none: 'none',
			spin: 'spin 1s linear infinite',
			ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
			pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			bounce: 'bounce 1s infinite',
			fadeIn: 'fadeIn 0.5s cubic-bezier(0, 0, 0.2, 1)',
			wiggle: 'wiggle 1s ease-in-out infinite',
			downOut: 'downOut 300ms ease-in-out forwards',
			growOut: 'growOut 300ms ease-in-out forwards ',
			scaleDown: 'scaleDown 300ms ease-in-out forwards ',
			dropDown: 'dropDown 300ms ease-in-out forwards ',
		},
		keyframes: {
			// Add keyframe for fade animation 
			fadeIn: {
				'0%': { opacity: 0 },
				'100%': { opacity: 1 },
			},
			downOut: {
			'0%':{transform: "translateZ(200px) transLateY(40px)"},
			'80%': {transform: "translateZ(-10px) transLateY(0px)"},
			'100%': {
				   transform: "translateZ(0px) transLateY(0px)"
			   },
		   },
		   dropDown: {
			'0%':{transform: "translateZ(-200px) transLateY(-20px)",
			opacity: 0,

				  	 
				  },	

			'80%': {transform: "translateZ(10px) transLateY(0px)"},
			'100%': {
				   transform: "translateZ(0px) transLateY(0px)"
			   },
		   },
		   growOut: {
			'0%':{
				   transform: "scale(0)"
			   },
			   '80%': {
				   transform:" scale(1.1)"
			   },
			   '100%': {
				   transform:" scale(1)"
			   }
		   },
		   scaleDown : {
			'0%':{
				   transform: "scale(0)"
			   },
			   '80%': {
				   transform:" scale(1.07)"
			   },
			   '100%': {
				   transform:" scale(1)"
			   }
		   },
		},
		extend: {},
	},
	plugins: [],
}
