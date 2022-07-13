const { createServer } = require("http")
const { Server } = require("socket.io")
const Client = require("socket.io-client")

describe("socket testing", () => {
    let io, serverSocket, clientSocket

    beforeAll((done) => {
        const httpServer = createServer()
        io = new Server(httpServer)
        httpServer.listen(() => {
          const port = httpServer.address().port
          clientSocket = new Client(`http://localhost:${port}`)
          io.on("connection", (socket) => {
            serverSocket = socket
          })
          clientSocket.on("connect", done)
        })
      })
    
      afterAll(() => {
        io.close()
        clientSocket.close()
      })

      test("message", (done) => {
        clientSocket.on("message", (arg) => {
            expect(arg.message).toBe("hello?")
            done()
        })
        serverSocket.emit("message", {message:"hello?"})
      })
})