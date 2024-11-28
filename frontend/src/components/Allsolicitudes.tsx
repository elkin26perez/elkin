import { customAxiosAdmin } from '@/interceptor/axios.interceptor'
import { useEffect, useState } from 'react'
import {ResponsiveContainer , Tooltip ,XAxis , BarChart, CartesianGrid , YAxis, Legend , Bar} from 'recharts' 

const Allsolicitudes = () => {
  type ChartData = { estatus: string; count: number }[];

  const [chartData, setChartData] = useState<ChartData>([]);

    
    async function allSolicitudesData() {
      try {
        const request = await customAxiosAdmin.get<{ data: Solicitud[] }>("admin/solicitudes", {
          headers: {
            "content-type": "application/json",
          },
          withCredentials: true,
        });
    
        if (request.status === 200) {
          const solicitudes = request.data.data;
    
          const counts = solicitudes.reduce<Record<string, number>>((acc, curr) => {
            acc[curr.estatus] = (acc[curr.estatus] || 0) + 1;
            return acc;
          }, {});
    
          const formattedData = Object.keys(counts).map((estatus) => ({
            estatus,
            count: counts[estatus],
          }));
    
          setChartData(formattedData);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }

    
      useEffect(()=>{
        allSolicitudesData()
      },[])
    return (
      <section className=' flex flex-col items-center justify-start text-blue-500 my-4 '>
        <h1 className='font-bold text-2xl'>Solicitudes por tipos</h1>
      <div style={{ width: '100%', maxHeight: '400px', marginTop: "1em" }} >
          <ResponsiveContainer width="100%" height="400px" aspect={1}>
              <BarChart data={chartData} width={400} height={400} margin={{top:5 , right:5,bottom:5, left:5}}>
                  <CartesianGrid strokeDasharray="4,1"/>
                  <XAxis dataKey="estatus"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="count" fill='#a54f1e'/>
                </BarChart>
          </ResponsiveContainer>
      </div>

      </section>
  )
}

export default Allsolicitudes