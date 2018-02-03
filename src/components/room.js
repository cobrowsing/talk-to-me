import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VideoContainer from './video-container'
import { connect } from 'react-redux'
import { joinRoom, loadRoom, findPeers, initStream } from '../actions/session'
import { keys } from 'lodash'

class RoomSocket extends Component {
  componentDidMount () {
    this.props.loadRoom(this.props.roomId)
  }
  componentWillReceiveProps (nextProps) {
    console.log('this.props/nextProps', this.props, nextProps)
    // if (this.props.peers !== nextProps.peers) {
    //   this.props.initStream()
    // }
  }
  render () {
    return (
      <div />
    )
  }
}

RoomSocket.propTypes = {
  peers: PropTypes.object,
  user: PropTypes.object,
  room: PropTypes.object,
  roomId: PropTypes.string,
  joinRoom: PropTypes.func,
  loadRoom: PropTypes.func,
  findPeers: PropTypes.func,
  initStream: PropTypes.func
}

function mapStateToProps (state) {
  console.log('state', state)
  const props = {
    peers: state.session.peers,
    roomId: state.router.location.pathname.replace('/room/', '') || state.session.activeRoom.id,
    room: state.session.activeRoom,
    user: state.session.user
  }
  console.log('props', props)
  return props
}

export default connect(mapStateToProps, { joinRoom, loadRoom, findPeers, initStream })(RoomSocket)
