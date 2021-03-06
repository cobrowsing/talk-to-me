import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InviteWrapper from '../../ui-components/invite-code/invite-wrapper'
import Emoji from '../../ui-components/emoji'
import Head from '../../ui-components/head'
import { goToUrl } from '../../utils/window'
import { isAuthValid } from '../../redux/selectors/auth'
import { connect } from 'react-redux'
import { injectGlobal } from 'styled-components'
import { getThemeCSS } from '../../utils/theme'
import analytics from '../../third-party/google/analytics'
import sentry from '../../third-party/sentry'
import './index.css'

const themeCSS = getThemeCSS()
// eslint-disable-next-line
injectGlobal`
body {
  ${themeCSS.body}
  color: white;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  color: white;
  text-decoration: underline;
}

.sc-user-input a {
  color: black !important;
}

.sc-launcher {
  background-color: ${themeCSS.primaryColor} !important;
}
.sc-header {
  background: ${themeCSS.primaryColor} !important;
}
.sc-header--close-button:hover {
  background: ${themeCSS.primaryColor} !important;
}
.sc-message--text {
  background-color: ${themeCSS.primaryColor} !important;
}
.sc-message--content.received .sc-message--text {
  color: white !important;
  background-color: ${themeCSS.primaryColor} !important;
}
.btn-primary:hover {
  background-color: ${themeCSS.primaryColor};
  border-color: ${themeCSS.primaryColor};
}
.room-notice {
  color: ${themeCSS.primaryColor};
}
`
class Home extends Component {
  componentWillMount () {
    // load third-party services
    analytics()
    sentry()
    // Check auth
    if (this.props.isAuthValid) {
      goToUrl('/welcome')
    }
  }

  render () {
    return (
      <div className='home'>
        <Head />
        <div className='splash'>
          <h2>Group chat made super simple <Emoji emoji={'🎉'} label='tada' /></h2> 
          <h4 className='home-sub-header'>Tired of using Zoom? Hate call drops? Try me instead.</h4>
          <br />
          <InviteWrapper />
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  isAuthValid: PropTypes.bool
}

function mapStateToProps (state) {
  return ({
    isAuthValid: isAuthValid(state) || false
  })
}

export default connect(mapStateToProps, {})(Home)
