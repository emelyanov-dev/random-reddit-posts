import React from "react";
import './Post.scss';
import Button from "../Button";


export default function Post(props) {
  return (
    <article className="post">
      <a target="_blank"
         rel="noopener noreferrer"
         title='Открыть в новой вкладке'
         href={props.to} className="post__title">{props.title}</a>
      <div className="post__controls">
        <Button icon='delete'
                theme='blue'
                onClick={props.onRemove}
                title='Удалить'/>
        <Button icon={`${props.isLiked ? 'favorite' : 'favorite_border'}`}
                theme='red'
                onClick={props.onLike} title='Лайкнуть'/>
      </div>
    </article>
  )
}