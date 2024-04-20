import { Circle, User } from "react-feather";
import { MdOutlineLeaderboard, MdOutlineSubscriptions } from "react-icons/md";

export default [
    {
        header: "Apps & Pages",
      },
      {
        id: "Leads",
        title: "Leads",
        icon: <MdOutlineLeaderboard size={20} />,
        navLink: "/apps/leads",
      },
      {
        id: "users",
        title: "User",
        icon: <User size={20} />,
        children: [
          {
            id: "list",
            title: "List",
            icon: <Circle size={12} />,
            navLink: "/apps/user/list",
          },
          {
            id: "view",
            title: "View",
            icon: <Circle size={12} />,
            navLink: "/apps/user/view",
          },
        ],
      },
      {
        id: "subscription",
        title: "Subscription",
        icon: <MdOutlineSubscriptions size={20} />,
        navLink: "/apps/subscription",
      },
]