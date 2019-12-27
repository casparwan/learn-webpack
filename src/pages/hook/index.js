import React, { useState } from 'react';
import { Button } from 'antd';

import Styles from './index.less';

function Hook(){
  const [count, setCount] = useState(0);
  return (
    <div>
      you click {count} time.
      <button onClick={()=>setCount(count+1)}>add</button>
    </div>
  )
}
export default Hook;
