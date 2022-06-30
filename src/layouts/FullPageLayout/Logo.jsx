import React from 'react'
import Logo from '../../images/SideBarLogo.svg'
import { logoStyle } from "./style"

export const LogoComponent = (props) => {
  return (
    <img
      height={130}
      width={130}
      src={Logo}
      alt={`Logo`}
      align={'middle'}
      style={logoStyle}
      className={'logo'}
    />
  )
}
