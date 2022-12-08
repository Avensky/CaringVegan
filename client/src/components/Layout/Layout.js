import React, { Component } from 'react';
//import { connect } from 'react-redux';
import classes from './Layout.module.css';
import Auxiliary from '../../hoc/Auxiliary';

class Layout extends Component {
    render() {
        let assignedClasses = [classes.Layout];        
        if (this.props.grid === "blog") {
            assignedClasses.push(classes.blog)
        }

        if (this.props.grid === 'new'){
            assignedClasses.push(classes.new)
        }

        if (this.props.grid === 'one'){
            assignedClasses.push(classes.one)
        }
        return (  
            <Auxiliary>
                <div className={assignedClasses.join(' ')}>
                    {this.props.children}
                </div>
            
            </Auxiliary>  
        )

    }
}

export default Layout;