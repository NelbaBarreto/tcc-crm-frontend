import React, { useState } from "react";
import { Card, Button } from "./Componentes";
import { Titulo1 } from "../formulario/Titulo";
import { classNameButton2, TextArea } from "../formulario/Componentes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceAngry, faFaceFrown, faFaceMeh, faFaceSmileBeam, faFaceLaughBeam
} from "@fortawesome/free-solid-svg-icons";


const Icon = ({ iconName, iconStyle }) => {
  return <FontAwesomeIcon className={iconStyle} icon={myIcons[iconName]} />;
};

const myIcons = {
  "face-angry": faFaceAngry,
  "face-frown": faFaceFrown,
  "face-meh": faFaceMeh,
  "face-smile-beam": faFaceSmileBeam,
  "face-laugh-beam": faFaceLaughBeam
}


const CSAT = () => {
  const [respuestas, setRespuestas] = useState({ respuesta_1: "", respuesta_2: "", respuesta_3: "", respuesta_4: ""});

  const handleRespuesta = (name, value) => {
    setRespuestas({ ...respuestas, [name]: value });
  }

  return (
    <div className="section lg:w-9/12 md:w-full sm:w-full m-auto">
      <Titulo1>
        Encuesta de Satisfacción
      </Titulo1>
      <div className="columns">
        <div className="column">
          <Card titulo="En general, ¿cuál es tu grado de satisfacción con tu interacción más reciente con nuestra empresa? *">
            <div className="grid sm:grid-rows-5 sm:grid-cols-1 md:grid-cols-5 md:grid-rows-1">
              <Button
                Icon={() => <Icon iconStyle="text-red-400 text-4xl" iconName="face-angry" />}
                onClick={handleRespuesta}
                nombre="respuesta_1"
                valor={1}
                label="Muy Insatisfecho"
                activo={respuestas.respuesta_1 === 1}
              />
              <Button
                Icon={() => <Icon iconStyle="text-orange-400 text-4xl" iconName="face-frown" />}
                onClick={handleRespuesta}
                nombre="respuesta_1"
                valor={2}
                label="Insatisfecho"
                activo={respuestas.respuesta_1 === 2}
              />
              <Button
                Icon={() => <Icon iconStyle="text-yellow-400 text-4xl" iconName="face-meh" />}
                onClick={handleRespuesta}
                nombre="respuesta_1"
                valor={3}
                label="Neutral"
                activo={respuestas.respuesta_1 === 3}
              />
              <Button
                Icon={() => <Icon iconStyle="text-lime-400 text-4xl" iconName="face-smile-beam" />}
                onClick={handleRespuesta}
                nombre="respuesta_1"
                valor={4}
                label="Satisfecho"
                activo={respuestas.respuesta_1 === 4}
              />
              <Button
                Icon={() => <Icon iconStyle="text-green-400 text-4xl" iconName="face-laugh-beam" />}
                onClick={handleRespuesta}
                nombre="respuesta_1"
                valor={5}
                label="Muy Satisfecho"
                activo={respuestas.respuesta_1 === 5}
              />
            </div>
          </Card>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Card titulo="Según tu interacción más reciente con nuestra empresa, ¿cuál es la probabilidad de que vuelvas a comprar nuestros servicios? *">
            <div className="grid sm:grid-rows-5 sm:grid-cols-1 md:grid-cols-5 md:grid-rows-1">
              <Button
                Icon={() => <Icon iconStyle="text-red-400 text-4xl" iconName="face-angry" />}
                onClick={handleRespuesta}
                nombre="respuesta_2"
                valor={1}
                label="Nada Probable"
                activo={respuestas.respuesta_2 === 1}
              />
              <Button
                Icon={() => <Icon iconStyle="text-orange-400 text-4xl" iconName="face-frown" />}
                onClick={handleRespuesta}
                nombre="respuesta_2"
                valor={2}
                label="Poco Probable"
                activo={respuestas.respuesta_2 === 2}
              />
              <Button
                Icon={() => <Icon iconStyle="text-yellow-400 text-4xl" iconName="face-meh" />}
                onClick={handleRespuesta}
                nombre="respuesta_2"
                valor={3}
                label="Neutral"
                activo={respuestas.respuesta_2 === 3}
              />
              <Button
                Icon={() => <Icon iconStyle="text-lime-400 text-4xl" iconName="face-smile-beam" />}
                onClick={handleRespuesta}
                nombre="respuesta_2"
                valor={4}
                label="Probable"
                activo={respuestas.respuesta_2 === 4}
              />
              <Button
                Icon={() => <Icon iconStyle="text-green-400 text-4xl" iconName="face-laugh-beam" />}
                onClick={handleRespuesta}
                nombre="respuesta_2"
                valor={5}
                label="Muy Probable"
                activo={respuestas.respuesta_2 === 5}
              />
            </div>
          </Card>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Card titulo="Según tu interacción más reciente con nuestra empresa, ¿recomendarías nuestros servicios a un amigo o familiar? *">
          <div className="grid sm:grid-rows-5 sm:grid-cols-1 md:grid-cols-5 md:grid-rows-1">
              <Button
                Icon={() => <Icon iconStyle="text-red-400 text-4xl" iconName="face-angry" />}
                label="Definitivamente No"
                onClick={handleRespuesta}
                nombre="respuesta_3"
                valor={1}
                activo={respuestas.respuesta_3 === 1}
              />
              <Button
                Icon={() => <Icon iconStyle="text-orange-400 text-4xl" iconName="face-frown" />}
                label="Probablemente No"
                onClick={handleRespuesta}
                nombre="respuesta_3"
                valor={2}
                activo={respuestas.respuesta_3 === 2}
              />
              <Button
                Icon={() => <Icon iconStyle="text-yellow-400 text-4xl" iconName="face-meh" />}
                label="No Estoy Seguro"
                onClick={handleRespuesta}
                nombre="respuesta_3"
                valor={3}
                activo={respuestas.respuesta_3=== 3}
              />
              <Button
                Icon={() => <Icon iconStyle="text-lime-400 text-4xl" iconName="face-smile-beam" />}
                label="Probablemente"
                onClick={handleRespuesta}
                nombre="respuesta_3"
                valor={4}
                activo={respuestas.respuesta_3 === 4}
              />
              <Button
                Icon={() => <Icon iconStyle="text-green-400 text-4xl" iconName="face-laugh-beam" />}
                label="Definitivamente"
                onClick={handleRespuesta}
                nombre="respuesta_3"
                valor={5}
                activo={respuestas.respuesta_3 === 5}
              />
            </div>
          </Card>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Card titulo="¿Tenés algún comentario o sugerencia para nosotros?">
            <TextArea
              label=""
              name="respuesta_4"
              value={respuestas.respuesta_4}
              onChange={e => handleRespuesta(e?.target.name, e?.target.value)}
            />
          </Card>
        </div>
      </div>
      <button 
        className={classNameButton2}
        disabled={!respuestas.respuesta_1 || !respuestas.respuesta_2 || !respuestas.respuesta_3}
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
  )
}

export default CSAT;