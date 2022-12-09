import { useUser } from "../contexts/UserContext";
import { getAuth } from "firebase/auth";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useRouter } from "next/router";

export default function HeaderButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const user = useUser();
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    const auth = getAuth();
    auth.signOut();
    router.push("/login");
  };

  const handleHome = () => {
    setAnchorEl(null);
    router.push("/");
  };

  return (
    <div>
      <span>
        <Button
          id="user-button"
          sx={{ width: "100%", maxWidth: 360, padding: "10px", margin: "0px" }}
          elevation={10}
          variant="contained"
          aria-controls={open ? "menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {user ? user.email : "Log in"}
        </Button>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            labeled: "user-button",
          }}
        >
          <MenuItem onClick={handleHome}>Home</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </span>
    </div>
  );
}
