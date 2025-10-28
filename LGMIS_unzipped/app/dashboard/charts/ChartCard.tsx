"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { subDays, format } from "date-fns";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const labels = Array.from({ length: 7 }).map((_, i) => format(subDays(new Date(), 6 - i), "MMM d"));

const data = {
  labels,
  datasets: [
    {
      label: "Sessions",
      data: [12, 19, 13, 25, 18, 32, 28]
    }
  ]
};

export default function ChartCard() {
  return <Line data={data} />;
}
