import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn, faChartColumn, faGauge, faHeadphonesSimple, faHouse, faListCheck, faMoneyBillTrendUp,
  faFolder, faPhone, faCalendar, faClipboardCheck, faBullseye, faUsers, faAddressCard, faEarth,
  faCity, faPersonChalkboard, faListUl, faFile, faPersonCircleCheck, faPersonCirclePlus, faBuilding, faHandshakeAlt,
  faBriefcase, faBusinessTime, faGear
} from "@fortawesome/free-solid-svg-icons";

const myIcons = {
  "gauge": faGauge,
  "money-bill-trend-up": faMoneyBillTrendUp,
  "bullhorn": faBullhorn,
  "headphones-simple": faHeadphonesSimple,
  "list-check": faListCheck,
  "house": faHouse,
  "chart-column": faChartColumn,
  "earth-americas": faEarth,
  "city": faCity,
  "business-time": faBusinessTime,
  "folder": faFolder,
  "list-ul": faListUl,
  "file": faFile,
  "handshake": faHandshakeAlt,
  "person-circle-check": faPersonCircleCheck,
  "person-circle-plus": faPersonCirclePlus,
  "briefcase": faBriefcase,
  "person-chalkboard": faPersonChalkboard,
  "phone": faPhone,
  "calendar": faCalendar,
  "clipboard-check": faClipboardCheck,
  "building": faBuilding,
  "bulls-eye": faBullseye,
  "users": faUsers,
  "address-card": faAddressCard,
  "gear": faGear,
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
    children: [
      {
        label: "Leads",
        Icon: () => <Icon iconName="users" />,
        to: "leads",
      },
      {
        label: "Contactos",
        Icon: () => <Icon iconName="address-card" />,
        to: "contactos",
      },
      {
        label: "Organizaciones",
        Icon: () => <Icon iconName="building" />,
        to: "organizaciones",
      },
      {
        label: "Oportunidades",
        Icon: () => <Icon iconName="bulls-eye" />,
        to: "oportunidades",
      }
    ]
  },
  {
    label: "Marketing",
    Icon: () => <Icon iconName="bullhorn" />,
    to: "/marketing",
    children: [
      {
        label: "Campañas",
        Icon: () => <Icon iconName="person-chalkboard" />,
        to: "campanas",
      },
      {
        label: "Tipo Campaña",
        Icon: () => <Icon iconName="list-ul" />,
        to: "tipocampana",
      },
    ],
  },
  {
    label: "Soporte",
    Icon: () => <Icon iconName="headphones-simple" />,
    to: "/soporte",
    children: [
      {
        label: "Casos",
        Icon: () => <Icon iconName="briefcase" />,
        to: "casos",
      },
    ],
  },
  {
    label: "Actividades",
    Icon: () => <Icon iconName="clipboard-check" />,
    to: "/actividades",
    children: [
      {
        label: "Llamadas",
        Icon: () => <Icon iconName="phone" />,
        to: "llamadas",
      },
      {
        label: "Tareas",
        Icon: () => <Icon iconName="list-check" />,
        to: "tareas",
      },
      {
        label: "Calendario",
        Icon: () => <Icon iconName="calendar" />,
        to: "calendario",
      },
    ],
  },
  {
    label: "Parámetros",
    Icon: () => <Icon iconName="folder" />,
    to: "/parametros",
    children: [
      {
        label: "Países",
        Icon: () => <Icon iconName="earth-americas" />,
        to: "paises",
      },
      {
        label: "Ciudades",
        Icon: () => <Icon iconName="city" />,
        to: "ciudades",
      },
      {
        label: "Motivos Casos",
        Icon: () => <Icon iconName="business-time" />,
        to: "motivos",
      },
    ],
  },
  {
    label: "Administrador",
    Icon: () => <Icon iconName="gear" />,
    to: "/admin",
    children: [
      {
        label: "Empleados",
        Icon: () => <Icon iconName="users" />,
        to: "empleados",
      },
    ],
  },
  {
    label: "Reportes",
    Icon: () => <Icon iconName="chart-column" />,
    to: "/reportes",
  },
];