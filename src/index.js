import Display from './display.vue';

export default {
	id: 'sparline-display',
	name: 'SparkLine Display',
	description: 'Sparkline Display',
	types: ['json'],
	icon: 'settings_ethernet',
	component: Display,
	options: [
    {
      field: 'sparklineType',
      name: 'SparkLine Type',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: {
          choices: [
            { text: 'Line', value: 'line' },
            { text: 'Bar', value: 'bar' },
            { text: 'Pie', value: 'pie' },
            { text: 'Donut', value: 'donut' }
          ]
        },
        width: 'full',
        default: 'line'
      },
    },
		{
			field: 'dataKey',
			name: 'Key',
			type: 'string',
			meta: {
				width: 'full',
				interface: 'input',
				options: {
					placeholder: 'Please enter the key of table',
				},
			},
		}
	],
};
