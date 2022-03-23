import React from "react"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import selectInput from './../utils/selectForm.json'
import axios from "axios"
import { toast } from 'react-toastify'



export default function FormularioEditarPersona({abrirFormularioEditar,setAbrirFormularioEditar,persona}) {
  const {
      id,
      runCuerpo,
      runDigito,
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      email,
      sexoCodigo,
      fechaNacimiento,
      regionCodigo,
      ciudadCodigo,
      comunaCodigo,
      direccion,
      telefono,
      observaciones
  } = persona
  const codSexo = sexoCodigo.toString();
  const codRegion = regionCodigo.toString();
  const codCiudad = ciudadCodigo.toString();
  const codComuna = comunaCodigo.toString();

  
  const formik = useFormik({
    initialValues: {
      run: `${runCuerpo}-${runDigito}`,
      nombres: nombres,
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      email: email,
      sexoCodigo: codSexo,
      fechaNacimiento: fechaNacimiento,
      regionCodigo: codRegion,
      ciudadCodigo: codCiudad,
      comunaCodigo: codComuna,
      direccion: direccion,
      telefono: telefono,
      observaciones: observaciones
    },
    validationSchema: Yup.object({
      run: Yup.string().required("run obligatorio"),
      nombres: Yup.string().required("nombres obligatorio"),
      apellidoPaterno: Yup.string().required("apellido paterno obligatorio"),
      apellidoMaterno: Yup.string().required("apellido materno obligatoria"),
      email: Yup.string().required("email obligatorio"),
      sexoCodigo: Yup.string().required("sexo obligatorio"),
      fechaNacimiento: Yup.string().required("fecha de nacimiento obligatorio"),
      regionCodigo: Yup.string().required("region obligatorio"),
      ciudadCodigo: Yup.string().required("ciudad obligatorio"),
      comunaCodigo: Yup.string().required("comuna obligatorio"),
      direccion: Yup.string().required("direccion obligatorio"),
      telefono: Yup.number().required("telefono obligatorio"),
      observaciones: Yup.string().required("observaciones obligatorio"),
    }),
    onSubmit: async (formValue) => {
      try {
        const nuevoUsuario = formValue;
        nuevoUsuario.sexoCodigo=parseInt(nuevoUsuario.sexoCodigo)
        nuevoUsuario.regionCodigo=parseInt(nuevoUsuario.regionCodigo)
        nuevoUsuario.ciudadCodigo=parseInt(nuevoUsuario.ciudadCodigo)
        nuevoUsuario.comunaCodigo=parseInt(nuevoUsuario.comunaCodigo)

        const splitRun = nuevoUsuario.run.split("-");
        console.log(splitRun)

        const _nuevoUsuario = {
          ...nuevoUsuario,
          runCuerpo:splitRun[0],
          runDigito:splitRun[1]

        }
        _nuevoUsuario.runCuerpo=parseInt(_nuevoUsuario.runCuerpo)
        delete _nuevoUsuario.run
        console.log(_nuevoUsuario)  
        await axios
          .put('https://localhost:44392/api/persona',_nuevoUsuario)
          .then(res => {
            
          })
          .catch(err => {
            // toast.error(err)
            console.log(err)
          })

        toast.success('Persona registrado correctamente')
        setAbrirFormularioEditar(false)
        
      }catch(error){
        toast.error(error)
        console.log(error)
      }
    }
  })

  return (
    <form className="mx-10 mt-5 space-y-8 divide-y divide-gray-200" onSubmit={formik.handleSubmit}>
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Formularuo para editar Personas</h3>
          </div> 
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="run" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                R.U.N
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="run"
                  id="run"
                  onChange={formik.handleChange}
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
                <p className='text-red-700'>{formik.errors.run}</p>
              </div>
            </div>

            

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="nombres" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Nombres
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  // value={nombres}
                  type="text"
                  name="nombres"
                  id="nombres"
                  onChange={formik.handleChange}
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
                <p className='text-red-700'>{formik.errors.nombres}</p>

              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="apellidoPaterno" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Apellido Paterno
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  
                  type="text"
                  name="apellidoPaterno"
                  id="apellidoPaterno"
                  onChange={formik.handleChange}
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
                <p className='text-red-700'>{formik.errors.apellidoPaterno}</p>

              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="apellidoMaterno" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Apellido Materno
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  
                  type="text"
                  name="apellidoMaterno"
                  id="apellidoMaterno"
                  onChange={formik.handleChange}
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
                <p className='text-red-700'>{formik.errors.apellidoMaterno}</p>

              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Email
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                 
                  id="text"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
                <p className='text-red-700'>{formik.errors.email}</p>

              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="sexoCodigo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Sexo
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                 
                  id="sexoCodigo"
                  name="sexoCodigo"
                  onChange={formik.handleChange}  
                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Sexo</option>  
                  {
                    selectInput[3].map((r, index) => {                     
                      return <option key={index} value={r.Codigo}>{r.Nombre}</option>                
                    })
                  }
                </select>
                <p className='text-red-700'>{formik.errors.sexoCodigo}</p>

              </div>
            </div>


            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Fecha de nacimiento
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  
                  type="date"
                  name="fechaNacimiento"
                  id="fechaNacimiento"
                  onChange={formik.handleChange}
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
                <p className='text-red-700'>{formik.errors.fechaNacimiento}</p>

              </div>
            </div>



            

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="regionCodigo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Region
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                 
                  id="regionCodigo"
                  name="regionCodigo"
                  onChange={formik.handleChange}
                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Region</option>                

                  {
                    selectInput[0].map(r => {                     
                      return <option key={r.nombre}value={r.codigo}>{r.nombre}</option>                
                    })
                  }
                  
                </select>
                <p className='text-red-700'>{formik.errors.regionCodigo}</p>

              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="ciudadCodigo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Ciudad
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
               
                  id="ciudadCodigo"
                  name="ciudadCodigo"
                  onChange={formik.handleChange}
                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Ciudad</option>                
                  {
                    selectInput[1].map((r, index) => {                     
                      return <option key={index}value={r.codigo}>{r.nombre}</option>                
                    })
                  }
                  
                </select>
                <p className='text-red-700'>{formik.errors.ciudadCodigo}</p>

              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="comunaCodigo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Comuna
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                
                  id="comunaCodigo"
                  name="comunaCodigo"
                  onChange={formik.handleChange}
                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"

                >
                  <option value="">Comuna</option>                

                  {
                    selectInput[2].map((r, index) => {                     
                      return <option key={index}value={r.Codigo}>{r.Nombre}</option>               
                    })
                  }
                </select>
                <p className='text-red-700'>{formik.errors.comunaCodigo}</p>

              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Direccion
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
              

                  type="text"
                  name="direccion"
                  id="direccion"
                  onChange={formik.handleChange}
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
                <p className='text-red-700'>{formik.errors.direccion}</p>

              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Telefono
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
          

                  type="number"
                  name="telefono"
                  id="telefono"
                  onChange={formik.handleChange}
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
                <p className='text-red-700'>{formik.errors.telefono}</p>

              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Observaciones
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
           
                  type="text"
                  name="observaciones"
                  id="observaciones"
                  onChange={formik.handleChange}
                  className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
                <p className='text-red-700'>{formik.errors.observaciones}</p>

              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            onClick={()=> setAbrirFormularioEditar(false)}
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Editar
          </button>
        </div>
      </div>
    </form>
  )
}
