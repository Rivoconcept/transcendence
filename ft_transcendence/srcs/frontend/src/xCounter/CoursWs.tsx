import { useEffect, useState, type ChangeEvent } from "react";
import { div } from "three/tsl";

import { io } from "socket.io-client"

const socket = io("http://localhost:3000")

socket.on("message", (msg) => console.log(msg))



export default function CoursWs() {

    const [message, setMessage] = useState("");

    const handleSubmit = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      e.preventDefault()

      console.log(`envooi du message: ${message}`)
      socket.emit("message", message)

      setMessage('')
    }

  return (
    <>
      <div className="mb-3">
        <h1 className="text-2xl text-primary">Hello les gens !</h1>
        <form method="post" onSubmit={handleSubmit}>
          <label htmlFor="message">Message</label>
          <input  
            type="text" 
            id="message" 
            className="form-control" 
            name="message" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
          <button type="submit" className="btn btn-primary mt-4">Envoyer</button>
        </form>
      </div>

    </>
  );
}
