import { RefObject, forwardRef, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../context/auth/userContext";
import { useLogout } from "../../hooks/auth/useLogout";

import { Avatar, Menu, MenuItem, Slide, SxProps } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const menuStyles: SxProps = {
  "& .MuiPaper-root": {
    boxShadow: "none",
    backgroundColor: "white",
    marginTop: "15px",
    border: "1px solid rgb(203 213 225)",
  },
  "& .MuiList-root": {
    padding: 0,
  },
  "& .MuiList-list": {
    padding: 0,
  },
  "& .MuiMenuItem-root": {
    fontSize: "1rem",
    padding: "10px 15px",
    color: "black",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
};

const CustomSlide = forwardRef((props: TransitionProps & { children: React.ReactElement<any, any> }, ref: React.Ref<unknown>) => (
  <Slide direction="left" ref={ref} {...props} />
));

interface Props {
  navbarRef: RefObject<HTMLDivElement>;
}
/**
 * Renders the user dropdown menu in the navbar.
 *
 * @param {Props} props - The component props.
 * @param {RefObject<HTMLDivElement>} props.navbarRef - A reference to the navbar element.
 * @return {JSX.Element} The rendered user dropdown menu.
 */
export default function NavbarUserMenu({ navbarRef }: Props) {
  const { email, username } = useContext(UserContext);
  const { logout } = useLogout();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = () => setAnchorEl(navbarRef.current);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <a onClick={handleClick}>
        <button>{username}</button>
      </a>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={CustomSlide}
        transitionDuration={100}
        sx={menuStyles}
      >
        <MenuItem divider>
          <Link to={`/${username}`} className="flex flex-row">
            <div className="mr-3">
              <Avatar />
            </div>
            <span className="my-auto">{email}</span>
          </Link>
        </MenuItem>
        <MenuItem onClick={logout} dense>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
