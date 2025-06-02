import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import VentasPorMes from '../components/graficos/VentasPorMes';
import VentasPorEmpleado from '../components/graficos/VentasPorEmpleado';
import { Pie } from 'react-chartjs-2';
import ChatIA from '../components/chat/ChatIA';

const Estadisticas = () => {
  // Estados para las ventas por mes
  const [meses, setMeses] = useState([]);
  const [totalesPorMes, setTotalesPorMes] = useState([]);

  // Estados para las ventas por empleado
  const [empleados, setEmpleados] = useState([]);
  const [totalVentas, setTotalVentas] = useState([]);

  // Estado para manejar errores
  const [error, setError] = useState(null);

  // Estado para el modal de chat
  const [mostrarChatModal, setMostrarChatModal] = useState(false);

  // Cargar datos de ventas por mes y empleado
  useEffect(() => {
    cargaVentas();
    cargaVentasPorEmpleado();
  }, []);

  const cargaVentas = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/totalVentasPorMes');
      if (!response.ok) {
        throw new Error(`Error HTTP (Ventas por Mes): ${response.status}`);
      }
      const data = await response.json();
      console.log('API Response (Meses):', data);

      let ventasMesesArray = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
      if (!ventasMesesArray.length) {
        setMeses([]);
        setTotalesPorMes([]);
        setError('No hay datos de ventas por mes disponibles');
      } else {
        const hasValidMesesStructure = ventasMesesArray.every(item => item.mes != null && item.total_ventas != null);
        if (!hasValidMesesStructure) {
          throw new Error('Los datos de meses no tienen la estructura esperada (mes, total_ventas)');
        }

        const monthMap = {
          '01': 'Enero', '02': 'Febrero', '03': 'Marzo', '04': 'Abril',
          '05': 'Mayo', '06': 'Junio', '07': 'Julio', '08': 'Agosto',
          '09': 'Septiembre', '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre'
        };

        setMeses(ventasMesesArray.map(item => monthMap[item.mes] || item.mes));
        setTotalesPorMes(ventasMesesArray.map(item => Number(item.total_ventas) || 0));
      }
    } catch (error) {
      console.error('Error al cargar ventas:', error);
      setError('Error al cargar ventas: ' + error.message);
      setMeses([]);
      setTotalesPorMes([]);
    }
  };

  const cargaVentasPorEmpleado = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/totalVentasPorEmpleado');
      if (!response.ok) {
        throw new Error(`Error HTTP (Ventas por Empleado): ${response.status}`);
      }
      const data = await response.json();
      console.log('API Response (Empleados):', data);

      let ventasEmpleadosArray = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
      if (!ventasEmpleadosArray.length) {
        setEmpleados([]);
        setTotalVentas([]);
        setError(prev => prev ? `${prev}; No hay datos de ventas por empleado disponibles` : 'No hay datos de ventas por empleado disponibles');
      } else {
        const hasValidEmpleadosStructure = ventasEmpleadosArray.every(item =>
          item.primer_nombre != null && item.primer_apellido != null && item.total_ventas != null
        );
        if (!hasValidEmpleadosStructure) {
          throw new Error('Los datos de empleados no tienen la estructura esperada (primer_nombre, primer_apellido, total_ventas)');
        }

        setEmpleados(ventasEmpleadosArray.map(item =>
          `${item.primer_nombre} ${item.segundo_nombre || ''} ${item.primer_apellido}`.trim()
        ));
        setTotalVentas(ventasEmpleadosArray.map(item => Number(item.total_ventas) || 0));
      }
    } catch (error) {
      console.error('Error al cargar las ventas por empleados:', error);
      setError(prev => prev ? `${prev}; Error al cargar las ventas por empleados: ${error.message}` : 'Error al cargar las ventas por empleados: ' + error.message);
      setEmpleados([]);
      setTotalVentas([]);
    }
  };

  return (
    <Container className="mt-5">
      <h4>Estadísticas</h4>
      <Button variant="primary" onClick={() => setMostrarChatModal(true)}>
        Consultar con IA
      </Button>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="mt-4">
        <Col xs={12} md={6} lg={4} className="mb-4">
          <VentasPorMes meses={meses} totales_por_mes={totalesPorMes} />
        </Col>
        <Col xs={12} md={6} lg={4} className="mb-4">
          <VentasPorEmpleado empleados={empleados} totales_por_empleado={totalVentas} />
        </Col>
        {/* Nota: TotalComprasPorCliente no está definido en este componente, así que lo omití. Añádelo si es necesario */}
      </Row>
      <ChatIA
        mostrarChatModal={mostrarChatModal}
        setMostrarChatModal={setMostrarChatModal}
      />
    </Container>
  );
};

export default Estadisticas;