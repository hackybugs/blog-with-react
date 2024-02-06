import React from 'react'
import logo from '../images/pumabelt.jpg'

function Home({person,size})  {
    return (
        <section className="Home">
            <div>home</div>
            <div className="card" style={{width: '18rem' }}>
                <img src={logo} className="card-img-top" width={'100px'} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        {/* <p class="card-text">Some quick {person['name']} text to build on the card title and make up the bulk of the card's content.</p> */}
                        <a href="www.google.com" className="btn btn-primary">Go {size}</a>
                    </div>
            </div>
        </section>
    );
}


export default Home