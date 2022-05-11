import React from 'react'
import styled,{css} from 'styled-components';

const TagBox=styled.div`
  margin:5px;
  padding:8px;
  background-color:white;
  border:1px solid #EEEEEE;
  border-radius:20px;
  ${props =>
    props.color &&
    css`
      color:${props.color};
    `}
`;


function Tag(props) {

  const content=props.value
  const color=props.color

  return (
    <TagBox color={color}>#{content}</TagBox>
  )
}

export default Tag
