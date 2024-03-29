import React, { useState, useEffect } from "react";
import { Card, Button } from "./Componentes";
import { Titulo1 } from "../formulario/Titulo";
import { useQuery } from "react-query";
import { getPreguntas, validarToken, enviarEncuesta } from "../../api/encuesta";
import { TextArea } from "../formulario/Componentes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { Guardar } from "../formulario/Acciones";
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
    return <FontAwesomeIcon className="text-orange-400 text-4xl" icon={myIcons["face-frown"]} />
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
  const [decodedData, setDecodedData] = useState({});
  const [action, setAction] = useState({ surveySent: false, saving: false });
  const { token } = useParams();

  const handleRespuesta = (pregunta_id, valor, campo = "valor") => {
    let updatedArray = respuestas.map(a => { return { ...a } })
    updatedArray.find(a => a.pregunta_id === pregunta_id)[`${campo}`] = valor;
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

  const getDecodedData = async () => {
    const data = await validarToken({ token });
    setDecodedData(data);
  }

  useEffect(() => {
    getDecodedData();
  }, []);

  const enviar = async e => {
    e.preventDefault();
    setAction({ saving: true });
    try {
      await enviarEncuesta({
        oportunidad_id: decodedData.oportunidad_id,
        contacto_id: decodedData.contacto_id,
        respuestas: respuestas
      });
      setAction({ saving: false, surveySent: true });
    } catch (error) {
      console.error(error);
    };
  };

  if (action.surveySent) {
    return (
      <div className="mt-7">
        <div className="text-center">
          <img src="/sonriendo.png" className="m-auto" style={{ width: "60px" }} alt="" />
          <h1 className="title is-4 mb-1">¡Gracias por darnos tu opinión!</h1>
          <div className="mb-8">Mejoramos con tus experiencias</div>
        </div>
      </div>
    )
  } else if (decodedData.valid || isLoading) {
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
                          value={respuestas.find(respuesta => respuesta.pregunta_id === pregunta.pregunta_id)?.valor_texto || ""}
                          onChange={e => handleRespuesta(pregunta.pregunta_id, e?.target.value, "valor_texto")}
                        />
                      }
                    </Card>
                  </div>
                </div>
              )
            })}
            <Guardar
              saving={action.saving}
              disabled={respuestas.some(respuesta => respuesta.obligatorio && !respuesta.valor)}
              guardar={enviar}
              label="Enviar Encuesta"
            />
          </div>

        }
      </div>
    )
  } else {
    return (
      <div className="text-center mt-8">
        <img src="/broken-link.png" className="w-14 m-auto" alt="" />
        <h1 className="title is-4 mb-1">{decodedData.message}</h1>
      </div>
    );
  }
}

export default CSAT;