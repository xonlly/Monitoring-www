import React from 'react'
import {dispatch, listenner} from '../core/dispatcher'

export class Server extends React.Component {

  render() {

    let {server} = this.props;

    return (
      <div className="col-md-3">
        <div className="material-block">
          { server.os.name }
        </div>
      </div>
    )
  }

}
