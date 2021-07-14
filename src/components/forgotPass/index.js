import React from 'react';

const index = () => {
    return (
        <div className='d-flex flex-column justify-content-center ' style={{width:'500px',margin:'auto',border:'1px solid rgba(0.5,0.5,0.5,0.2)',marginTop:'180px'}}>
                <div className='mt-3' ><i style={{fontSize:'60px'}} class='bx bxs-lock-alt'></i></div>
                <h2 className='d-inline-block'>Forgot password?</h2>
                <span className='d-inline-block '>you can reset your password here.</span>
                <div className='d-flex justify-content-center mt-5'>
                    <span className='d-inline-block' style={{border:'1px solid rgba(0.5,0.5,0.5,0.2)',width:'40px',height:'40px'}}><i  style={{fontSize:'20px'}} class='bx bx-envelope mt-2'></i></span><input type='email' style={{outline:'none',border:'1px solid rgba(0.5,0.5,0.5,0.2)',width:'300px',}} placeholder='email address' />
                </div>
                <div>
                <button className='mt-5 mb-5' style={{height:'40px',color:'#fff',backgroundColor:'#2d88ff',width:'300px',borderRadius:'6px',outline:'none',border:'none'}}>Send My Password</button>
                </div>
        </div>
    );
}

export default index;
