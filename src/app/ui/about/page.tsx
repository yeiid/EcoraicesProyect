import Image from "next/image";
// import paisaje from "/public/paisaje.jpg" 

export default function About() { 
  return (
    <>
<section className="  rounded-md p-4 ">
  <div className="bg-gray-200 p-4 rounded-md mb-4">
  <h2 className="text-2xl font-bold mb-2">EcoRaices</h2>
    <div className="img">
      <Image 
      src="/ceiba.jpg"
      alt=""
      width={1000}
      height={1000}
      // quality={75} 
      />
    </div>
    
    <p className="text-lg">
      Bienvenidos a EcoRaices, la plataforma que busca
      geolocalizar y documentar las especies arbóreas presentes en las
      zonas urbanas de los municipios guajiros. Nuestra iniciativa
      surge de la necesidad de conocer mejor la biodiversidad local y
      contribuir a su conservación y manejo sostenible. La tecnología
        es nuestra herramienta y la comunidad nuestra fuerza para
        alcanzar nuestros objetivos.
    </p>
  </div>

  <div className="bg-gray-200 p-4 rounded-md mb-4">
    <h2 className="text-2xl font-bold mb-2">¿Qué es EcoRaices?</h2>
    <p className="text-lg">
      EcoRaices es una iniciativa desarrollada por  Yeifran Hernandez,
        comprometidos con la protección del medio ambiente y el uso de
        la tecnología para el bien común. Nuestro objetivo es
        geolocalizar y documentar las especies arbóreas presentes en las
        zonas urbanas de los municipios guajiros, para que la comunidad
        pueda conocer mejor la biodiversidad local y contribuir a su
        conservación y manejo sostenible.
    </p>
    <p className="text-lg">
      Además, EcoRaices es una plataforma que promueve la
        participación ciudadana en la conservación del medio ambiente.
        Todos podemos ser parte de este proyecto, aportando información
        sobre las especies arbóreas que encontramos en nuestras ciudades
        y compartiendo nuestras experiencias y conocimientos.
    </p>
  </div>

  <div className="bg-gray-200 p-4 rounded-md mb-4">
    <h2 className="text-2xl font-bold mb-2">¿Cómo funciona EcoRaices?</h2>
    <p className="text-lg">
      EcoRaices funciona a través de una aplicación web que
        permite a los usuarios registrar la ubicación y características
        de las especies arbóreas que encuentran en sus zonas urbanas.
        Para ello, hemos desarrollado un formulario sencillo que puede
        ser llenado en cualquier dispositivo con acceso a internet. La
        información registrada es procesada y almacenada en una base de
        datos georreferenciada, que permite visualizar la ubicación de
        cada especie en un mapa interactivo.
    </p>
    <p className="text-lg">
      Además, en EcoRaices contamos con un equipo de expertos que
        valida la información registrada por los usuarios y la
        complementa con datos adicionales sobre cada especie arbórea. De
        esta manera, podemos ofrecer una información confiable y
        completa sobre la biodiversidad urbana de los municipios
        guajiros.
    </p>
  </div>

  <div className="bg-gray-200 p-4 rounded-md mb-4">
    <h2 className="text-2xl font-bold mb-2">¿Por qué es importante EcoRaices?</h2>
    <p className="text-lg">
      EcoRaices es importante porque nos permite conocer mejor la
        biodiversidad urbana de los municipios guajiros y contribuir a
        su conservación y manejo sostenible. Las especies arbóreas
        presentes en las zonas urbanas son fundamentales para la calidad
        de vida de las personas, ya que nos brindan múltiples servicios
        ecosistémicos, como la regulación del clima, la protección del
        suelo y el agua, la mejora de la salud y el bienestar, entre
        otros.
    </p>
    <p className="text-lg">
      Además, EcoRaices es una plataforma que promueve la
        participación ciudadana en la conservación del medio ambiente y
        la educación ambiental. A través de nuestra iniciativa, los
        ciudadanos pueden conocer mejor la biodiversidad local, aprender
        sobre los beneficios de los árboles y los ecosistemas urbanos, y
        tomar acciones concretas para mejorar su entorno.
    </p>
  </div>
</section>

    </>
  );
}
