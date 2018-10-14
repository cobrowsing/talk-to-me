import React from 'react'
import config from '../../config'
import './index.css'

const APP_VERSION = process.env.APP_VERSION

const Footer = () => (
  <footer className='footer'>
    Copyright © PR {`${new Date().getFullYear()}. `} 
    {`${APP_VERSION ? `v${APP_VERSION}. ` : ''}`}
    Made with 💛
    <br />
    <a href={config.bugUrl}>Report an issue. </a>
    <a href={config.contactUrl}>Contact creator</a>
  </footer>
)

Footer.propTypes = {}

export default Footer
