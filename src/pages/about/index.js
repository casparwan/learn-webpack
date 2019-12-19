import React, { Component } from 'react';
import { add1111111111111 } from './add';
import { concat } from 'lodash-es';

import Styles from './index.less';
class About extends Component {

    render() {
        const arr = ['apple', 'origin'];
        const newArr = concat(arr, ['aaa']);
        return (
            <div className={Styles.box}>
                <h2>about</h2>
                {console.log(add1111111111111(4, 5))}
                <ul>
                    {newArr.map(item => {
                        return <li key={item}>{item}</li>
                    })}
                </ul>

            </div>
        )
    }
}
export default About;