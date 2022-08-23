import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faChartColumn, faGauge, faHeadphonesSimple, faHouse, faListCheck, faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons"

const myIcons = {
  "gauge": faGauge,
  "money-bill-trend-up": faMoneyBillTrendUp,
  "bullhorn": faBullhorn,
  "headphones-simple": faHeadphonesSimple,
  "list-check": faListCheck,
  "house": faHouse,
  "chart-column": faChartColumn
}

const Icon = ({ iconName }) => {
  return <FontAwesomeIcon className="w-6 h-6 mr-4" icon={myIcons[iconName]} />;
};

export const sideMenu = [
  {
    label: "Dashboard",
    Icon: () => <Icon iconName="gauge" />,
    to: "/dashboard",
  },
  {
    label: "Ventas",
    Icon: () => <Icon iconName="money-bill-trend-up" />,
    to: "/ventas",
  },
  {
    label: "Marketing",
    Icon: () => <Icon iconName="bullhorn" />,
    to: "/marketing",
  },
  {
    label: "Soporte",
    Icon: () => <Icon iconName="headphones-simple" />,
    to: "/soporte",
  },
  {
    label: "Actividades",
    Icon: () => <Icon iconName="list-check" />,
    to: "/settings",
    children: [
      {
        label: "Account",
        Icon: () => <Icon iconName="house" />,
        to: "account",
      },
      {
        label: "Security",
        Icon: () => <Icon iconName="house" />,
        to: "security",
        children: [
          {
            label: "Credentials",
            Icon: () => <Icon iconName="house" />,
            to: "credentials",
          },
          {
            label: "2-FA",
            Icon: () => <Icon iconName="house" />,
            to: "2fa",
          },
        ],
      },
    ],
  },
  {
    label: "Reportes",
    Icon: () => <Icon iconName="chart-column" />,
    to: "/reportes",
  },
];