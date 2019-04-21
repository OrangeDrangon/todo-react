import React from "react";
import { Fade, Button, Slide } from "@material-ui/core";

function DeleteCatagory({ deleteCatagory }: { deleteCatagory: () => void }) {
  return (
    <Fade in={true}>
      <Slide direction="right" in={true}>
        <Button
          color="secondary"
          variant="contained"
          onClick={async () => await deleteCatagory()}
        >
          Delete Catagory
        </Button>
      </Slide>
    </Fade>
  );
}

export default DeleteCatagory;
