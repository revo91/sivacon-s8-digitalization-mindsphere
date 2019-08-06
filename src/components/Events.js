import React from 'react';
import MaterialTable from "material-table";

class Events extends React.Component {
    
    render() {
        return(
            <MaterialTable
            columns={[
              { title: "sdfsdf", field: "name" },
              { title: "gfjjjjj", field: "surname" },
              { title: "kkkkk", field: "birthYear", type: "numeric" },
              {
                title: "uuuuu",
                field: "birthCity",
                lookup: { 34: "nnnn", 63: "mmmm" }
              }
            ]}
            data={[
              { name: "pppp", surname: "ooooo", birthYear: 1987, birthCity: 63 }
            ]}
            title="Demo Title"
          />
        )
    }
}

export default Events;