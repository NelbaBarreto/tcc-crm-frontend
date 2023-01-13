import React, { useState, useEffect } from "react";
import { Card, Button } from "./Componentes";
import { Titulo1 } from "../formulario/Titulo";
import { useQuery } from "react-query";
import { getPreguntas } from "../../api/encuesta";
import { classNameButton2, TextArea } from "../formulario/Componentes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import {
  faFaceAngry, faFaceFrown, faFaceMeh, faFaceSmileBeam, faFaceLaughBeam
} from "@fortawesome/free-solid-svg-icons";


const Icon = ({ valor }) => {
  const myIcons = {
    "face-angry": faFaceAngry,
    "face-frown": faFaceFrown,
    "face-meh": faFaceMeh,
    "face-smile-beam": faFaceSmileBeam,
    "face-laugh-beam": faFaceLaughBeam
  }

  if (valor === 1) {
    return <FontAwesomeIcon className="text-red-400 text-4xl" icon={myIcons["face-angry"]} />
  } else if (valor === 2) {
    return <FontAwesomeIcon className="text-orange-400 text-4xl" icon={myIcons["face-angry"]} />
  } else if (valor === 3) {
    return <FontAwesomeIcon className="text-yellow-400 text-4xl" icon={myIcons["face-meh"]} />
  } else if (valor === 4) {
    return <FontAwesomeIcon className="text-lime-400 text-4xl" icon={myIcons["face-smile-beam"]} />
  } else {
    return <FontAwesomeIcon className="text-green-400 text-4xl" icon={myIcons["face-laugh-beam"]} />
  }
  ;
};

const CSAT = () => {
  const [respuestas, setRespuestas] = useState([]);

  const handleRespuesta = (pregunta_id, valor) => {
    let updatedArray = respuestas.map(a => { return { ...a } })
    updatedArray.find(a => a.pregunta_id === pregunta_id).valor = valor;
    setRespuestas(updatedArray);
  }

  const {
    data: preguntas,
    isLoading
  } = useQuery(["preguntas"], getPreguntas);

  useEffect(() => {
    const valorInicialRespuestas = preguntas?.map((pregunta) =>
    ({
      pregunta_id: pregunta.pregunta_id, valor: null,
      obligatorio: pregunta.obligatorio
    })) || [];
    setRespuestas(valorInicialRespuestas);
  }, [preguntas]);

  return (
    <div className="bg-deep-purple-50 w-full h-full min-h-screen">
      {isLoading ?
        <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> :
        <div className="section lg:w-9/12 md:w-full sm:w-full m-auto">
          <Titulo1>
            Encuesta de Satisfacción
          </Titulo1>
          {preguntas.map((pregunta, idx) => {
            return (
              <div className="columns" key={idx}>
                <div className="column">
                  <Card titulo={`${pregunta.pregunta}${pregunta.obligatorio ? ' *' : ''}`}>
                    {pregunta.opciones.length ?
                      <div
                        className="grid sm:grid-rows-5 sm:grid-cols-1 md:grid-cols-5 md:grid-rows-1"
                      >
                        {pregunta.opciones.map((opcion, idx) => {
                          return (
                            <Button
                              key={idx}
                              index={pregunta.pregunta_id}
                              Icon={() => <Icon valor={opcion.valor} />}
                              label={opcion.etiqueta}
                              onClick={handleRespuesta}
                              valor={opcion.valor}
                              activo={respuestas.find(respuesta => respuesta?.pregunta_id === pregunta?.pregunta_id)?.valor === opcion.valor ? true : false}
                            />
                          )
                        })}
                      </div>
                      :
                      <TextArea
                        label=""
                        name={`respuesta_${pregunta.pregunta_id}`}
                        value={respuestas.find(respuesta => respuesta.pregunta_id === pregunta.pregunta_id)?.valor || ""}
                        onChange={e => handleRespuesta(pregunta.pregunta_id, e?.target.value)}
                      />
                    }
                  </Card>
                </div>
              </div>
            )
          })}
          <button
            className={classNameButton2}
            disabled={respuestas.some(respuesta => respuesta.obligatorio && !respuesta.valor)}
          >
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

      }
    </div>
  )
}

export default CSAT;