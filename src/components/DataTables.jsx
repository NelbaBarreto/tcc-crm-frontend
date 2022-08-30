import React from "react";
import MUIDataTable from "mui-datatables";


const DataTables = ({ data, columns }) => {
  const options = {
    enableNestedDataAccess: ".",
    labelRowsPerPage: "dsfsdfsd"
  };

  return (
    <MUIDataTable
      data={data}
      columns={columns}
      options={options}
    />
  )
};

export default DataTables;