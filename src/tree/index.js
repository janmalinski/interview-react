import React, {useState, useEffect} from 'react';
import axios from 'axios'

import './index.css'
import data from './data.json'

const Tree = () => {
    return (
            <div className="tree">
                {data.reverse().map((item) => (
                    <div key={item.id}>
                        <><span className={item.parentId === 1 ? 'four-spaces-left' : item.parentId === 3 ? 'eight-spaces-left' : item.parentId === 5 ? 'twelve-spaces-left' :  undefined}>{item.name}</span><br/></>
                    </div>
                ))}
            </div>
    );
};

export default Tree;
