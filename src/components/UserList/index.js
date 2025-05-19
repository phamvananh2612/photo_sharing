import { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetch(`https://ldk3f3-8081.csb.app/api/user/list`);
        const data = await res.json();
        setUsers(data.users);
      } catch (e) {
        console.log("lỗi khi fetchApi: ", e);
      }
    };
    fetchApi();
  }, []);

  console.log(users);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Danh sách người dùng
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <div key={item._id} className="item-user">
            <ListItem
              className="item-user"
              component={Link}
              to={`/users/${item._id}`}
            >
              <ListItemText primary={`${item.last_name}`} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </>
  );
}

export default UserList;
