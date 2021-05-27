import React from 'react';
import CSVReader from "react-csv-reader";

 class FileUpload extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       locations: [],
       technicians: [],
       type: "",
       uploadData: "",
     };
     this.handleUpload = this.handleUpload.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleDRadioButton = this.handleDRadioButton.bind(this);
     this.dataChecker = this.dataChecker.bind(this)
   }

   componentDidUpdate(prevProps, prevState) {
     if (prevProps !== this.props) {
       this.setState(
         {
           locations: this.props.locations,
           technicians: this.props.technicians,
         }
       )
     }
   }


    dataChecker(submitData) {

       let column;

       switch (this.state.type) {

         case "technician":
           column = ['id', 'name']
           break;
         case "location":
           column = ['id', 'name', 'city']
           break;
         case "work-order":
           column = ["id", 'technician_id', "location_id", 'time', 'duration', 'price'];
           break;

         default:
           break;
       }

       for (let i = 0; i < submitData.length; i++) {
         let newColumn = Object.keys(submitData[i])
         if (newColumn.length !== column.length) return false;

         for (let j = 0; j < column.length; j++) {
           if (!newColumn.includes(column[j])) {
             return false;
           }
         }
       }

       return true

     }


   handleSubmit(event, type, uploadData, locations, technicians) {

     event.preventDefault();

     let submitData = Object.values(uploadData);

     if (!uploadData) {
       alert("No file uploaded.");
       return;
     } else if (type === "") {
       alert("No CSV type selected");
       return;
     } else if (!this.dataChecker(submitData)) {
       alert('CSV type does not match');
     } else if ((Object.values(technicians).length === 0 || Object.values(locations).length === 0) && type === 'work-order') {
       alert('Need Location and Technician data before uploading Work Order data');
     } else { this.props
         .fileDispatch(type, uploadData)
         .then(() => window.location.reload());
     }
   }

   handleUpload(data) {
     this.setState({ uploadData: data });
   }

   handleDRadioButton(event) {
     this.setState({ type: event.target.value });
   }

   render() {
     const papaparseOptions = {
       header: true,
       transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
       dynamicTyping: true,
       skipEmptyLines: true,
     };

     return (
       <div>

         <CSVReader
           label="CSV Upload "
           onFileLoaded={this.handleUpload}
           parserOptions={papaparseOptions}
           inputStyle={{ color: "blue" }}
         />

         <form>

            <div
             name="fileType"
             onChange={(event) => this.handleDRadioButton(event)}>

              <input type="radio" id="choice2" name="fileType" value="location" />
              <label htmlFor="choice2">Location</label>

              <input type="radio" id="choice1" name="fileType" value="technician" />
              <label htmlFor="choice1">Technician</label>

              <input type="radio" id="choice3" name="fileType" value="work-order" />
              <label htmlFor="choice3">Work Order</label>
            </div>
            
            <div>
              <button onClick={(event) => this.handleSubmit(event, this.state.type, this.state.uploadData,
                 this.state.locations, this.state.technicians)}>Submit</button>
            </div>

         </form>

       </div>
     );
   }
 }

export default FileUpload;