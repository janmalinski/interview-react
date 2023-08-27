import React, {useState, useEffect} from 'react';
import axios from 'axios'

import './index.css'
import dataJson from './data.json'

const Tree = () => {

    const [data, setData] = useState([]);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        setData(dataJson);
    }, [dataJson]);

    const addItem = (event) => {
            if (event.key === 'Enter' && event.target.value !== '') {

                const parentItem = data.find(item => item.id === currentId);

                const item = {
                    id: currentId + 1,
                    name: event.target.value,
                    parentId: parentItem.parentId,
                };
    
                const currentItemIndex = data.findIndex(item => item.id === currentId);
                
                data.splice(currentItemIndex + 1, 0, item);
    
                const updatedArray = [];
    
                updatedArray.push(data);
            
                const doubledIdObjects = updatedArray[0].filter(item => (item.id >= currentId + 1 && item.name !== event.target.value));
    
                const restWithoutDoubledIdObjects = updatedArray[0].filter(item => (item.id < currentId + 1));
    
                const updatedDoubledIdObjects = doubledIdObjects.map(item => ({id: item.id + 1, name: item.name, parentId: item.parentId}))
    
                const updatedData  = [];
                updatedData.push(...restWithoutDoubledIdObjects);
                updatedData.push(item);
                updatedData.push(...updatedDoubledIdObjects);
                setData(updatedData);
                event.target.value = null;
            };      
    };

    const removeItem = (id) => {
        const dataWithoutRemovedItem = data.filter(item => item.id !== id);
        setData(dataWithoutRemovedItem);
    };

    return (
            <div className="tree">
                {data.map((item) => {

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
                    <div key={item.id}>
                        <><span className={zeroLevel ? 'four-spaces-left' : firstLevel ? 'eight-spaces-left' : secondLevel ? 'twelve-spaces-left' :  undefined}>
                        {item.name} <button type='button' onClick={()=>removeItem(item.id)} style={{border: 0}}> ❌</button>
                        </span><br/></>
                         {lastItemZeroLevelId === item.id && <input className='four-spaces-left' type="text" onKeyDown={addItem} onChange={()=>setCurrentId(item.id)}/> }
                         {lastItemFirstLevelId === item.id && <input className='eight-spaces-left' type="text" onKeyDown={addItem} onChange={()=>setCurrentId(item.id)}/> }
                         {lastItemSecondLevelId === item.id && <input className='twelve-spaces-left' type="text" onKeyDown={addItem} onChange={()=>setCurrentId(item.id)}/> }
                    </div>
                    );
            })}
            </div>
    );
};

export default Tree;
