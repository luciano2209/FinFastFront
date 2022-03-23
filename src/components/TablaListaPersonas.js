import React, { useState, useEffect} from "react"
import FormularioRegistroPersona from "./FormularioRegistroPersona"
import FormularioEditarPersona from "./FormularioEditarPersona"
import ModalConfirmacion from "./ModalConfirmacion"


import axios from "axios"

const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]

export default function TablaListaPersonas() {
  const [personas, setPersonas] = useState([])
  const [abrirFormulario, setAbrirFormulario] = useState(false)
  const [abrirModalConfirmacion, setAbrirModalConfirmacion] = useState(false)
  const [abrirFormularioEditar, setAbrirFormularioEditar] = useState(false)
  const [personaSelecionada, setPersonaSelecionada] = useState([])

 

  const getPersonas = async () => {
    await axios
      .get('https://localhost:44392/api/persona')
      .then(res => {
        setPersonas(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }

  const abrirEditar = (index) => {
    setPersonaSelecionada(personas[index]);
    // console.log(personaSelecionada)
    setAbrirFormularioEditar(true)
  };

  const abrirModal = (index) => {
    setPersonaSelecionada(personas[index]);
    // console.log(personaSelecionada)
    setAbrirModalConfirmacion(true)
  };

  const formatoFecha = (fecha) => {
    const utcDate = new Date(Date.parse(fecha))
    const fechaLocal = utcDate.toLocaleString()
    return fechaLocal
  }


  useEffect(() => {
    getPersonas() 
  }, [setPersonas]);

  
  return (
    <>
    {
      abrirFormulario &&
      <FormularioRegistroPersona abrirFormulario={abrirFormulario} setAbrirFormulario={setAbrirFormulario}/>
    }
    {
      abrirFormularioEditar &&
      <FormularioEditarPersona abrirFormulario={abrirFormularioEditar} setAbrirFormularioEditar={setAbrirFormularioEditar} persona={personaSelecionada}/>
    }

    {
      abrirModalConfirmacion &&
      <ModalConfirmacion abrirModalConfirmacion={abrirModalConfirmacion} setAbrirModalConfirmacion={setAbrirModalConfirmacion} persona={personaSelecionada}/>
    }

    <div className="px-4 mt-10 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Personas</h1>
          <p className="mt-2 text-sm text-gray-700">
            Una lista de todas las personas registradas
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setAbrirFormulario(true)}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Agregar Persona
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Nombres
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Apellido Paterno
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Apellido Paterno
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Rut
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Sexo
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Fecha de nacimiento
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Region
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Ciudad
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Comuna
                    </th>
                    
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Direccion
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Telefono
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Observaciones
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {personas.map((persona, index) => (
                    <tr key={persona.id} className={index % 2 === 0 ? undefined : 'bg-gray-50'}>
                      
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{persona.nombres}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{persona.apellidoPaterno}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{persona.apellidoMaterno}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{persona.runCuerpo}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{persona.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{persona.sexoCodigo}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatoFecha(persona.fechaNacimiento)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{persona.regionCodigo}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{persona.ciudadCodigo}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{persona.comunaCodigo}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{persona.direccion}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{persona.telefono}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{persona.observaciones}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a onClick={()=>abrirEditar(index)} className="text-yellow-500 hover:text-yellow-300">
                          Editar<span className="sr-only">, </span>
                        </a>
                        
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <a onClick={()=>abrirModal(index)} className="text-red-700 hover:text-red-500">
                          Eliminar<span className="sr-only">, </span>
                        </a>
                        
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
    </>
  )
}
