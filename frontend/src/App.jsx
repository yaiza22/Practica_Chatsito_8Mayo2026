import { useEffect } from "react";
import { useState } from "react";
import {io} from "socket.io-client"
import "./App.css";

function App() {
  const [inputMessage, setInputMessage] = useState("")
  const [mensajeRecibido, setMensajeRecibido] = useState([])
  const [socket, setSocket] = useState()
  const [user, setUser] = useState("")

  // Conexion entre server y frontend
  // El arreglo vacío indica que se va a cargar la función al momento de cargar la página
  useEffect(() => {
    // Conectar el socket
    //const newSocket = io("http://10.30.9.17:3000")
    const newSocket = io("localhost:3000")
    setSocket(newSocket)

    newSocket.on("mensaje", (msg) => {
      setMensajeRecibido(msg)
    })

    setUser(prompt("Ingrese su nombre: ") || "X")

    // Lo que se hace cuando se cierra sesión, desconectar el socket
    return () => { newSocket.disconnect() }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Lógica de cómo se envían los mensajes
    socket.emit("mensaje", {user, inputMessage, fecha: new Date().toLocaleTimeString('es-CO')})
    setInputMessage("");
  };

  return (
    <div className="chat-contendedor">
      
      <div className="chat-titulo">
        <h2>Chatsito privado</h2>
        <div className="usuario-sesion">Sesión: {user}</div>
      </div>

      <div className="area-mensajes">        
        {mensajeRecibido.map((msg, idx) => (
          <div key={idx} className={`mensaje ${msg.user === user ? "mi-mensaje" : "otro-mensaje"}`}>
            <div className="mensaje-usuario">
              <strong>{msg.user}</strong>
              <span className="timestamp">{msg.fecha}</span>
            </div>
            <div className="mensaje-texto">{msg.inputMessage}</div>
          </div>
        ))}

        { mensajeRecibido.length === 0 && (
          <div className="chat-vacio"> No hay mensajes aún. ¡Escribe el primero! :3 </div>
        )}
      </div>

      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          autoFocus
        />
        <button type="submit">Enviar</button>
      </form>
    </div>

  )
}

export default App;