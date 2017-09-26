import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listOSes } from '../actions'
import OSList from '../components/panels/os/'

class OS extends Component {
  componentDidMount() {
    this.props.listOSes()
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
      <OSList osList={this.props.osList} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  osList: state.os.osList
})

const mapDispatchToProps = (dispatch)  => ({
  listOSes: () => dispatch(listOSes()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(OS)
