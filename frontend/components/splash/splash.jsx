import React from 'react';
import  { Link } from 'react-router-dom'

const Splash = () => {
   return (
       <div>
           <div className="main-container">
               <h2>The #3 or #4 app for runners and cyclists (depending on who you ask)</h2>
               <div className="devices image">
                   <img src="https://d3nn82uaxijpm6.cloudfront.net/assets/website/show_simple/devices-header-3349320fa849e6a297a3b0d64a6dfdef7307b0fe50f6329a459a0105b76ffff8.jpg" alt="" />
               </div>
               <div className="signup-form-group">
               </div>
           </div>
           <footer className="footer">
            <div id="footer-logo">
                <h1>STRIVE</h1>
            </div>
           </footer>
       </div>
   ) 
};

export default Splash;