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
      width:               10,
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
      width:               10,
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

    return (
      <div>
        <div className="circle" id={id_cpu}></div>
        <div className="circle" id={id_ram}></div>
        <div style={ { display : 'inline-block', verticalAlign : 'top' }}>
            Average:
            { os.loadavg[0] } 1m<br />
            { os.loadavg[0] } 5m<br />
            { os.loadavg[0] } 15m<br />

            HomeDir: { os.homedir }<br />
            Network Interfaces: - { Object.keys(os.networkInterfaces).join('-') }<br />

            Arch: { os.arch }<br />
            Platform:  { os.platform }<br />
            Release:  { os.release }<br />


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
      <div className="col-md-3">
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
