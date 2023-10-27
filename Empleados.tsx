import React, { useEffect, useState } from "react";
import { usePosContext } from "../../context/PosProvider";
import { rfcValido } from "../../helpers/RfcValidacion";
import CustomInput from "../CustomInput/CustomInput";
import ManejodeErroresPre from "../../helpers/ManejodeErroresPre";
// import { rfcValido } from "../../helpers/RfcValidacion";


 export interface Modalprops {
  indexEditar?:number | null
  setIndexEditar?: React.Dispatch<React.SetStateAction<number | null>>
  setModalOpen?: React.Dispatch<React.SetStateAction<string>>
}
function NuevoEmpleado({indexEditar, setIndexEditar,  setModalOpen}: Modalprops) {
  const {setNuevoEmpleado, nuevoEmpleado, rolCreated} = usePosContext()
  const {formErrors, setFormErrors} = ManejodeErroresPre()
  const onCloseModal = () => {
      setFormErrors({rfc: '', rol: '', nombre: '', email: '', telefono: '', city: '', codigoPostal: '', address: ''})
  }

 const [mensaje, setMensaje] = useState('')

    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        rfc: "",
        telefono: "",
        rol : "",
        address: "",
        codigoPostal: "",
        city: ""
      })
      const handleFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
      }
const onSubmit = (e:React.FormEvent) => {
  e.preventDefault()
  const errors: { [key: string]: string } = {};

  if (formData.email === '') {
    errors.email = 'El campo Email es obligatorio';
  }
  if (formData.nombre === '') {
    errors.nombre = 'El campo Nombre es obligatorio';
  }
  if (formData.rfc === '' || rfcValido(formData.rfc, false)) {
    errors.rfc = 'Error en RFC';
  }
  if (formData.telefono === '') {
    errors.telefono = 'El campo Teléfono es obligatorio';
  }
  if (formData.address === '') {
    errors.address = 'El campo Address es obligatorio';
  }
  if (formData.codigoPostal === '') {
    errors.codigoPostal = 'El campo Codigo Postal es obligatorio';
  }
  if (formData.city === '') {
    errors.city = 'El campo City es obligatorio';
  }
 
  if (Object.keys(errors).length === 0) {
 if(indexEditar !== undefined){
    const findId = nuevoEmpleado.find((_item, i) => i === indexEditar)
    if(findId) {
      const newData = {name: formData.nombre, email: formData.email, rol: formData.rol, telefono: formData.telefono, rfc: formData.rfc, id: findId?.id || 1, 
        address: formData.address, codigoPostal: formData.codigoPostal, city: formData.city}
       const usuarioActualizado = nuevoEmpleado.map((item, index) => index === indexEditar ? {...item, ...newData} : item)
       setNuevoEmpleado(usuarioActualizado)
       setFormData({nombre: '', email:'', telefono: '', rfc: '', rol: '', codigoPostal: '', city: '', address: ''})
       setMensaje('Usuario Editado Correctamente')
       setTimeout(() => {
        setMensaje('')
      }, 2000);
    }
   return
 }
  setNuevoEmpleado(prevUser => [...prevUser, {name: formData.nombre, email: formData.email, telefono: formData.telefono, rfc: formData.rfc, rol: formData.rol, id: Date.now(), city: formData.city 
  , codigoPostal: formData.codigoPostal, address: formData.address}])
  setFormData({nombre: '', email:'', telefono: '', rfc: '', rol: '', codigoPostal: '', city: '', address: ''})
  onCloseModal()
  setMensaje('Usuario Creado Correctamente')
  setTimeout(() => {
    setMensaje('')
  }, 2000);
  }
  else {
    setFormErrors(errors);
  }
}

 useEffect(() => {
   if(indexEditar !== null){
     const findUser = nuevoEmpleado.find((_item, index) => index === indexEditar)
     setFormData({nombre: findUser?.name || '' , email: findUser?.email || '' , rol: findUser?.rol || '' , telefono: findUser?.telefono || '' , rfc: findUser?.rfc || '', 
     city: findUser?.city || '' , address: findUser?.address || '', codigoPostal: findUser?.codigoPostal || ''})
     return
   }
   setFormData({nombre: '', email:'', telefono: '', rfc: '', rol: '', codigoPostal: '', city: '', address: ''})

 }, [indexEditar, nuevoEmpleado])
 const initials = formData.nombre
 .split(' ')
 .map((word) => word[0])
 .join('')
 .toUpperCase()
 .slice(0, 2);

 const  handleCloseModal = () => {
  if (setModalOpen) {
    setModalOpen('');
  }
  
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
                  Empleados
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body" style={{ padding: '20px', maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="d-flex justify-content-center">
              { mensaje && <span className="alert alert-success text-center w-full">{mensaje}</span>}
              </div>
              <form className="nuevoProducto" onSubmit={onSubmit} >
  <div className="container">
    <div className="row">
      <div className="col-12">
      <div className="d-flex gap-2 align-items-center">
        <h3 className="title-producto">{indexEditar !== undefined ? 'Editar Empleado' : 'Nuevo Cliente'}</h3>
        <div className="circle-input">
        <div className="circle">
          <div className="initials">{initials}</div>
        </div>
        </div>
        </div>
        <p className="descripcion-producto">{indexEditar !== undefined ? 'Editar a un empleado a tu POS' : 'Agregar a un nuevo empleado a tu POS'}</p>
        <div >
        <div className="d-flex gap-2">
     
           <CustomInput 
           label='Nombre'
           name='nombre'
           value={formData.nombre}
           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, nombre: e.target.value });
            setFormErrors({ ...formErrors, nombre: '' });
          }}
          error={formErrors.nombre}
        />
          <CustomInput 
           label='Email'
           name='email'
           value={formData.email}
           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, email: e.target.value });
            setFormErrors({ ...formErrors, email: '' });
          }}
          error={formErrors.email}
        />  
  
        </div>
        <div className="d-flex gap-2 mt-4">
          <CustomInput 
           label='RFC'
           name='efc'
           value={formData.rfc}
           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, rfc: e.target.value });
            setFormErrors({ ...formErrors, rfc: '' });
          }}
          error={formErrors.rfc}
        /> 
        <div className="d-flex flex-column col-md-4">
            <label className="title-nombre mb-2">Rol:</label>
            <select className="form-select" name="rol" value={formData.rol} onChange={handleFormData}>
            <option selected>Rol del empleado</option>
            {rolCreated.map(item => (
              <option key={item.rol}>{item.rol}</option>
            ))}
            </select>
            </div>
          <CustomInput 
           label='Telefono'
           name='telefono'
           value={formData.telefono}
           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, telefono: e.target.value });
            setFormErrors({ ...formErrors, telefono: '' });
          }}
          error={formErrors.telefono}
        /> 
      
        </div>
        <div className="d-flex gap-2 mt-4">
          <CustomInput 
           label='Adress'
           name='address'
           value={formData.address}
           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, address: e.target.value });
            setFormErrors({ ...formErrors, address: '' });
          }}
          error={formErrors.address}
        />  
          <CustomInput 
           label='City'
           name='city'
           value={formData.city}
           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, city: e.target.value });
            setFormErrors({ ...formErrors, city: '' });
          }}
          error={formErrors.city}
        /> 
          <CustomInput 
           label='Codigo Postal'
           name='codigoPostal'
           value={formData.codigoPostal}
           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, codigoPostal: e.target.value });
            setFormErrors({ ...formErrors, codigoPostal: '' });
          }}
          error={formErrors.codigoPostal}
        /> 
        </div>
        </div>
        <div className="d-flex justify-content-center mt-5 ">
          <button className="btn btn-dark  button-agregar">{indexEditar !== undefined ? 'Editar Empleado' : 'Agregar Empleado'}</button>
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

export default NuevoEmpleado