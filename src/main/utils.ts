// const net = require('net');

import net from "net"

export const getRandomPort = async () => {
  let port = 0
  const server = net.createServer()
  return new Promise((resolve, reject) => {
    try {
      server.on("listening", () => {
        const address = server.address()
        const freePort = typeof address !== "string" && address?.port
        server.close(() => {
          port = freePort || 0
          resolve(port)
        })
      })
      server.listen(0)
    } catch (error) {
      reject(error)
    }
  })
}
