import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faChartColumn, faGauge, faHeadphonesSimple, faHouse, faListCheck, faMoneyBillTrendUp, faFolder, faEarth, faCity, faPersonChalkboard, faListUl, faFile, faPersonCircleCheck, faPersonCirclePlus, faBuilding, faHandshakeAlt, faBriefcase, faBusinessTime } from "@fortawesome/free-solid-svg-icons"

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
  "building": faBuilding,
  "handshake": faHandshakeAlt,
  "person-circle-check": faPersonCircleCheck,
  "person-circle-plus": faPersonCirclePlus,
  "briefcase" : faBriefcase,
  "person-chalkboard": faPersonChalkboard,
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
        label: "Gestión de Leads",
        Icon: () => <Icon iconName="person-circle-plus" />,
        to: "lead",
      },
      {
        label: "Gestión de Contactos",
        Icon: () => <Icon iconName="person-circle-check" />,
        to: "contacto",
      },
      {
        label: "Gestión de Organizaciones",
        Icon: () => <Icon iconName="building" />,
        to: "organizacion",
      },
      {
        label: "Gestión de Oportunidades",
        Icon: () => <Icon iconName="handshake" />,
        to: "oportunidad",
      },
    ],
  },
  {
    label: "Marketing",
    Icon: () => <Icon iconName="bullhorn" />,
    to: "/marketing",
    children: [
      {
        label: "Campaña",
        Icon: () => <Icon iconName="person-chalkboard" />,
        to: "campana",
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
        label: "Gestión de Casos",
        Icon: () => <Icon iconName="briefcase" />,
        to: "casos",
      },
    ],
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
    label: "Reportes",
    Icon: () => <Icon iconName="file" />,
    to: "/reportes",
  },
];