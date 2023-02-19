import React from "react";
import MUIDataTable from "mui-datatables";
import { Typography, CircularProgress } from "@mui/material";


const DataTables = ({ data, title, columns, isLoading }) => {
  const options = {
    enableNestedDataAccess: ".",
    responsive: "simple",
    selectableRows: "none",
    textLabels: {
      body: {
        noMatch: "No hay registros",
        toolTip: "Ordenar",
      },
      pagination: {
        rowsPerPage: "Filas por Página",
        displayRows: "de"
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver Columnas",
        filterTable: "Filtrar",
      },
      filter: {
        all: "Todo",
        title: "FILTROS",
        reset: "REESTABLECER",
      },
      viewColumns: {
        title: "Mostrar Columnas",
        titleAria: "Mostrar/Esconder Columnas",
      },
    },
  };

  return (
    <div 
      style={{ display: "table", tableLayout: "fixed", width: "100%" }}
    >
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
    </div>
  )
};

export default DataTables;