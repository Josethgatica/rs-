import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const VentasPorEmpleado = ({ empleados, totales_por_empleado }) => {
  // Define chart data
  const data = {
    labels: empleados,
    datasets: [
      {
        label: 'Ventas por Empleado',
        data: totales_por_empleado,
         backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
        borderWidth: 1,
      },
    ],
  };

  // Define chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ventas por Empleado',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Ventas ($)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Empleados',
        },
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Pie data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default VentasPorEmpleado;