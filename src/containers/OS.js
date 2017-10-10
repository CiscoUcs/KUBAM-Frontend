import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listOSes, getISOMap, makeISOImages } from '../actions'
import OSList from '../components/panels/os/'

class OS extends Component {
  componentDidMount() {
    this.props.listOSes()
    this.props.getISOMap()
  }
  /*
  clickFunc = (event, os, oss) => {
    event.preventDefault();
    // check with list of oss to see if active
    // if not make it active, if it is uncheck it. 
    for (var i = 0; i < oss.length; i ++ ) {
      if (JSON.stringify(oss[i]) === JSON.stringify(os)) {
          os.selected ? os.selected = false : os.selected = true;
          oss[i] = os
          this.props.updateOSs(oss)
          return
      }
    }
  }*/

  render() {
    return (
      <OSList error={this.props.error} isoMap={this.props.isoMap} osList={this.props.osList} makeBootFunc={this.props.makeISOImages}/>
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
  makeISOImages: () => dispatch(makeISOImages()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(OS)
