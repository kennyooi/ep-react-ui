import React, { Component } from 'react';


export default class EmptyPage extends Component {

    render() {
        return (
            <div className='page' style={{height: '100vh'}}>
                <div style={{
                    display: 'flex',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <h1 style={{
                        fontSize: '60px',
                        color: '#ccc'
                    }}>
                        Shh... This is Empty
                    </h1>
                </div>
            </div>
        );
    }
}