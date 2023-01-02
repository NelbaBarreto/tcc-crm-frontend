import React from "react";
import { Card, Button } from "./Componentes";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
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
  return (
    <div className="section lg:w-9/12 md:w-full sm:w-full m-auto">
      <Titulo1>
        Encuesta de Satisfacción
      </Titulo1>
      <div className="columns">
        <div className="column">
          <Card titulo="En general, ¿cuál es tu grado de satisfacción con tu interacción más reciente con nuestra empresa?">
            <div className="grid sm:grid-rows-5 sm:grid-cols-1 md:grid-cols-5 md:grid-rows-1">
              <Button
                name="respuesta_1"
                Icon={() => <Icon iconStyle="text-red-400 text-4xl" iconName="face-angry" />}
                label="Muy Insatisfecho"
              />
              <Button
                name="respuesta_1"
                Icon={() => <Icon iconStyle="text-orange-400 text-4xl" iconName="face-frown" />}
                label="Insatisfecho"
              />
              <Button
                name="respuesta_1"
                Icon={() => <Icon iconStyle="text-yellow-400 text-4xl" iconName="face-meh" />}
                label="Neutral"
              />
              <Button
                name="respuesta_1"
                Icon={() => <Icon iconStyle="text-lime-400 text-4xl" iconName="face-smile-beam" />}
                label="Satisfecho"
              />
              <Button
                name="respuesta_1"
                Icon={() => <Icon iconStyle="text-green-400 text-4xl" iconName="face-laugh-beam" />}
                label="Muy Satisfecho"
              />
            </div>
          </Card>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Card titulo="Según tu interacción más reciente con nuestra empresa, ¿cuál es la probabilidad de que vuelvas a comprar nuestros servicios?">
            <div className="grid sm:grid-rows-5 sm:grid-cols-1 md:grid-cols-5 md:grid-rows-1">
              <Button
                name="respuesta_2"
                Icon={() => <Icon iconStyle="text-red-400 text-4xl" iconName="face-angry" />}
                label="Nada Probable"
              />
              <Button
                name="respuesta_2"
                Icon={() => <Icon iconStyle="text-orange-400 text-4xl" iconName="face-frown" />}
                label="Poco Probable"
              />
              <Button
                name="respuesta_2"
                Icon={() => <Icon iconStyle="text-yellow-400 text-4xl" iconName="face-meh" />}
                label="Neutral"
              />
              <Button
                name="respuesta_2"
                Icon={() => <Icon iconStyle="text-lime-400 text-4xl" iconName="face-smile-beam" />}
                label="Probable"
              />
              <Button
                name="respuesta_2"
                Icon={() => <Icon iconStyle="text-green-400 text-4xl" iconName="face-laugh-beam" />}
                label="Muy Probable"
              />
            </div>
          </Card>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Card titulo="Según tu interacción más reciente con nuestra empresa, ¿recomendarías nuestros servicios a un amigo o familiar?">
          <div className="grid sm:grid-rows-5 sm:grid-cols-1 md:grid-cols-5 md:grid-rows-1">
              <Button
                name="respuesta_3"
                Icon={() => <Icon iconStyle="text-red-400 text-4xl" iconName="face-angry" />}
                label="Definitivamente No"
              />
              <Button
                name="respuesta_3"
                Icon={() => <Icon iconStyle="text-orange-400 text-4xl" iconName="face-frown" />}
                label="Probablemente No"
              />
              <Button
                name="respuesta_3"
                Icon={() => <Icon iconStyle="text-yellow-400 text-4xl" iconName="face-meh" />}
                label="No Estoy Seguro"
              />
              <Button
                name="respuesta_3"
                Icon={() => <Icon iconStyle="text-lime-400 text-4xl" iconName="face-smile-beam" />}
                label="Probablemente"
              />
              <Button
                name="respuesta_3"
                Icon={() => <Icon iconStyle="text-green-400 text-4xl" iconName="face-laugh-beam" />}
                label="Definitivamente"
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
            />
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