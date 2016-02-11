import {listenner, dispatch} from './dispatcher';
import socketIo from 'socket.io-client'

export class Socket {
  constructor() {
      this.listen()
  }

  connect(data) {

    const {ip, port, apikey} = data;

    if (window.socket) { window.socket.disconnect(); }
    window.socket = socketIo('http://'+ip+':'+port);

    window.socket.on('connect', function(){
      window.socket.emit('auth', apikey);
    });


    socket.on('isAuth', function (r) {
      if (r.success) {
        dispatch('ask-socketSuccess', r)
        socket.emit('room', 'client')
      } else {
        dispatch('ask-socketFail', r)
      }
    });

    socket.on('update', function(data){
      dispatch('ask-socketUpdate', data)
    })

    socket.on('disconnect', function(){
      dispatch('ask-socketDisconnect')
    });

  }

  disconnect() {
    window.socket.disconnect()
  }

  deleteServer(name) {
    socket.emit('delete', name)
  }

  listen() {
      listenner('ask-connect', this.connect)
      listenner('ask-disconnect', this.disconnect)
      listenner('ask-socketDelete', this.deleteServer)
  }
}
