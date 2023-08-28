import React from 'react';

import "./Item.css";

const Item = ({item, data, addItem, removeItem, setCurrentId}) => {
    const zeroLevel = item.parentId === 1 
    const firstLevel = item.parentId === 3 
    const secondLevel = item.parentId === 5 

    const itemsZeroLevel = data.filter(item => item.parentId === 1);
    const lastItemZeroLevelId =  itemsZeroLevel[itemsZeroLevel.length - 1] && itemsZeroLevel[itemsZeroLevel.length - 1].id;

    const itemsFirstLevel = data.filter(item => item.parentId === 3);
    const lastItemFirstLevelId =  itemsFirstLevel[itemsFirstLevel.length - 1] && itemsFirstLevel[itemsFirstLevel.length - 1].id;

    const itemsSecondLevel = data.filter(item => item.parentId === 5);
    const lastItemSecondLevelId =  itemsSecondLevel[itemsSecondLevel.length - 1] && itemsSecondLevel[itemsSecondLevel.length - 1].id;
   
  return (
    <div>
        <>
            <span className={zeroLevel ? 'four-spaces-left' : firstLevel ? 'eight-spaces-left' : secondLevel ? 'twelve-spaces-left' :  undefined}>
            {item.name} <button className='button' type='button' onClick={()=>removeItem(item.id)}>❌</button>
            </span><br/>
        </>
        {lastItemZeroLevelId === item.id && <input className='four-spaces-left' type="text" onKeyDown={addItem} onChange={()=>setCurrentId(item.id)}/> }
        {lastItemFirstLevelId === item.id && <input className='eight-spaces-left' type="text" onKeyDown={addItem} onChange={()=>setCurrentId(item.id)}/> }
        {lastItemSecondLevelId === item.id && <input className='twelve-spaces-left' type="text" onKeyDown={addItem} onChange={()=>setCurrentId(item.id)}/> }
    </div>
  )
}

export default Item;