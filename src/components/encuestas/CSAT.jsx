import React from "react";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Titulo1 } from "../formulario/Titulo";
import { classNameButton2 } from "../formulario/Componentes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({ titulo, children }) => {
  return (
    <div className="card h-full">
      <header className="card-header">
        <p className="card-header-title">
          {titulo}
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  )
}

const Score = () => {
  return (
    <div className="grid grid-cols-5">
      <button className="flex flex-col p-2 justify-between m-1 bg-gray-50 rounded-md hover:border hover:border-gray-300 hover:bg-gray-200">
        <span className="text-center">
          <FontAwesomeIcon className="text-red-400 text-4xl" icon={solid("face-angry")} />
        </span>
        <span className="text-sm font-semibold mt-2  text-center">Muy Insatisfecho</span>
      </button>
      <button className="flex flex-col p-2 justify-between m-1 bg-gray-50 rounded-md hover:border hover:border-gray-300 hover:bg-gray-200">
        <span className=" text-center">
          <FontAwesomeIcon className="text-orange-400 text-4xl cursor-pointer" icon={solid("face-frown")} />
        </span>
        <span className="text-sm font-semibold mt-2  text-center">Insatisfecho</span>
      </button>
      <button className="flex flex-col p-2 justify-between m-1 bg-gray-50 rounded-md hover:border hover:border-gray-300 hover:bg-gray-200">
        <span className=" text-center">
          <FontAwesomeIcon className="text-yellow-400 text-4xl cursor-pointer" icon={solid("face-meh")} />
        </span>
        <span className="text-sm font-semibold mt-2 text-center">Neutral</span>
      </button>
      <button className="flex flex-col p-2 justify-between m-1 bg-gray-50 rounded-md hover:border hover:border-gray-300 hover:bg-gray-200">
        <span className=" text-center">
          <FontAwesomeIcon className="text-lime-400 text-4xl cursor-pointer" icon={solid("face-smile-beam")} />
        </span>
        <span className="text-sm font-semibold mt-2 text-center">Satisfecho</span>
      </button>
      <button className="flex flex-col p-2 justify-between m-1 bg-gray-50 rounded-md hover:border hover:border-gray-300 hover:bg-gray-200">
        <span className=" text-center">
          <FontAwesomeIcon className="text-green-400 text-4xl cursor-pointer" icon={solid("face-laugh-beam")} />
        </span>
        <span className="text-sm font-semibold mt-2  text-center">Muy Satisfecho</span>
      </button>
    </div>
  )
}

const CSAT = () => {
  return (
    <div className="section w-9/12 m-auto">
      <Titulo1>
        Encuesta de Satisfacción
      </Titulo1>
      <div className="columns">
        <div className="column">
          <Card titulo="En general, ¿cuál es su grado de satisfacción con su interacción más reciente con nuestra empresa?">
            <Score />
          </Card>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Card titulo="Según su interacción más reciente con nuestra empresa, ¿cuál es la probabilidad de que vuelva a comprar nuestros servicios?">
            <Score />
          </Card>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Card titulo="¿Cómo calificarías la experiencia de compra?">
            <div className="control">
              <label className="radio">
                <input type="radio" name="answer3" className="mr-1" />
                1
              </label>
              <label className="radio">
                <input type="radio" name="answer3" className="mr-1" />
                2
              </label>
              <label className="radio">
                <input type="radio" name="answer3" className="mr-1" />
                3
              </label>
              <label className="radio">
                <input type="radio" name="answer3" className="mr-1" />
                4
              </label>
              <label className="radio">
                <input type="radio" name="answer3" className="mr-1" />
                5
              </label>
            </div>
          </Card>
        </div>
        <div className="column">
          <Card titulo="¿Cómo te enteraste del servicio?">
            <div className="control">
              <label className="radio">
                <input type="radio" name="answer4" className="mr-1" />
                Facebook
              </label>
              <label className="radio">
                <input type="radio" name="answer4" className="mr-1" />
                Instagram
              </label>
              <label className="radio">
                <input type="radio" name="answer4" className="mr-1" />
                Web
              </label>
              <label className="radio">
                <input type="radio" name="answer4" className="mr-1" />
                Un amigo
              </label>
              <label className="radio">
                <input type="radio" name="answer4" className="mr-1" />
                Soy Cliente
              </label>
            </div>
          </Card>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Card titulo="¿Volverías a adquirir el servicio nuevamente?">
            <div className="control">
              <label className="radio">
                <input type="radio" name="answer5" value="si" className="mr-1" />
                Sí
              </label>
              <label className="radio">
                <input type="radio" name="answer5" value="no" className="mr-1" />
                No
              </label>
            </div>
          </Card>
        </div>
        <div className="column">
          <Card titulo="¿Desde cuándo es cliente?">
            <form className="form">
              <div className="control">
                <label className="radio">
                  <input type="radio" name="answer6" className="mr-1" />
                  Primera compra
                </label>
                <label className="radio">
                  <input type="radio" name="answer6" className="mr-1" />
                  Menos de un año
                </label>
                <label className="radio">
                  <input type="radio" name="answer6" className="mr-1" />
                  Entre 1 - 2 años
                </label>
                <label className="radio">
                  <input type="radio" name="answer6" className="mr-1" />
                  Entre 2 - 4 años
                </label>
              </div>
            </form>
          </Card>
        </div>
      </div>
      <button className={classNameButton2}>
        Enviar Encuesta
      </button>
      <div className="mt-7">
        <div className="text-center">
          <img src="/sonriendo.png" className="m-auto" style={{ width: "60px" }} alt="" />
          <h1 className="title is-4 mb-1">¡Gracias por darnos tu opinión!</h1>
          <div className="mb-8">Mejoramos con tus experiencias</div>
        </div>
      </div>
    </div>
  )
}

export default CSAT;