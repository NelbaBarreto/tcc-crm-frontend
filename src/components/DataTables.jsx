import React from "react";
import MUIDataTable from "mui-datatables";
import { Typography, CircularProgress } from "@mui/material";


const DataTables = ({ data, title, columns, isLoading }) => {
  const options = {
    enableNestedDataAccess: ".",
    textLabels: {
      body: {
        noMatch: "No hay registros",
      },
      pagination: {
        rowsPerPage: "Filas por Página",
        displayRows: "de"
      }
    },
  };

  return (
    <MUIDataTable
      title={
        <Typography variant="h6">
          {title}
          {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: "relative", top: 4 }} />}
        </Typography>
      }
      data={data}
      columns={columns}
      options={options}
    />
  )
};

export default DataTables;