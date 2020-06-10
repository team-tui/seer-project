import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import BaseDialog from "./BaseDialog";

const styles = (theme) => ({
  container: {
    maxWidth: 600,
    flexGrow: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  bottomMargin: {
    marginBottom: theme.spacing(2),
  },
});

class InstructionDialog extends Component {
  render() {
    const { classes } = this.props;
    return (
      <BaseDialog {...this.props}>
        <div className={classes.bottomMargin}>
          <Typography variant="body2" gutterBottom>
            Here is where you will learn more information about the Research
            item you clicked on
          </Typography>
        </div>
      </BaseDialog>
    );
  }
}

export default withRouter(withStyles(styles)(InstructionDialog));
