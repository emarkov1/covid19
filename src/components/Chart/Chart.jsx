import React, {useState, useEffect} from "react";
import {fetchDailyData} from '../../api'
import { Line, HorizontalBar} from 'react-chartjs-2'
import './Chart.module.css'

const Chart = ({data:{confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDailyData] = useState([])

    useEffect(()=>{
        const fetchAPI = async () =>{
           setDailyData(await fetchDailyData())
        }

        fetchAPI()
    }, [])
    const LineChart =  (
      
          
        dailyData.length ? (
        
      <Line
        data={{
            labels: dailyData.slice().reverse().filter((item, index) => index % 3 == 0).reverse().map(({ date }) => date),
          datasets: [
            {
              data: dailyData.slice().reverse().filter((item, index) => index % 3 == 0).reverse().map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "blue",
              fill: true,
            },
            {
              data: dailyData.slice().reverse().filter((item, index) => index % 3 == 0).reverse().map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: 'rgba(255,0,0,0.5)',
              fill: true,
            },
          ],
        }}
      />
    ) : null 
    );
    console.log(confirmed)
    const barChart = (
        confirmed ? (
        <HorizontalBar 
            data={{
                labels:['Infected', 'Recovered', 'Deaths'],
                datasets:[{
                    label:'people',
                    backgroundColor:[
                        'rgba(0,0,255,0.7)',
                        'rgba(0,255,0,0.7)',
                        'rgba(255,0,0,0.7)'
                    ],
                    data:[confirmed.value, recovered.value, deaths.value],
                  categoryPercentage : 0.5
                }]
            }}
            options={{
                legend:{display:false},
                title:{display :true, text :`${country} Diagramm`},
            }}
            />
        ) : null
    )

  return (
    <div className="container_chart">{country ? barChart : LineChart}</div>
  );
};
export default Chart;
