import React from 'react'

const Footer = () => {
    return (
        <div className='bg-white mt-5' style={{ bottom: '20px', width: '100%', height: '100px'}}>
            <hr />
            <div className="d-flex align-items-center">
                <div className="about" style={{width: '70%', textAlign: 'center', marginLeft: '50px'}}>
                    <p >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident quos voluptate aperiam corporis quisquam cumque laudantium mollitia minima sit eum.</p>
                </div>
                <div className="company" style={{width: '33%', textAlign: 'center'}}>
                    <ul style={{ listStyle: 'none', alignItems: 'center', justifyContent: 'center', textAlign: 'center', textDecoration: 'underline', lineHeight: '2', cursor: 'pointer' }}>
                        <li>About Us</li>
                        <li>Contact</li>
                        <li>Conditions</li>
                    </ul>
                </div>
                <div className="social" style={{width: '33%'}}>
                    <ul style={{ listStyle: 'none', alignItems: 'center', justifyContent: 'center', textAlign: 'center', textDecoration: 'underline', lineHeight: '2', cursor: 'pointer' }}>
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>Twitter</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer