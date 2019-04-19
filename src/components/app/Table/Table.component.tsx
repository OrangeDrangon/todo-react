import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import "./Table.scss";
import CatagorySelect from "./CatagorySelect/CatagorySelect.component";

function Table() {
  return (
    <Card className="card">
      <CardHeader subheader={<CatagorySelect />}>Hello World</CardHeader>
      <CardContent>Hello Body</CardContent>
    </Card>
  );
}

export default Table;
