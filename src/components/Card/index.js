import React from "react";
import './Card.scss';

export function Card({children}) {
  return (
    <div className="card">
      {children}
    </div>
  )
}

export function CardHeader({children}) {
  return (
    <div className="card__header">
      {children}
    </div>
  )
}

export function CardTitle({title}) {
  return (
    <div className='card__left'>
      <h4 className="card__title">{title}</h4>
    </div>
  )
}

export function CardControls({children}) {
  return (
    <div className="card__controls">
      {children}
    </div>
  )
}
