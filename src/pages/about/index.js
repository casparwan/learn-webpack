import React, { PureComponent } from 'react';
import { add1111111111111 } from './add';

import Styles from './index.less';

class About extends PureComponent {
  render() {
    const arr = ['apple', 'origin'];
    return (
      <div className={Styles.box}>
        <h2>about</h2>
        {console.log(add1111111111111(4, 5))}
      </div>
    );
  }
}
export default About;
