import React, { PureComponent } from 'react';
export default function(componentFn){
    return class Lazy extends PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            }
        }
        async componentWillMount(){
            if (!this.state.component) {
                const {default: component} = await componentFn();
                this.setState({
                    component
                })
            }
        }
        render(){
            const { component: C } = this.state;
            return C ? <C {...this.props}/> : null;
        }
    }
}