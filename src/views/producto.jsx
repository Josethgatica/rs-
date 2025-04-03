// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaProducto from '../components/producto/InicioProductos'; // Importa el componente de tabla
import ModalRegistroProducto from '../components/producto/ModalRegistroProducto';
import { Container, Button  } from "react-bootstrap";

// Declaración del componente Categorias
const Productos = () => {
  // Estados para manejar los datos, carga y errores
  const [listaProducto, setListaProducto] = useState([]); // Almacena los datos de la API
  const [listaCategorias, setListaCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: '',
    descripcion_producto: '',
    id_categoria: '',
    precio_unitario: '',
    stock: '',
    imagen: ''
  });


  const obtenerProductos = async () => { // Método renombrado a español
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos');
      if (!respuesta.ok) {
        throw new Error('Error al cargar las categorías');
      }
      const datos = await respuesta.json();
      setListaProducto(datos);    // Actualiza el estado con los datos
      setCargando(false);           // Indica que la carga terminó
    } catch (error) {
      setErrorCarga(error.message); // Guarda el mensaje de error
      setCargando(false);           // Termina la carga aunque haya error
    }
  };

// Obtener categorías para el dropdown
const obtenerCategorias = async () => {
  try {
    const respuesta = await fetch('http://localhost:3000/api/categorias');
    if (!respuesta.ok) throw new Error('Error al cargar las categorías');
    const datos = await respuesta.json();
    setListaCategorias(datos);
  } catch (error) {
    setErrorCarga(error.message);
  }
};


  

  // Lógica de obtención de datos con useEffect
  useEffect(() => {
    obtenerProductos();            // Ejecuta la función al montar el componente
    obtenerCategorias
  }, []);                           // Array vacío para que solo se ejecute una vez

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  



  
  const agregarProducto = async () => {
    if (!nuevoProducto.nombre_producto || !nuevoProducto.id_categoria || 
        !nuevoProducto.precio_unitario || !nuevoProducto.stock) {
      setErrorCarga("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarproducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el producto');

      await obtenerProductos();
      setNuevoProducto({
        nombre_producto: '',
        descripcion_producto: '',
        id_categoria: '',
        precio_unitario: '',
        stock: '',
        imagen: ''
      });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };




  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Productos</h4>
        <Button variant="primary" onClick={() => setMostrarModal(true)}>
        Nuevo Producto
      </Button>
      <br/><br/>

        {/* Pasa los estados como props al componente TablaProductos */}
        <TablaProducto
          productos={listaProducto} 
          cargando={cargando} 
          error={errorCarga} 
        />


<ModalRegistroProducto
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoProducto={nuevoProducto}
        manejarCambioInput={manejarCambioInput}
        agregarProducto={agregarProducto}
        errorCarga={errorCarga}
        categorias={listaCategorias}
      />
      </Container>
    </>
  );
};






// Exportación del componente
export default Productos;