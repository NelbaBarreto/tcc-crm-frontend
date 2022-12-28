import React from "react";
import { Titulo1 } from "../formulario/Titulo";

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

const CSAT = () => {
  return (
    <div className="section w-full m-auto">
        <Titulo1>
          Encuesta de Satisfacción
        </Titulo1>
      <div className="columns">
        <div className="column">
          <Card titulo="¿Cómo calificarías el servicio brindado?">
            <div className="control">
              <label className="radio">
                <input type="radio" name="answer1" className="mr-1" />
                1
              </label>
              <label className="radio">
                <input type="radio" name="answer1" className="mr-1" />
                2
              </label>
              <label className="radio">
                <input type="radio" name="answer1" className="mr-1" />
                3
              </label>
              <label className="radio">
                <input type="radio" name="answer1" className="mr-1" />
                4
              </label>
              <label className="radio">
                <input type="radio" name="answer1" className="mr-1" />
                5
              </label>
            </div>
          </Card>
        </div>
        <div className="column">
          <Card titulo="¿Cómo calificarías al asesor que te atendió?">
            <div className="control">
              <label className="radio">
                <input type="radio" name="answer2" className="mr-1" />
                1
              </label>
              <label className="radio">
                <input type="radio" name="answer2" className="mr-1" />
                2
              </label>
              <label className="radio">
                <input type="radio" name="answer2" className="mr-1" />
                3
              </label>
              <label className="radio">
                <input type="radio" name="answer2" className="mr-1" />
                4
              </label>
              <label className="radio">
                <input type="radio" name="answer2" className="mr-1" />
                5
              </label>
            </div>
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
                <input type="radio" name="answer4" className="mr-1"/>
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
    </div>
  )
}

export default CSAT;