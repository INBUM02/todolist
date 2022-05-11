import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete} from 'react-icons/md';
import {FiAlertCircle} from 'react-icons/fi';
import {useTodoDispatch } from '../TodoProvider';
import moment from 'moment';
import 'moment/locale/ko';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  opacity: 0.5;
  margin-left:30px;
  &:hover {
    color: red;
  }
`;
const TodoItemBlockWrap=styled.div`
  display:none;
  ${props =>
    props.show &&
    css`
      display:block;
    `}
`;
const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  &:hover {
    ${Remove} {
      opacity: 1;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;
const ItemBar=styled.div`
  display:flex;
`;

const Text = styled.div`
  flex: 1;
  font-size: 15px;
  color: #495057;
  ${props =>
    props.done &&
    css`
      opacity:0.5;
    `}
`;
const FinishDate=styled.div`
  font-size:10px;
  position:absolute;
  right:96px;
  line-height:19px;
`;
const Discription=styled.div`
  font-size:10px;
  text-indent:5px;
`;
const Line=styled.div`
  width:100%;
  border: solid 0.5px #e9ecef;
  margin-top:5px;
  margin-bottom:10px;
`;
const TagBox=styled.div`
  font-size:10px;
  margin:5px;
  padding:4px;
  background-color:white;
  border:1px solid #EEEEEE;
  border-radius:20px;
`;
const TagBoxWrap=styled.div`
  display:flex;
  flex-wrap: wrap;
  margin-top:5px;
`
const Emergency=styled.div`
  margin-left:5px;
  display:none;
  .emergency{
    color:red;
  }
  ${props =>
    (props.date.split('-')[0]===moment().format('YYYY-MM-DD').split('-')[0]&&props.date.split('-')[1]===moment().format('YYYY-MM-DD').split('-')[1]&&props.date.split('-')[2]-moment().format('YYYY-MM-DD').split('-')[2]<3)&&
    css`
      display:block;
    `
    }
`;
const Title=styled.div`
  left:30px;
  margin-left:10px;
`;

function TodoItem({ id, done, show, date,title,description,tags }) {
  const dispatch = useTodoDispatch();
  const onToggle = () => dispatch({ type: 'TOGGLE', id });
  const onRemove = () => dispatch({ type: 'REMOVE', id });
  return (
    <>
      <TodoItemBlockWrap show={show}>
        <TodoItemBlock>
          <CheckCircle done={done} onClick={onToggle}>
            {done && <MdDone />}
          </CheckCircle>
          <Text done={done}><ItemBar><Emergency date={date}><FiAlertCircle className='emergency'></FiAlertCircle></Emergency><Title>제목 : {title}</Title><FinishDate>마감기한 {date}</FinishDate></ItemBar><Line></Line><Discription>{description}</Discription><TagBoxWrap>{tags.map((tag)=><TagBox key={tag.id} style={{color:tag.color}}>#{tag.content}</TagBox>)}</TagBoxWrap></Text>
          <Remove onClick={onRemove}>
            <MdDelete />
          </Remove>
        </TodoItemBlock>
        <Line></Line>
      </TodoItemBlockWrap>
    </>
  );
}

export default React.memo(TodoItem);