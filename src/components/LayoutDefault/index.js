import { Grid, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import TopBar from "../TopBar";
import UserList from "../UserList";
import "./style.css";

const LayoutDefault = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar />
        </Grid>
        <div className="main-topbar-buffer" />
        <Grid item sm={3}>
          <Paper className="main-grid-item">
            <UserList />
          </Paper>
        </Grid>
        <Grid item sm={9}>
          <Paper className="main-grid-item">
            <Outlet />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default LayoutDefault;
