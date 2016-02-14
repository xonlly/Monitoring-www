import React, {Component} from 'react'
import {dispatch, listenner} from '../core/dispatcher'

class AlertOffline extends Component {

  render() {


    return (
      <div className="bs-component">
        <div className="alert alert-dismissible alert-danger">
          <strong>This server is offline</strong>
        </div>
      </div>
    )
  }
}

export class Server extends Component {

  constructor() {
    super(...arguments)

    this.state = {
      server: this.props.server
    }
  }

  removeServer() {
    let {server} = this.state
    dispatch('ask-socketDelete', server.os.name)
  }

  componentDidMount() {
    let {server} = this.props;
    let id = server.id

    this.circleCpu = Circles.create({
      id:                  id+'_cpu',
      radius:              60,
      value:               server.os.cpuAverage,
      maxValue:            100,
      width:               15,
      text:                function(value){return value + '%';},
      colors:              ['#9fe2fb', '#00baff'],
      duration:            400,
      wrpClass:            'circles-wrp',
      textClass:           'circles-text',
      valueStrokeClass:    'circles-valueStroke',
      maxValueStrokeClass: 'circles-maxValueStroke',
      styleWrapper:        true,
      styleText:           true
    });

    this.circleRam = Circles.create({
      id:                  id+'_ram',
      radius:              30,
      value:               server.os.mempourcent.toFixed(0),
      maxValue:            100,
      width:               7,
      text:                function(value){return value + '%';},
      colors:              ['#cbacf9', '#6a12ed'],
      duration:            1000,
      wrpClass:            'circle-ram',
      textClass:           'circles-text-ram',
      valueStrokeClass:    'circles-valueStroke',
      maxValueStrokeClass: 'circles-maxValueStroke',
      styleWrapper:        true,
      styleText:           true
    });
  }

  infos(id) {
    let id_cpu = id+'_cpu'
    let id_ram = id+'_ram'

    let {server} = this.props;
    let {os} = server;


    let totalNetwork = { up : 0, down : 0 }
    if (os.traffic) {
        for (var i in os.traffic) {
            totalNetwork.up += os.traffic[i][0];
            totalNetwork.down += os.traffic[i][1];
        }
    }

    return (
      <div>
        <div className="monitoring-left">
            <div className="circle" id={id_cpu}></div>
            <div className="circle" id={id_ram}></div>

            <div className="average">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr><td colSpan="2">Average</td></tr>
                    </thead>
                    <tbody>
                        <tr><td>{ os.loadavg[0] }</td><td> 1m</td></tr>
                        <tr><td>{ os.loadavg[1] }</td><td> 5m</td></tr>
                        <tr><td>{ os.loadavg[2] }</td><td> 15m</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="monitoring-right">
            <div>


                <div className="list-group">
                  <div className="list-group-item">
                    <div className="row-action-primary">
                      <i className="glyphicon glyphicon-folder-open"></i>
                    </div>
                    <div className="row-content">
                      <div className="least-content"></div>
                      <h4 className="list-group-item-heading">Home directory</h4>
                      <p className="list-group-item-text">{ os.homedir }</p>
                    </div>
                  </div>

                  <div className="list-group-item">
                    <div className="row-action-primary">
                      <i className="glyphicon glyphicon-transfer"></i>
                    </div>
                    <div className="row-content">
                      <div className="least-content"></div>
                      <h4 className="list-group-item-heading">Network Interfaces</h4>

                      <div className="list-group-item-text">
                          <div style={{ float: 'left' }}>
                              { Object.keys(os.networkInterfaces).map((key, index) => {
                                  return (
                                      <div key={index}>- {key}</div>
                                  )
                              }) }
                          </div>

                          <div style={{ float: 'right' }}>
                              <div><span className="label label-success"><i className="glyphicon glyphicon-arrow-up"></i> {totalNetwork.up} kb/s</span></div>
                              <div><span className="label label-primary"><i className="glyphicon glyphicon-arrow-down"></i> {totalNetwork.down} kb/s</span></div>
                          </div>
                      </div>
                    </div>
                  </div>
                  

                  <div className="list-group-item">
                    <div className="row-action-primary">
                      <i className="glyphicon glyphicon-hdd"></i>
                    </div>
                    <div className="row-content">
                      <div className="least-content"></div>
                      <h4 className="list-group-item-heading">Platform</h4>

                      <p className="list-group-item-text">{ os.platform } { os.arch }</p>
                    </div>
                  </div>
                  <div className="list-group-item">
                    <div className="row-action-primary">
                      <i className="glyphicon glyphicon-tag"></i>
                    </div>
                    <div className="row-content">
                      <div className="least-content"></div>
                      <h4 className="list-group-item-heading">Release</h4>

                      <p className="list-group-item-text">{ os.release }</p>
                    </div>
                  </div>

                </div>



            </div>
        </div>

      </div>
    )
    //  UpTime: { toHHMMSS(os.uptime) }
  }

  render() {

    let {server} = this.props;
    let id = server.id;
    let {cpuAverage, mempourcent} = server.os



    if (server.online && this.circleCpu && this.circleRam) {
      this.circleCpu.update(server.os.cpuAverage)
      this.circleRam.update(server.os.mempourcent.toFixed(0))
    }

    let classHeader = ([
      'panel',
      ...(cpuAverage > 70 || !server.online ? ['panel-danger'] : (cpuAverage > 45 ? ['panel-warning'] : ['panel-success']))
    ].join(' '))


    return (
      <div className="col-md-4">
        <div className={classHeader}>
          <div className="panel-heading">
            <h3 className="panel-title">{ server.os.name }</h3>
          </div>
          <div className="panel-body">
            { !server.online ? <AlertOffline /> : this.infos(id) }

          </div>
          <div className="panel-footer">
            <input type="button" className="btn btn-raised btn-danger" value="remove" onClick={this.removeServer.bind(this)} />
          </div>
        </div>

      </div>
    )
  }

}
