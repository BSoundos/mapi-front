import React, { useEffect, useRef,useState } from 'react';
import Chart, { ChartConfiguration, Scale } from 'chart.js/auto';

import { useSelector } from 'react-redux';
import {  fetchRevenueReport } from '@/components/features/apis_management/statisticsSlice';
import { useAppDispatch,RootState } from '@/app/store'; 

interface ExtendedChartOptions extends ChartConfiguration<'bar'> {
  grid?: {
    color?: string;
  };
}

const MyChart = () => {


  const dispatch = useAppDispatch();
  
  const revenueReport = useSelector((state: RootState) => state.statistics.revenueReport);
  const loading = useSelector((state: RootState) => state.statistics.loading);
  const error = useSelector((state: RootState) => state.statistics.error);

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart<'bar', (number | undefined)[], string, ExtendedChartOptions> | null>(null);
  const [year, setYear] = React.useState(2024);// pour la valeur de year 
  const [period, setPeriod] = React.useState<string>('year');// pour le selelect (year,monthand week)
  const [month, setMonth] = React.useState<number>(1); // pour la valeur de month
  const [week, setWeek] = React.useState<number>(1);// pour la valeur de week

  let data: number[] = [];
  

  useEffect(() => {
      dispatch(fetchRevenueReport({ timeRange: 'year' })); // Fetch for current year
  }, [dispatch]);


  useEffect(() => {
    const fetchParameters = { timeRange: period, year, month, week };

    if (period === 'week') {
      fetchParameters.timeRange = 'week';
      fetchParameters.week = week;
      fetchParameters.month = null;
      fetchParameters.year = null;

    } else if (period === 'month') {
      fetchParameters.timeRange = 'month';
      fetchParameters.month = month;
      fetchParameters.week = null;
      fetchParameters.year = null;

    } else {
      fetchParameters.timeRange = 'year';
      fetchParameters.year = year;
      fetchParameters.week = null;
      fetchParameters.month = null;

    }

    dispatch(fetchRevenueReport(fetchParameters));
  }, [dispatch, period, year, month, week]);
  


  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {

        let labelsData;
        let data: number[] = [];

        if (period === 'year') {
          labelsData = [
            `Jan ${year}`,
            `Feb ${year}`,
            `Mar ${year}`,
            `Apr ${year}`,
            `May ${year}`,
            `Jun ${year}`,
            `Jul ${year}`,
            `Aug ${year}`,
            `Sep ${year}`,
            `Oct ${year}`,
            `Nov ${year}`,
            `Dec ${year}`,
          ];
          data = revenueReport.map((item) => item.amount ?? 0); // Ensure data matches labels
        } else if (period === 'month') {
          labelsData = Array.from({ length: 5 }, (_, i) => `Week ${i + 1}`); // Adjust if needed
          data = revenueReport.map((item) => item.amount ?? 0);
        } else if (period === 'week') {
          labelsData = revenueReport.map((item) => item.date); // Adjust if needed
          data = revenueReport.map((item) => item.amount ?? 0);
        }

        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labelsData,
            datasets: [{
              label: 'Revenue',
              data: data,
              backgroundColor: [
                '#2995A3',
              ],
              borderColor: [
                '#2995A3',
              ],
              borderWidth: 1,
            }],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: '#BFBFBF',
                },
              },
              x: {
                ticks: {
                  color: '#BFBFBF',
                },
              },
            },
        
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [period, revenueReport, year]);

 
  
  const handleYearChange = (increment: number) => {
    setYear(prevYear => prevYear + increment);
  };

  const handleMonthChange = (increment: number) => {
    setMonth(prevMonth => {
      let newMonth = prevMonth + increment;
      if (newMonth < 1) newMonth = 1;
      if (newMonth > 12) newMonth = 12;
      return newMonth;
    });
  };

  const handleWeekChange = (increment: number) => {
    setWeek(prevWeek => {
      let newWeek = prevWeek + increment;
      const maxWeeksInYear = 5; // Modifier ceci avec le nombre maximum de semaines dans une année
      if (newWeek < 1) newWeek = 1;
      if (newWeek > maxWeeksInYear) newWeek = maxWeeksInYear;

      return newWeek;
    });
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(event.target.value as 'year' | 'month' | 'week');
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
   const weeks = ['week 1','week 2','week 3','week 4','week 5']
  return (
    <div className=' bg-[#0B1739]  border border-opacity-30 border-[#7E89AC]'>
      <div className='dataCard revenueCard p-8' style={{ maxHeight: '340px' }}>
        <div className='flex justify-between'>
             <h3 className='text-[#BFBFBF] font-semibold'>Earning Overview 
            {period === 'month' ? (
               <span> Of The current Year</span> 
            ) : period === 'week' ? (
             <span> Of The current Month</span> 
            ): null }

             </h3>
             <div className='flex'>
             <div className='flex items-center mr-4 bg-[#081028] border border-opacity-30 border-[#7E89AC] text-white'>
             {period === 'year' ? (
              <React.Fragment>
                <button className="pr-6 pl-1 text-white focus:outline-none" onClick={() => handleYearChange(-1)}>&lt;</button>
                <p>{year}</p>
                <button className="pl-6 pr-1 focus:outline-none" onClick={() => handleYearChange(1)}>&gt;</button>
              </React.Fragment>
            ) : period === 'month' ? (
              <React.Fragment>
                <button className="pr-6 pl-1 text-white focus:outline-none" onClick={() => handleMonthChange(-1)}>&lt;</button>
                <p>{months[month - 1]}</p>
                <button className="pl-6 pr-1 focus:outline-none" onClick={() => handleMonthChange(1)}>&gt;</button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <button className="pr-6 pl-1 text-white focus:outline-none" onClick={() => handleWeekChange(-1)}>&lt;</button>
                <p>{weeks[week-1]}</p>
                <button className="pl-6 pr-1 focus:outline-none" onClick={() => handleWeekChange(1)}>&gt;</button>
                  
              </React.Fragment>
            )}

              </div>
                  <select className="py-1 px-3 bg-[#081028] border border-opacity-30 border-[#7E89AC] text-white focus:outline-none" onChange={(e) => setPeriod(e.target.value)}>
                      <option value="year">Year</option>
                      <option value="month">Month</option>
                      <option value="week">Week</option>
                  </select>
             </div>
        </div>

        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default MyChart;
