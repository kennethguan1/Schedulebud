import React from "react";
import FullCalendarContainer from './fullcalendar/fullcalendar_container'

import UploadContainer from './upload/upload_container';

const App = () => (
  <div>
    <h1 className="navbar-website-title">Scheduleler</h1>

        <UploadContainer />
        <br />
      <FullCalendarContainer />
      
  </div>
);

export default App;