import React, {useState, useEffect} from 'react';
import axios from 'axios'

import './index.css'
import data from './data.json'

const Tree = () => {
    return (
            <div className="tree">
                {data.map((item) => {
                    const zeroLevel = item.parentId === undefined;
                    const firstLevel = item.parentId === 1;
                    const secondLevel = item.parentId === 3;
                    const thirdLevel = item.parentId === 5;
                    const name = item.name;
                    const firstLetter= name[0];
                    const wordWithoutFirstLetter = name.substring(1);
                    return (
                    <div key={item.id}>
                        <><span className={firstLevel ? 'four-spaces-left' : secondLevel ? 'eight-spaces-left' : thirdLevel ? 'twelve-spaces-left' :  undefined}>
                        { zeroLevel ? name :  firstLevel ? firstLetter + '.' + wordWithoutFirstLetter : secondLevel ? firstLetter + '..' + wordWithoutFirstLetter : thirdLevel && firstLetter + '...' + wordWithoutFirstLetter}
                        </span><br/></>
                    </div>
                    )
                }
                    
                )}
            </div>
    );
};

export default Tree;
