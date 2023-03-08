import React, {useState, useEffect} from 'react';
import './App.css';
import Card from './Components/Card/Card';
import Moveable from "react-moveable";
import { flushSync } from "react-dom";

function App() {
const [data, setData] = useState([])
const [target, setTarget] = useState();
const [frame, setFrame] = useState({
  translate: [0,0],
  rotate: 0,
  transformOrigin: "50% 50%"
});
 
//delete components
const removeItem = (id) =>{ 
  setData(data.filter(ele => ele.id !== id))
}
 
//request API
const request = async () =>  {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos")
  const data = await res.json().finally()
  //delete from the array and only give it 2 items
  setData(data.slice(1,3))
   
}

useEffect(()=>{ 
  request()
  setTarget(document.querySelector(".target"));
}, [])
 
  return (
    <div className='container' id='parent'>
    { 
      data.length === 0 
      ? <p>Not Items....</p>
      : data.map(ele => <Card key={ele.id} element={ele} del={removeItem}/>)
    }  
    <Moveable flushSync={flushSync}
            target={document.querySelector(".target")}
            pinchable={true}
            pinchOutside={true}
            checkInput={true}
            draggable={true}
            resizable={true}
            keepRatio={false}
            throttleResize={1}
            renderDirections={["nw","n","ne","w","e","sw","s","se"]}
            originDraggable={true}
            originRelative={true}
            throttleDrag={0}
            edge={false}
            zoom={1}
            origin={true}
            padding={{"left":0,"top":0,"right":0,"bottom":0}}
            onResizeStart={e => {
                e.setOrigin(["%", "%"]);
                e.dragStart && e.dragStart.set(frame.translate);
            }}
            onResize={e => {
                const beforeTranslate = e.drag.beforeTranslate;
                frame.translate = beforeTranslate;
                e.target.style.width = `${e.width}px`;
                e.target.style.height = `${e.height}px`;
                e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
            }}
            onDragOriginStart={e => {
                e.dragStart && e.dragStart.set(frame.translate);
            }}
            onDragOrigin={e => {
                frame.translate = e.drag.beforeTranslate;
                frame.transformOrigin = e.transformOrigin;
            }}
            onDragStart={e => {
                e.set(frame.translate);
            }}
            onDrag={e => {
                frame.translate = e.beforeTranslate;
            }}
            onRender={e => {
                const { translate, rotate, transformOrigin } = frame;
                e.target.style.transformOrigin = transformOrigin;
                e.target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`
                    +  ` rotate(${rotate}deg)`;
            }}   
        />
    </div>
  );
}

export default App;

