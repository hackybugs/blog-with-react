
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const data = [
  { name: "A", x: 30, y: 70 },
  { name: "B", x: 12, y: 88 },
  { name: "C", x: 15, y: 85 },
  { name: "D", x: 35, y: 65 },
  { name: "E", x: 54, y: 46 },
  { name: "F", x: 72, y: 28 },
  { name: "G", x: 32, y: 68 },
  { name: "H", x: 30, y: 70 },
  { name: "I", x: 12, y: 88 },
  { name: "J", x: 15, y: 85 },
  { name: "K", x: 35, y: 65 },
  { name: "L", x: 54, y: 46 },
  { name: "M", x: 72, y: 28 },
  { name: "N", x: 32, y: 68 }
];

const BarChartComponent = () => {

  return (
    <div>
      <div className='barChartBox mt-5'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={40} data={data} >
            <Bar dataKey="x" stackId="a" fill="#6C5DD3" barSize={12} radius={[10, 10, 0, 0]} />
            {/* <Bar dataKey="y" stackId="a" fill="#E4E8EF" barSize={12} radius={[10, 10, 0, 0]} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} /> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BarChartComponent