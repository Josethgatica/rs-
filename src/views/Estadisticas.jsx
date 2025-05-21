import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VentasPorMes from '../components/graficos/VentasPorMes';
import VentasPorEmpleado from '../components/graficos/VentasPorEmpleado';
import { Pie } from 'react-chartjs-2';


const Estadisticas = () => {
  // Estados para las ventas por mes
  const [meses, setMeses] = useState([]);
  const [totalesPorMes, setTotalesPorMes] = useState([]);

  // Estados para las ventas por empleado
  const [empleados, setEmpleados] = useState([]);
  const [total_ventas, setTotalVentas] = useState([]);

  // Cargar datos de ventas por mes
  useEffect(() => {
    cargaVentas();
    cargaVentasPorEmpleado();
  }, []);


      const cargaVentas = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/totalVentasPorMes");
        const data = await response.json();

        setMeses(data.map((item) => item.mes));
        setTotalesPorMes(data.map((item) => item.total_ventas));
      } catch (error) {
        console.error("Error al cargar ventas:", error);
        alert("Error al cargar ventas: " + error.message);
      }
    };

const cargaVentasPorEmpleado = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/totalVentasPorEmpleado");
    const data = await response.json();

    setEmpleados(data.map((item) => item.primer_nombre));
    setTotalVentas(data.map((item) => item.total_ventas)); // ← esta línea estaba mal antes
  } catch (error) {
    console.error("Error al cargar las ventas por empleados:", error);
    alert("Error al cargar las ventas por empleados: " + error.message);
  }
};
    
  return (
    <Container className="mt-5">
      <h4>Estadísticas</h4>
      <Row className="mt-4">
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <VentasPorMes meses={meses} totales_por_mes={totalesPorMes} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <VentasPorEmpleado empleados={empleados} total_ventas={total_ventas} />
        </Col>
      </Row>
    </Container>
  );
};

export default Estadisticas;