import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import "./Table.scss";
import Search from "./Search/Search.component";

function Table() {
  return (
    <Card className="card">
      <CardHeader subheader={<Search />}>
        Hello World
      </CardHeader>
      <CardContent>
        Hello Body
      </CardContent>
    </Card>
  );
}

export default Table;
