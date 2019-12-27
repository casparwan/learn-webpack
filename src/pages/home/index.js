import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { concat } from 'lodash-es';
import Styles from './index.less';
import Menu from '@/components/menu';
class Home extends PureComponent {
  handleClick = () => {
    import(/* webpackChunkName: "utils" */ '@/utils/utils').then((utils)=>{
      alert(utils.getName())
    })
    this.props.history.push('/about');
  }
  render() {
    
    return (
      <div className={Styles.box1}>
        {this.props.match.params.id}
        <Button type="primary" onClick={this.handleClick}>跳转到about页面</Button>
        <Menu />
      </div>
    );
  }
}
export default Home;
