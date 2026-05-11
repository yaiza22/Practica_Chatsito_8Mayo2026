import { useEffect } from "react";
import { useState } from "react";
import {io} from "socket.io-client"

function App() {
  const [inputMessage, setInputMessage] = useState("")
  const [mensajeRecibido, setMensajeRecibido] = useState([])
  const [socket, setSocket] = useState()

  // Conexion entre server y frontend
  // El arreglo vacío indica que se va a cargar la función al momento de cargar la página
  useEffect(() => {
    // Conectar el socket
    const newSocket = io("localhost:3000")
    setSocket(newSocket)

    newSocket.on("mensaje", (msg) => {
      setMensajeRecibido(msg)
    })

    // Lo que se hace cuando se cierra sesión, desconectar el socket
    return () => { newSocket.disconnect() }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Lógica de cómo se envían los mensajes
    socket.emit("mensaje", inputMessage)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setInputMessage(e.target.value)}/>
        <button type="submit"> Enviar </button>
      </form>
      { mensajeRecibido.map(mensaje => <div>{mensaje}</div>) }
    </div>
  )
}

export default App;