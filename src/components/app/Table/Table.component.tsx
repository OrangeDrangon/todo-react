import React, { useState } from "react";
import { Card, CardHeader, CardContent} from "@material-ui/core";
import { Option } from "react-dropdown";

import "./Table.scss";
import CatagorySelect from "./CatagorySelect/CatagorySelect.component";
import Tasks from "./Tasks/Tasks.component";

function Table() {
  const [name, setName] = useState<string>("");
  const handleChange = (selected: Option) => {
    setName(selected.value);
  };
  return (
    <Card className="Table-Card">
      <CardHeader
        subheader={
          <CatagorySelect
            onChange={handleChange}
            name={name}
            setName={setName}
          />
        }
      />
      <CardContent>
        <Tasks name={name} />
      </CardContent>
    </Card>
  );
}

export default Table;
