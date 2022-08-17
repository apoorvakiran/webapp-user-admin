import React from 'react'
import Logo from '../../images/Rivian_logo.svg'
import { logoStyle } from "./style"

export const LogoComponent = (props) => {
  return (
    <img
      src={Logo}
      alt={`Logo`}
      align={'middle'}
      style={logoStyle}
      className={'companyLogo'}
    />
  )
}
