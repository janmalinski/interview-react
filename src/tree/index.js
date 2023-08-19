import React, {useState, useEffect} from 'react';
import './index.css'
import axios from 'axios'

const Tree = () => {
    return (
            <div className="tree">
                root<br/>
                <span className="four-spaces-left">ant</span><br/>
                <span className="four-spaces-left">bear</span><br/>
                <span className="eight-spaces-left">cat</span><br/>
                <span className="eight-spaces-left">dog</span><br/>
                <span className="twelve-spaces-left">elephant</span><br/>
                <span className="four-spaces-left">frog</span><br/>
            </div>
    )
}

export default Tree;
