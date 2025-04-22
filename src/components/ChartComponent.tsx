
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ChartProps {
  type: "bar" | "pie";
  data: any[];
  title: string;
  dataKey?: string;
  categoryKey?: string;
  colors?: string[];
}

const defaultColors = [
  "#1E56A0", // Angola primary blue
  "#D63230", // Angola secondary red
  "#F5CF00", // Angola yellow
  "#173560", // Angola dark blue
  "#F6F8FA", // Angola light
];

const ChartComponent = ({ type, data, title, dataKey = "value", categoryKey = "name", colors = defaultColors }: ChartProps) => {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {type === "bar" ? (
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={categoryKey} />
              <YAxis />
              <Tooltip />
              <Bar dataKey={dataKey} fill={colors[0]} />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey={dataKey}
                nameKey={categoryKey}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
