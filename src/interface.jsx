
import {Login} from './elements/login.jsx'
import {Server} from './elements/server.jsx'

import React from 'react'
import {listenner} from './core/dispatcher'

export class Interface extends React.Component {

  constructor() {
    super(...arguments)

    this.state = {
      servers : {}
    }

    listenner('ask-socketUpdate', (data) => {
      this.setState({
        servers : data.servers
      })
    })

    listenner('ask-socketDisconnect', () => {
      this.setState({
        servers : {}
      })
    })
  }

  render() {
    let {servers} = this.state;

    return (
      <div>
        <Login />
        <div>
          { Object.keys(servers).map((k, i) => {
            return <Server key={servers[k].id} server={servers[k]} />
          }) }
        </div>
      </div>
    );
  }

}
