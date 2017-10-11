import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listOSes, getISOMap, updateISOMap, makeISOImages } from '../actions'
import OSList from '../components/panels/os/'
import OSModal from '../components/panels/os/modal'
import DelModal from '../components/panels/os/delModal'
import Error from '../components/Error'

class OS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iso : "",
      os: "",
    }
    this.isoSelect = this.isoSelect.bind(this)
    this.isoOsSelect = this.isoOsSelect.bind(this)
    this.isoOsDelete = this.isoOsDelete.bind(this)
    this.isoMapSelect = this.isoMapSelect.bind(this)
    this.modalClose = this.modalClose.bind(this)
  }
  componentDidMount() {
    this.props.listOSes()
    this.props.getISOMap()
  }
  isoSelect = (event, iso) => {
    this.setState({
      iso: iso, 
      os: "",
    })
    
  }
  
  isoOsSelect = (event) => {
    var os = document.getElementById("isoMap").value
    var newMap = this.props.isoMap;
    newMap.push({"os" : os, "file" : "/kubam/" + this.state.iso})
    this.props.updateISOMap(newMap) 
    this.setState({ iso : "", os : ""})
  }

  isoOsDelete = (event) => {
    var newMap = this.props.isoMap;
    newMap = newMap.filter( (i) => (i.os !== this.state.os && i.file !== this.state.iso))
    this.props.updateISOMap(newMap) 
    this.setState({ iso : "", os : ""})
    //newMap.push({"os" : os, "file" : "/kubam/" + this.state.iso})
  }

  modalClose = (event) => {
    this.setState({
      iso: "",
      os: "",
    })
  
  }

  // when an existing iso/os map  is selected.
  isoMapSelect = (event, iso) => {
    this.setState({
      iso: iso.file,
      os: iso.os 
    })
    //const m = document.getElementById("delModal")
  }

  render() {
    return (
    <div>
      <Error error={this.props.error} />
      <OSList error={this.props.error} isoMap={this.props.isoMap} isoMapSelect={this.isoMapSelect} makeBootFunc={this.props.makeISOImages} />
      <OSModal selectedISO={this.state.iso} osList={this.props.osList} isoSelect={this.isoSelect} isoOsSelect={this.isoOsSelect} modalClose={this.modalClose} />
      <DelModal selectedOS={this.state.os} selectedISO={this.state.iso} isoOsDelete={this.isoOsDelete} modalClose={this.modalClose} />
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  osList: state.os.osList,
  isoMap: state.os.isoMap,
  error: state.os.error
})

const mapDispatchToProps = (dispatch)  => ({
  listOSes: () => dispatch(listOSes()),
  getISOMap: () => dispatch(getISOMap()),
  updateISOMap: (isoMap) => dispatch(updateISOMap(isoMap)),
  makeISOImages: () => dispatch(makeISOImages()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(OS)
