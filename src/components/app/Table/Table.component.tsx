import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import { Option } from "react-dropdown";

import classes from "./Table.module.scss";
import CatagorySelect from "./CatagorySelect/CatagorySelect.component";
import Tasks from "./Tasks/Tasks.component";
import { Catagory, db } from "src/utils/database.util";

function Table() {
  const [catagory, setCatagory] = useState<Catagory | null>(null);
  const handleChange = async (selected: Option) => {
    setCatagory(await db.getCatagory(selected.value));
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        subheader={
          <CatagorySelect
            onChange={handleChange}
            catagory={catagory}
            setCatagory={setCatagory}
          />
        }
      />
      <CardContent>
        <Tasks catagory={catagory} />
      </CardContent>
    </Card>
  );
}

export default Table;
