import React from 'react'
import {dispatch, listenner} from '../core/dispatcher'

export class Login extends React.Component {

  constructor() {
    super(...arguments)

    this.state = {
      port : 8156,
      ip : '',
      apikey: '456DAde486qD684de6',
      connected: false,
    }

    this.listen()
  }

  listen() {
    listenner('ask-socketSuccess', this.onSuccess.bind(this))
    listenner('ask-socketDisconnect', this.onDisconnect.bind(this))
  }

  onSuccess() {
    this.setState({
      connected : true
    })
  }

  onDisconnect() {
    this.setState({
      connected : false
    })
  }

  disconnect() {
    dispatch('ask-disconnect')
  }

  handleSubmit(e) {
    e.preventDefault();

    var ip = this.state.ip.trim();
    var port = this.state.port;
    var apikey = this.state.apikey.trim();
    if (!ip || !port || !apikey) {
      return;
    }

    dispatch('ask-connect', { ip : ip, port : port, apikey : apikey })


    // this.setState({author: '', text: ''});
  }

  changeIp(e) {
    this.setState({ip: e.target.value});
  }

  changePort(e) {
    this.setState({port: e.target.value});
  }
  changeApi(e) {
    this.setState({apikey: e.target.value});
  }

  componentDidMount() {
    $.material.checkbox()
  }

  render() {
    return (
      <nav className="navbar navbar-monitoring ">
        <div className="container-fluid">
          <form className="navbar-form row" role="search" onSubmit={this.handleSubmit.bind(this)}>

              <div className="form-group col-md-3 label-floating ">
                <label htmlFor="form-ip" className="control-label">IP</label>
                <input type="text" name="ip" defaultValue={this.state.ip} onChange={this.changeIp.bind(this)} className="form-control" id="form-ip" />
              <span className="material-input"></span></div>

              <div className="form-group col-md-3 label-floating ">
                <label htmlFor="form-port" className="control-label">Port</label>
                <input type="number" name="port" defaultValue={this.state.port} onChange={this.changePort.bind(this)} className="form-control" id="form-port" />
              <span className="material-input"></span></div>

            <div className="form-group col-md-3 label-floating ">
                <label htmlFor="form-apiKey" className="control-label">API Key</label>
                <input type="text"  name="apikey" defaultValue={this.state.apikey} onChange={this.changeApi.bind(this)} className="form-control" id="form-apiKey" />
              <span className="material-input"></span></div>

            <div className="col-md-3">
              <div className="checkbox">
                    <label><input type="checkbox" value="l" />  </label>
                </div>
              <button type="submit" disabled={this.state.connected} className="btn btn-raised btn-info">Submit</button>
              <button type="submit" disabled={!this.state.connected} onClick={this.disconnect.bind(this)} className="btn btn-raised btn-danger">Disconnect</button>
            </div>
          </form>
        </div>
      </nav>
    );
  }

}
