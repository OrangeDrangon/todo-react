import React from "react";

import classes from "./Root.module.scss";

import Table from "../Table/Table.component";

function Root() {
  return (
    <div className={classes.container}>
      <Table />
    </div>
  );
}

export default Root;
