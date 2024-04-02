// import React, { useState, useEffect } from 'react'
// import SockJS from 'sockjs-client'
// import Stomp from 'stompjs'

// const WebSocketComponent = () => {
//   const [stompClient, setStompClient] = useState(null)
//   const [connected, setConnected] = useState(false)

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       checkConnection()
//     }, 1000)

//     // Kiểm tra kết nối ngay khi component được render
//     checkConnection()

//     // Xóa bỏ interval khi component unmount
//     return () => clearInterval(intervalId)
//   }, [])

//   const checkConnection = () => {
//     const socket = new SockJS('http://localhost:7001/ws') // Địa chỉ của WebSocket server
//     const client = Stomp.over(socket)
//     client.connect({}, () => {
//       setStompClient(client)
//       setConnected(true)
//       console.log('Connected to WebSocket server')
//     }, error => {
//       console.error('Failed to connect to WebSocket server:', error)
//       setConnected(false)
//     })
//   }

//   const disconnectWebSocket = () => {
//     if (stompClient) {
//       stompClient.disconnect()
//       setConnected(false)
//       console.log('Disconnected from WebSocket server')
//     }
//   }


//   return (
//     <div>
//       <h1>WebSocket Component</h1>
//       {connected ? (
//         <p>Status: Connected</p>
//       ) : (
//         <p>Status: Disconnected</p>
//       )}
//     </div>
//   )
// }

// export default WebSocketComponent
