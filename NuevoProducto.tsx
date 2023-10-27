import { useEffect, useState } from "react";
import './nuevoproducto.css'
import { fileUpload } from "../../helpers/fileUpload";
import { usePosContext } from "../../context/PosProvider";


export interface ModalPropsNuevo {
  indexEditar?: number
  setModalOpen?: React.Dispatch<React.SetStateAction<string>>
}
  
const NuevoProducto = ({indexEditar, setModalOpen}: ModalPropsNuevo) => {
      const {setCrearNewProducto, crearNewProducto, categoriaCreated} = usePosContext()
  const [formData, setFormData] = useState({
    producto: "",
    codigoDeBarra: "",
    unidadDeMedida: "",
    precio: "",
    cantidad : "",
    impuestos: ""
  })
  const [upload, setUpload] = useState<null | string>(null)
  

  const handleFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setUpload(e.target.files[0]);
  };


    const onSubmit = async(e: React.FormEvent) => {
      e.preventDefault()
    const imgUploadNew = await fileUpload(upload)
    if(indexEditar !== undefined){
      const findId = crearNewProducto.find((item, i) => i === indexEditar)
       const newData = {name: formData.producto, precio: formData.precio, quantity: formData.cantidad, id:findId?.id, img:imgUploadNew, codigoDeBarra: formData.codigoDeBarra, identify: 'hola'}
       const usuarioActualizado = crearNewProducto.map((item, index) => index === indexEditar ? {...item, ...newData} : item)
       if(usuarioActualizado)
       setCrearNewProducto(usuarioActualizado)
       setFormData({ producto: "",codigoDeBarra: "",unidadDeMedida: "",precio: "",cantidad : "",
     impuestos: ""})
     return
   }
      setCrearNewProducto(prevProduct => [...prevProduct, {name: formData.producto, precio: formData.precio, quantity: formData.cantidad, id:Date.now(), img:imgUploadNew, codigoDeBarra: formData.codigoDeBarra, identify: 'hola'}])
      setFormData({ producto: "",codigoDeBarra: "",unidadDeMedida: "",precio: "",cantidad : "",
     impuestos: ""})
     
     }
         
     
useEffect(() => {
 if(indexEditar !== undefined) {
  const findCrearNewProduct = crearNewProducto.find((item, index) => index === indexEditar)
  if(findCrearNewProduct)
  setFormData({producto: findCrearNewProduct?.name, precio: findCrearNewProduct?.precio, cantidad: findCrearNewProduct?.quantity, codigoDeBarra: findCrearNewProduct?.codigoDeBarra, unidadDeMedida: '', impuestos: ''})
  setUpload(findCrearNewProduct?.img)
   return
 }
 setFormData({ producto: "",codigoDeBarra: "",unidadDeMedida: "",precio: "",cantidad : "",
 impuestos: ""})
 setUpload('')
}, [indexEditar])

const  handleCloseModal = () => {
  if(setModalOpen)
  setModalOpen('')
  }
  return (
    <>
      <div
           className="modal fade show d-flex justify-content-center align-items-center"
           style={{
             position: 'fixed',
             top: 0,
             left: 0,
             right: 0,
             width: '100%',
             height: '100%',
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
             backgroundColor: 'rgba(0, 0, 0, 0.5)',
             zIndex: 9999,
           }}
        >
          <div className="modal-dialog d-flex justify-content-center align-items-center " style={{width: '100%'}}>
            <div className="modal-content "     style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      backgroundColor: "white",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
      borderRadius: "5px",
      overflow: "hidden",
    }}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Clientes
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body" style={{ padding: '20px', maxHeight: '70vh', overflowY: 'auto' }}>
              <form className="nuevoProducto" onSubmit={onSubmit} >
  <div className="container">
    <div className="row">
      <div className="col-12">
        <h3 className="title-producto">Nuevo Producto</h3>
        <p className="descripcion-producto">Crear un nuevo producto para tu POS</p>
        <div >
        <div className="d-flex gap-2">
          <div className="d-flex flex-column  col-md-6">
            <label className="title-nombre mb-2">Nombre:</label>
            <input
  className="form-control w-full"
  name="producto"  // Set the name to match the corresponding field in your state
  value={formData.producto}  // Set the value from the state
  onChange={handleFormData}  // Set the onChange handler to update the state
/>          </div>
          <div className="d-flex flex-column col-md-6">
            <label className="title-nombre mb-2">Codigo de Barra:</label>
            <input
  className="form-control w-full"
  name="codigoDeBarra"
  value={formData.codigoDeBarra}
  onChange={handleFormData}
/>          </div>
        </div>
        <div className="d-flex gap-2 mt-4">
          <div className="d-flex flex-column  col-md-4">
            <label className="title-nombre mb-2">Precio:</label>
            <input
  className="form-control w-full"
  name="precio"
  value={formData.precio}
  onChange={handleFormData}
/>          </div>
          <div className="d-flex flex-column col-md-4">
            <label className="title-nombre mb-2">Cantidad:</label>
            <input
  className="form-control w-full"
  name="cantidad"
  value={formData.cantidad}
  onChange={handleFormData}
/>          </div>
          <div className="d-flex flex-column col-md-4">
            <label className="title-nombre mb-2">Impuestos:</label>
            <input
  className="form-control w-full"
  name="impuestos"
  value={formData.impuestos}
  onChange={handleFormData}
/>          </div>
        </div>
        <div className="d-flex gap-2 mt-4">
          <div className="d-flex flex-column  col-md-4">
            <label className="title-nombre mb-2">Unida de Medida:</label>
            <input
  className="form-control w-full"
  name="unidadDeMedida"
  value={formData.unidadDeMedida}
  onChange={handleFormData}
/>          </div>
          <div className="d-flex flex-column col-md-4">
            <label className="title-nombre mb-2">Categoria:</label>
            <select className="form-control w-full">
              <option value=''>Elegir Categoria</option>
              <option value=''>Pendiente</option>
              {categoriaCreated.map(item => (
                <option key={item.nombreCategoria}>{item.nombreCategoria}</option>
              ))}
            </select>
          </div>
          <div className="d-flex flex-column col-md-4">
            <label className="title-nombre mb-2">Imagen:</label>
            <input className="form-control w-full"type="file"  onChange={handleFileInputChange} placeholder="Agregar Imagen"/>
          </div>
        </div>
        </div>
        <div className="d-flex justify-content-center mt-5 ">
          <button className="btn btn-dark  button-agregar">Crear Producto</button>
        </div>
      </div>
    </div>
  </div>
</form>
              </div>
            </div>
          </div>
        </div>
  
    </>
  )
}

export default NuevoProducto