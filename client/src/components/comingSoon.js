import React, { Component } from 'react';

export default class ComingSoon extends Component {
    
  render() {
    const childrenWithProps = React.Children.map(this.props.children, child => { 
      return ( React.cloneElement(child, { className: `${child.props.class} opacity` }))
    });
    return (
      <div style={{position:'relative'}} className={this.props.classes}>
        {childrenWithProps}
        <div style={{position: 'absolute', top:'0%', left:'0%', display: 'flex', justifyContent: 'center', alignItems: 'center',height:'100%', width:'100%'}}>
          <p style={{color:'black', transform: 'rotate(-45deg)',fontSize: this.props.size}}>Coming Soon</p>
        </div>
       </div>
    );
  };
};
