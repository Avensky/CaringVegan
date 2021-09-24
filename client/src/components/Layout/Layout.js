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

        const footer =                 <footer id="footer" className="page-footer teal">
        <div className="container">
            <div className="footer">
                <div className="bio">
                    <h3 className="white-text">Uriel Zacarias Bio</h3>
                    <p className="grey-text text-lighten-4">I am a self motivated Full Stack Web Developer looking for 
                    an en entry level position. I've been building full stack web applications using mostly Node and React.</p>
                </div>
                <div className="connect">
                    <h3 className="white-text">Connect with me</h3>
                    <ul>
                        <li><a className="white-text" href="https://github.com/avensky"             >GitHub</a></li>
                        <li><a className="white-text" href="https://linkedin.com/in/urielzacarias"  >LinkedIn</a></li>
                        <li>Email: urielzacarias@gmail.com</li>
                        <li>Phone: 619-621-7311</li>
                    </ul>
                </div>
                <div className="projects">
                    <h3 className="white-text">Side Projects</h3>
                    <ul>
                        <li><a className="white-text" href="https://www.youtube.com/channel/UCyyo9pq7jcUaXzF7FngMqkg">Youtube - Gaming channel</a></li>
                        <li><a className="white-text" href="https://www.youtube.com/channel/UCylRD_yUFN_KmU5SJgUadiA">Youtube - Music channel</a></li>
                        <li><a className="white-text" href="https://avenskypro.blogspot.com/">Blogger - Gaming and tech blog</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="footer-copyright">
            <div className="container">
                
            </div>
        </div>
    </footer>

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