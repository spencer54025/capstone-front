import React, { Component } from 'react'
import storeFront from '../../static/assets/images/barnesandnoble.jpg'
import { faPhone, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default class Contact extends Component{
    constructor(){
        super()
    }

    render() {
        return(
            <div className='contact-wrapper'>
                <div className="left-side" style={{
                    background: "url(" + storeFront + ") no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}>
                </div>
                <div className="right-side">
                <div className="contact-info-wrapper">
                    <div className="info-wrapper">
                        <FontAwesomeIcon icon={faPhone} />
                        <span>555-555-5555</span>
                    </div>
                    <div className="info-wrapper">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span>b&n@wack.com</span>
                    </div>
                    <div className="info-wrapper">
                        <FontAwesomeIcon icon={faGlobe} />
                        <a href='https://www.barnesandnoble.com/' target='_blank'>Store Site</a>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}