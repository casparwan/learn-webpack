import React, { Component } from 'react';
import Styles from './index.less';
import { concat } from 'lodash-es';
class Home extends Component {
    
    render() {
        const arr = ['haha', 'jjj'];
        const newArr = conct(arr, ['pppp']);
        return (
            <div className={Styles.box1}>
                <h2>home</h2>
                <ul>
                    {newArr.map(item => {
                        return <li key={item}>{item}</li>
                    })}
                </ul>
            </div>
        )
    }
}
export default Home;