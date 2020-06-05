import React from "react";
import './Button.scss';

export default React.memo(function Button(props) {
  const mods = [];

  if (props.size) {
    mods.push(`button_size_${props.size}`)
  }

  if (props.icon) {
    mods.push('button_type_icon')
  }

  if (props.theme) {
    mods.push(`button_theme_${props.theme}`)
  }

  return (
    <button className={`button ${mods.join(' ')}`}
            {...props}>
      {
        props.icon ?
          <span className="button__icon">{props.icon}</span>
          :
          props.children
      }
    </button>
  )
})