import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, FormControl, Button, OverlayTrigger, Popover } from 'react-bootstrap'
import './index.css'

export default class JoinOrCreateRoom extends Component {
  constructor (props) {
    super(props)
    this.onInviteCodeChanged = this.onInviteCodeChanged.bind(this)
    this.validate = this.validate.bind(this)
    this.state = {
      inviteCode: null
    }
  }
  validate () {
    if (this.props.error) return 'error'
    return 'success'
  }
  onInviteCodeChanged (event) {
    event.preventDefault()
    this.setState({
      inviteCode: event.target.value
    })
  }
  render () {
    return (
      <div>
        <Form inline>
          <FormGroup
            controlId='invite-id'
            onChange={this.onInviteCodeChanged}
          >
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement='top'
              overlay={(
                <Popover
                  id='invite-code-popover-error'
                  title='Info'
                >
                  <div className={this.props.error ? 'error' : ''}>
                    {this.props.error || 'Please enter your invite code'}
                  </div>
                </Popover>
                )}
            >
              <FormControl
                type='text'
                bsSize='large'
                className={this.props.error ? 'error' : ''}
                size={32}
                placeholder='Enter your invite code'
              />
            </OverlayTrigger>
          </FormGroup>{' '}
          <Button
            type='submit'
            bsStyle='warning'
            bsSize='large'
            onClick={event => {
              event.preventDefault()
              if (this.state.inviteCode) {
                this.props.onAuthenticate(this.state.inviteCode)
              }
            }}>
            Go
          </Button>
        </Form>
        <br />
        <div>
          Don't have one? <Button bsSize='large' bsStyle='link' href='#'>Request an invite</Button>
        </div>
      </div>
    )
  }
}

JoinOrCreateRoom.propTypes = {
  code: PropTypes.string,
  error: PropTypes.string,
  onAuthenticate: PropTypes.func
}