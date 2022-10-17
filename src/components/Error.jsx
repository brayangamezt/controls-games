import React from 'react';
import Menu from './Menu';

function Error() {
  return(
      <React.Fragment>
          <Menu/>
          <div style={{ widht:"100%", fontSize:"40px", textAlign:"center" }}>Error, this page doesn´t exist :( what </div>
      </React.Fragment>
  )
}

export default Error;
