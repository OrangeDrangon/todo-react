import React from "react";

import classes from "./App.module.scss";

import Table from "../Table/Table.component";

function App() {
  return (
    <div className={classes.container}>
      <Table />
    </div>
  );
}

export default App;
