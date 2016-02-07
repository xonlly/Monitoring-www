import React from 'react'

export class Login extends React.Component {

  constructor() {
    super(...arguments)

    this.state = {
      port : null,
      ip : null,
      apikey: null
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('e',e)
    var ip = this.state.ip.trim();
    var port = this.state.port.trim();
    var apikey = this.state.apikey.trim();
    if (!ip || !port || !apikey) {
      return;
    }


    console.log('ip', ip, port, apikey)
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

  render() {
    return (
      <nav className="navbar navbar-monitoring ">
        <div className="container-fluid">
          <form className="navbar-form row" role="search" onSubmit={this.handleSubmit.bind(this)}>

              <div className="form-group col-md-3 label-floating is-empty">
                <label htmlFor="form-ip" className="control-label">IP</label>
                <input type="text" name="ip" onChange={this.changeIp.bind(this)} className="form-control" id="form-ip" />
              <span className="material-input"></span></div>

              <div className="form-group col-md-3 label-floating is-empty">
                <label htmlFor="form-port" className="control-label">Port</label>
                <input type="number" name="port" onChange={this.changePort.bind(this)} className="form-control" id="form-port" />
              <span className="material-input"></span></div>

            <div className="form-group col-md-3 label-floating is-empty">
                <label htmlFor="form-apiKey" className="control-label">API Key</label>
                <input type="text"  name="apikey" onChange={this.changeApi.bind(this)}className="form-control" id="form-apiKey" />
              <span className="material-input"></span></div>

            <div className="col-md-3">
              <button type="submit" className="btn btn-raised btn-info">Submit</button>
            </div>
          </form>
        </div>
      </nav>
    );
  }

}
