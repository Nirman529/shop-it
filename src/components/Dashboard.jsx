import React from 'react'
import '../App.css'
import Charts from "react-apexcharts"
import { Outlet } from 'react-router'

const Dashboard = () => {

	const areaChart = {
		series: [{
			name: 'series1',
			data: [31, 40, 28, 51, 42, 109, 100]
		}, {
			name: 'series2',
			data: [11, 32, 45, 32, 34, 52, 41]
		}],
		chart: {
			height: 350,
			type: 'area'
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			curve: 'smooth'
		},
		xaxis: {
			type: 'datetime',
			categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
		},
		tooltip: {
			x: {
				format: 'dd/MM/yy HH:mm'
			},
		},
	};

	var pieChartState = {
		series: [44, 55, 41, 17, 15],
		chartOptions: {
			labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
		}
	}

	var simpleChartState = {
		options: {
			chart: {
				id: 'basic-bar'
			},
			xaxis: {
				categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
			}
		},
		series: [
			{
				name: 'series-1',
				data: [30, 40, 45, 50, 49, 60, 70, 91]
			}
		]
	};

	return (
		<>
			<div className='body'>
				<h3 className='text-center'>Dashboard</h3>
				<div className='row m-0'>
					<div className='col m-1 rounded'>
						<div className='mixed-chart bg-white'>
							<Charts
								options={simpleChartState.options}
								series={simpleChartState.series}
								type='bar'
								width='500'
								height={400}
							/>
						</div>
					</div>
					<div className='col m-1 rounded'>
						<div className='bg-white'>
							<Charts
								options={pieChartState.chartOptions}
								series={pieChartState.series}
								type='donut'
								width={500}
								height={400}
							/>
						</div>
					</div>
				</div>
				<div className='row m-0'>
					<div className='col m-1 rounded'>
						<div className='bg-white justify-content-center align-items-center text-center'>
							<Charts
								options={areaChart}
								series={areaChart.series}
								type='area'
								width={500}
								height={400}
							/>
						</div>
					</div>
				</div>
			</div>
			<Outlet />
		</>
	)
}

export default Dashboard