// DomainChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

function DomainChart({ domains }) {
  const domainLabels = domains.map(domain => domain.name);
  const data = {
    labels: domainLabels,
    datasets: [
      {
        label: 'Domain Distribution',
        data: domainLabels.length > 0 ? domains.map(() => 1) : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Domain Distribution</h2>
      <Pie data={data} />
    </div>
  );
}

export default DomainChart;
