import React from 'react'
import "./ErrorStyle.css"
export default function Error() {
    return (
        <div className="error-body">
        <div id="error-page">
        <div class="content">
           <h2 class="header" data-text="401">
              401
           </h2>
           <h4 data-text="Opps! Page not found">
              UNAUTHORIZED
           </h4>
           <div class="btns">
               <a href="/login">return home</a>
               </div>
        </div>
        </div>
        </div>
    )
}