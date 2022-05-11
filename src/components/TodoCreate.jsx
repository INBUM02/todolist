import React, { useState,useRef } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoState,useTodoDispatch,useTodoNextId} from '../TodoProvider';
import moment from 'moment';
import 'moment/locale/ko';
import Tag from './Tag'

const StyledButton = styled.button`
  background: #38d9a9;
  z-index: 5;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  position: absolute;
  padding-top:10px;
  padding-bottom:10px;
  padding-right:15px;
  padding-left:15px;
  left: 50%;
  bottom: 65px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 10%;
  border: none;
  outline: none;

`;

const CircleButton = styled.button`
  background: #38d9a9;
  z-index: 5;
  cursor: pointer;
  width: 60px;
  height: 60px;
  display:flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%,50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;


  transition: 0.125s all ease-in;
  ${props =>
    props.open &&
    css`
      background: #ff6b6b;
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 100px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  margin-top:2px;
  margin-bottom:2px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;
const TagBox=styled.div`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  box-sizing: border-box;
`;
const TagList=styled.div`
  display:flex;
  flex-wrap: wrap;
`;
const TagInput=styled.input`
  border-radius:5px;
  border:none;
  margin:5px;
  padding-right:5px;
  padding-left:5px;
  padding-top:3px;
  padding-bottom:3px;
`;
const TagButton=styled.button`
  margin:5px;
  background-color:#38d9a9;
  border:none;
  border-radius:5px;;
  padding-right:5px;
  padding-left:5px;
  padding-top:3px;
  padding-bottom:3px;
  color:white;
  font-size:5px;
`;
function TodoCreate() {
  const todos = useTodoState();

  const tagListArray=todos.map(todo=>todo.tags)
  const tagList= tagListArray.length&&tagListArray.reduce(function (aryout, aryin) {
    return [...aryout, ...aryin];
  });

  const color=useRef();
  const colorNumber=useRef(0);
  const nextId=useTodoNextId();
  const nextTagId=useRef(1);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    date:''
  });
  const { title, description,date } = inputs;
  const dispatch = useTodoDispatch();
  const onToggle = () => setOpen(!open);
  const onChange = e => {
    const { value, name } = e.target; 
    setInputs({
      ...inputs, 
      [name]: value 
    });
  }



  const onClick = e => {
    e.preventDefault(); // 새로고침 방지
    if(title){
      dispatch({
        type: 'CREATE',
        todo: {
          id:nextId.current,
          title: title,
          description:description?description:'없음',
          date:Boolean(date)?date:moment().format('YYYY-MM-DD'),
          tags:tagArray,
          done: false,
          show:true,
          createTime:moment()
        }});
        setInputs({
          title: '',
          description: '',
          date:''
        });
        setOpen(false);
        setTagArray([]);
        nextId.current+=1;
    }
  };
  const [tagArray,setTagArray]=useState([]);
  const [tagcontent,setTagcontent]=useState('');
  const same=useRef(false);
  const onTagChange=(e)=>{
    setTagcontent(e.target.value)
  };
  const onTagClick=(e)=>{
    e.preventDefault();
    if(tagcontent){
      same.current=false
      if (tagArray.map(tag => tag.content).includes(tagcontent)) {
        same.current = true
      }
      if(!same.current){
        color.current=`rgba(${255-colorNumber.current*70%255},${colorNumber.current*100%255},${colorNumber.current*3%255},0.7)`
        tagList.length?tagList.map(tag=>tag.content===tagcontent?color.current=tag.color:colorNumber.current+=1):colorNumber.current+=1;
        setTagArray([...tagArray,{id:nextTagId.current,content:tagcontent,color:color.current}]);
        setTagcontent('');
        nextTagId.current+=1
        
      }
    }
  };
  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm>
            <Input
              name="title"
              autoFocus
              placeholder="제목"
              onChange={onChange}
              value={title}
            />
            <Input
              name="description"
              placeholder="상세설명"
              onChange={onChange}
              value={description}
            />
            <Input
              name="date"
              type="date"
              onChange={onChange}
              value={Boolean(date)?date:moment().format('YYYY-MM-DD')}
            />
            <TagBox name="tag">
              <div>
                  <TagInput onChange={onTagChange} value={tagcontent}></TagInput>
                  <TagButton onClick={onTagClick}>추가</TagButton>
              </div>
              <TagList>{tagArray.map((tag)=>(<Tag key={tag.id} value={tag.content} color={tag.color}></Tag>))}</TagList>
            </TagBox>
            <StyledButton onClick={onClick}>제출</StyledButton>
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default React.memo(TodoCreate);