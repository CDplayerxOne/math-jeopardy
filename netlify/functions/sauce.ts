import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
	const CORS_HEADERS = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	};
	const sauce = {
		questions: [
			{
				id: 0,
				category: 'Functions',
				question: 'Describe the Properties of an Even Function',
				value: 100,
				answer: 'Symmetric with respect to y-axis and/or f(x) = f(-x)',
				completed: false
			},
			{
				id: 1,
				category: 'Polynomials',
				question: 'Using Long Division, Divide',
				math: '\\frac{3x^3-7x^2+2x-8}{x-2}',
				value: 100,
				answer: ['3x^2-x-\\frac{8}{x-2}'],
				completed: false
			},
			{
				id: 2,
				category: 'Rationals',
				question: 'Simplify. State Restrictions',
				math: '\\frac{x^2 - 7x + 10}{x - 5}',
				value: 100,
				answer: ['x - 2, \\quad x \\neq 5'],
				completed: false
			},
			{
				id: 3,
				category: 'Exponential and Logs',
				question: 'List the Standard Log Rules for Powers, Addition and Subtraction',
				value: 100,
				answer: [
					'\\log_x(x) + \\log_y(y) = \\log(xy)',
					'\\log_x(x) - \\log_y(y) = \\log\\left(\\frac{x}{y}\\right)',
					'n\\log_x(x) = \\log(x^n)'
				],
				completed: false
			},
			{
				id: 4,
				category: 'Trigonometry',
				question: 'Convert to Radians',
				math: '600^\\circ',
				value: 100,
				answer: ['\\frac{10\\pi}{3}'],
				completed: false
			},
			{
				id: 5,
				category: 'Functions',
				question:
					'A Sin or Cos Equation With an Amplitude of 2 and a Vertical Displacement of 3, What is the Range? Use Interval Notation',
				value: 200,
				answer: ['y \\in [1, 5]'],
				completed: false
			},
			{
				id: 6,
				category: 'Polynomials',
				question: 'Factor Completely.',
				math: '2x^3-x^2-14x+16',
				value: 200,
				answer: ['(2x^2+3x-8)(x-2)'],
				completed: false
			},
			{
				id: 7,
				category: 'Rationals',
				question: 'Simplify. State Restrictions',
				math: '\\frac{x^2+6x+9}{x^2+9x+18}',
				value: 200,
				answer: ['\\frac{x+3}{x+6}, \\quad x \\neq -3, -6'],
				completed: false
			},
			{
				id: 8,
				category: 'Exponential and Logs',
				question:
					'Compound X-20 has a half life of 5 days, what is the mass of the 152g sample after 27 days?',
				value: 200,
				answer: '3.59g',
				completed: false
			},
			{
				id: 9,
				category: 'Trigonometry',
				question: 'Simplify',
				math: '\\sin(30^\\circ) + \\cos\\left(\\frac{\\pi}{3}\\right) - \\tan(45^\\circ)',
				value: 200,
				answer: '0',
				completed: false
			},
			{
				id: 10,
				category: 'Functions',
				question:
					"Describe the Relationship Between f(x) and it's inverse in terms of domain and range",
				value: 300,
				answer: 'The Domains and Ranges are Interchanged',
				completed: false
			},
			{
				id: 11,
				category: 'Polynomials',
				question: 'Please Describe This Graph Using a Polynomial Equation',
				image: 'https://drive.google.com/uc?export=view&id=1_qZxrotbX8sYqJ69g4dHH86pvSz3IoOR',
				value: 300,
				answer: ['y = (x-1)^2(x+e)^3(x-3)^2'],
				completed: false
			},
			{
				id: 12,
				category: 'Rationals',
				question: 'Graph',
				math: 'f(x) = \\frac{3}{x + 4}',
				value: 300,
				answer: [''],
				answerImage: 'https://drive.google.com/uc?export=view&id=1Rx8WEDahDuTMFtN0GbxYQrxW_lXbOqsv',
				completed: false
			},
			{
				id: 13,
				category: 'Exponential and Logs',
				question: 'Solve for x.',
				math: '6^{2x+1} = 3^{x+2}',
				value: 300,
				answer: ['\\frac{\\ln\\left(\\frac{3}{2}\\right)}{\\ln(12)}'],
				completed: false
			},
			{
				id: 14,
				category: 'Trigonometry',
				question: 'Find the Equation of the Graph',
				image: 'https://drive.google.com/uc?export=view&id=1kwj4nIH5GTIL9h-pxhL9hqnezsDZor54',
				value: 300,
				answer: ['\\frac{1}{4} \\cos(x - 30^\\circ) + 3'],
				completed: false
			},
			{
				id: 15,
				category: 'Functions',
				question: 'What is the Range of the Inverse of',
				math: 'f(x) = x^5 + x^4 + 3x^2 - 6x',
				value: 400,
				answer: ['y \\in \\mathbb{R}'],
				completed: false
			},
			{
				id: 16,
				category: 'Polynomials',
				question: 'Please Graph the Following',
				math: 'y = 3x^2(x+\\pi)^3(x-3)(x+2)',
				value: 400,
				answer: [''],
				answerImage: 'https://drive.google.com/uc?export=view&id=1cUgvYITrFY7umRIh7_dpFg8li-ynr9uH',
				completed: false
			},
			{
				id: 17,
				category: 'Rationals',
				question: 'Simplify. State Restrictions',
				math: '\\frac{2x^2+3x+1}{x^2-5x+6}',
				value: 400,
				answer: ['\\frac{(2x+1)(x+1)}{(x-3)(x-2)}, \\quad x \\neq -3, -2'],
				completed: false
			},
			{
				id: 18,
				category: 'Exponential and Logs',
				question: 'Simplify and Convert to Base 3',
				math: '2\\log_5(8) + \\log_5(7) - \\log_5(2)',
				value: 400,
				answer: ['\\frac{\\log_3(224)}{\\log_3(5)}'],
				completed: false
			},
			{
				id: 19,
				category: 'Trigonometry',
				question: 'Solve for Theta',
				math: '(5\\cos\\theta + 10)(2\\sin\\theta - \\sqrt{3}) = 0',
				value: 400,
				answer: ['\\Theta \\in {60^\\circ, 120^\\circ}'],
				completed: false
			},
			{
				id: 20,
				category: 'Functions',
				question: 'In Interval Notation, Write the Domain of and Range of ',
				math: 'f(x) = \\frac{\\sqrt{3-x}}{x+2} + 2',
				value: 500,
				answer: ['D: x \\in (-\\infty, -2) \\cup (-2, 3)', 'R: y \\in \\mathbb{R}'],
				completed: false
			},
			{
				id: 21,
				category: 'Polynomials',
				question: 'Solve for x.',
				math: '3(x+1)(2x-3) \\ge x + 5',
				value: 500,
				answer: ['-\\frac{2}{3} < x < 1'],
				completed: false
			},
			{
				id: 22,
				category: 'Rationals',
				question: 'Simplify. State Restrictions',
				math: ' f(x) = \\frac{2}{x^2+1} + 3',
				value: 500,
				answer: [''],
				answerImage: 'https://drive.google.com/uc?export=view&id=1WXjIVP-6Pw2KNWCRx-BJDAnjXPBQHMya',
				completed: false
			},
			{
				id: 23,
				category: 'Exponential and Logs',
				question: 'What is the Equation of This Graph?',
				image: 'https://drive.google.com/uc?export=view&id=1BF5eI5kQeMFLNPS9Z5r11uhypjE15aQ5',
				value: 500,
				answer: ['3\\log(x-5) + 3'],
				completed: false
			},
			{
				id: 24,
				category: 'Trigonometry',
				question: 'Find the Exact Value of',
				math: '\\sin(75^\\circ)',
				value: 500,
				answer: ['\\frac{{\\sqrt{2} + \\sqrt{6}}}{4}'],
				completed: false
			}
		]
	};
	return {
		statusCode: 200,
		body: JSON.stringify(sauce),
		headers: CORS_HEADERS
	};
};

export { handler };
