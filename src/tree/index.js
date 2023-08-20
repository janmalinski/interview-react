import React, {useState, useEffect} from 'react';
import axios from 'axios'

import './index.css'
import data from './data.json'



const Tree = () => {

    return (
            <div className="tree">
                {data.map((item) => {
                    const zeroLevel = item.parentId === 1;
                    const firstLevel = item.parentId === 3;
                    const secondLevel = item.parentId === 5;

                    const lastZeroLevel = item.name === 'frog';
                    const lastFirstLevel = item.name === 'dog';
                    const lastSecondLevel = item.name === 'elephant';
                
                    return (
                    <div key={item.id}>
                        <><span className={zeroLevel ? 'four-spaces-left' : firstLevel ? 'eight-spaces-left' : secondLevel ? 'twelve-spaces-left' :  undefined}>
                        {item.name}
                        </span><br/></>
                         {lastZeroLevel && <input className='four-spaces-left' type="text" id="word" name="word"/> }
                         {lastFirstLevel && <input className='eight-spaces-left' type="text" id="word" name="word"/> }
                         {lastSecondLevel && <input className='twelve-spaces-left' type="text" id="word" name="word"/> }
                    </div>
                    )
                }
                    
                )}
            </div>
    );
};

export default Tree;
