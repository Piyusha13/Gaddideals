import React from 'react'
import './Subscription.style.css';

function Subscription() {
  return (
    <div className='SubscriptionPlan_body'>

        
          <div className="user-Subs-header">
            <h1>SUBSCRIPTION PLANS</h1> 
        </div>
        <div className='subscription_container'>
            <div className='subscription_box1'>
                <div className='group'>
                    <p className='credit_no'>1 Credit</p>
                    <p className='credit_rupee'>₹ 99</p>
                    <p className='credit_value'>1Credit = 1 seller contact details</p>
                </div>
                <button className='credit_byu_now'>BUY NOW</button>
            </div>
            <div className='subscription_box2'>
                <div className='group'>
                    <p className='credit_no'>3 Credit</p>
                    <p className='credit_rupee'>₹ 99</p>
                    <p className='credit_value'>1Credit = 1 seller contact details</p>
                </div>
                <button className='credit_byu_now2'>BUY NOW</button>
            </div>
            <div className='subscription_box3'>
                <div className='group'>
                <p className='credit_no'>5 Credit</p>
                <p className='credit_rupee'>₹ 99</p>
                <p className='credit_value'>1Credit = 1 seller contact details</p>
                </div>
                <button className='credit_byu_now3'>BUY NOW</button>
            </div>
            <div className='subscription_box4'>
                <div className='group'>
                <p className='credit_no'>10 Credit</p>
                <p className='credit_rupee'>₹ 99</p>
                <p className='credit_value'>1Credit = 1 seller contact details</p>
                </div>
                <button className='credit_byu_now4'>BUY NOW</button>
                
            </div>
            
        </div>
        
      </div>
  )
}

export default Subscription