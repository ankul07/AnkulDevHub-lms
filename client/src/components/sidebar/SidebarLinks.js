import {
  FaHome,
  FaChartBar,
  FaBell,
  FaUser,
  FaHeart,
  FaBookmark,
  FaCog,
  FaInfoCircle,
  FaSignOutAlt,
} from "react-icons/fa";

export const topLinks = [
  { name: "Dashboard", icon: FaHome, path: "/dashboard/home" },
  { name: "Revenue", icon: FaChartBar, path: "/dashboard/revenue" },
  { name: "Notifications", icon: FaBell, path: "/dashboard/notifications" },
  { name: "Profile", icon: FaUser, path: "/dashboard/profile" },
  { name: "Likes", icon: FaHeart, path: "/dashboard/likes" },
  { name: "Bookmarks", icon: FaBookmark, path: "/dashboard/bookmarks" },
  { name: "Help", icon: FaInfoCircle, path: "/dashboard/help" },
];

export const bottomLinks = [
  { name: "Settings", icon: FaCog, path: "/dashboard/settings" },
  { name: "Logout", icon: FaSignOutAlt, path: "/logout" },
];
