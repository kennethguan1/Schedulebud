import React from "react";
import FullCalendarContainer from './fullcalendar/fullcalendar_container'

import FileUploadContainer from './upload/fileupload_container';

const App = () => (
  <div>
    <h1 className="navbar-website-title">Schedule</h1>

        <FileUploadContainer />
        <br />
      <FullCalendarContainer />
      
  </div>
);

export default App;