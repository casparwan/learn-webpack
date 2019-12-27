import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Sidebar from '@/components/menu'
import Loadable from 'react-loadable';
import Lazy from '@/components/Lazy';

const Home = Lazy(()=>import(/* webpackChunkName: 'home' */ '@/pages/home'));
//const About = lazy(()=>import(/* webpackChunkName: 'about' */ '@/pages/about'));
const About = Lazy(()=>import(/* webpackChunkName: 'about' */ '@/pages/about'))
const Hook = lazy(()=>import(/* webpackChunkName: 'hook' */ '@/pages/hook'))

class App extends React.Component {
  state={
    isError: false
  }
    componentDidCatch(err, info){
      console.log(err,info);
    }
    static getDerivedStateFromError(err){
      return {
        isError: true
      }
    }
    render() {
      if (this.state.isError){
        return (
          <div>error</div>
        )
      }
      return (
        
          <Router>
            <Link to="/">root</Link><br/>
            <Link to="/home/34">home</Link><br/>
            <Link to="/about">about</Link><br/>
            <Link to="/hook">hook</Link><br/>
            <div>
              <Route path="/" exact renter={()=><h1>我是root页面</h1>} />
              <Suspense fallback={<div>loading...</div>}>
                <Route path="/home/:id" component={Home} />
                <Route path="/hook" component={Hook} />
              </Suspense>
              <Route path="/about" component={About} />
            </div>
          </Router>
        
      );
    }
  }
export default App;