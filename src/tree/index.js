import React, {useState, useEffect} from 'react';
import axios from 'axios'

import './index.css';
import Toggle from "./components/Toggle/Toggle";
import Item from "./components/Item/Item";

const Tree = () => {
   
    const [data, setData] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
   
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setIsLoading(true);
        axios.get(process.env.REACT_APP_API_URL, {
                headers: {
                    // I can't load process.env.REACT_APP_API_KEY. In real life-project I would solve this in different way
                "X-ACCESS-KEY": '$2b$10$iiEKbg24XKCT2SlDo7rk1uKoRxe70oGVsdgwFGfmAzJQgbqJHAYWC',
                },
            })
            .then(({data}) => {
                setIsLoading(false);
                setData(data.record.data);
            })
            .catch(error => {
                setIsLoading(false);
                console.log('ERROR_GET_DATA', error.message);
            });
    };

    const updateData = (data) => {
        setIsLoading(true);
        axios.put(process.env.REACT_APP_API_URL, {data}, {
                headers: {
                "Content-Type": "application/json",
                    // I can't load process.env.REACT_APP_API_KEY. In real life-project I would solve this in different way
                "X-ACCESS-KEY": '$2b$10$iiEKbg24XKCT2SlDo7rk1uKoRxe70oGVsdgwFGfmAzJQgbqJHAYWC',
                },
            })
            .then(({data}) => {
                setIsLoading(false);
                setData(data.record.data);
            })
            .catch(error => {
                setIsLoading(false);    
                console.log('ERROR_UPDATE_DATA', error.message);
            });
    };

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
                updateData(updatedData);

                event.target.value = null;
            };      
    };

    const removeItem = (id) => {
        const dataWithoutRemovedItem = data.filter(item => item.id !== id);
        updateData(dataWithoutRemovedItem);
    };

    const handleOnToggle = (data) => {
        setData([...data]);
    };

    return (
            <div className="tree">
                <Toggle label="Alphabetize" data={data} onToggle={handleOnToggle} />
                {isLoading ?
                    <p>loading...</p>
                :
                    data.map((item, index) => (
                            <Item key={index} item={item} data={data} addItem={addItem} removeItem={removeItem} setCurrentId={setCurrentId} />
                    ))
                }
            </div>
    );
};

export default Tree;
