import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn, faGauge, faHeadphonesSimple, faHouse, faListCheck, faMoneyBillTrendUp, faUser,
  faFolder, faPhone, faCalendar, faClipboardCheck, faBullseye, faUsers, faAddressCard, faEarth,
  faCity, faPersonChalkboard, faListUl, faFile, faPersonCircleCheck, faPersonCirclePlus, faBuilding, faHandshakeAlt,
  faBriefcase, faBusinessTime, faGear, faGraduationCap, faSchool, faUserGraduate, faChalkboardUser, faRightFromBracket,
  faArrowsSpin
} from "@fortawesome/free-solid-svg-icons";

const myIcons = {
  "gauge": faGauge,
  "money-bill-trend-up": faMoneyBillTrendUp,
  "bullhorn": faBullhorn,
  "headphones-simple": faHeadphonesSimple,
  "list-check": faListCheck,
  "house": faHouse,
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
  "graduation-cap": faGraduationCap,
  "address-card": faAddressCard,
  "user-graduate": faUserGraduate,
  "chalkboard-user": faChalkboardUser,
  "school-flag": faSchool,
  "gear": faGear,
  "right-from-bracket": faRightFromBracket,
  "user": faUser,
  "arrows-spin": faArrowsSpin
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
    label: "Educación",
    Icon: () => <Icon iconName="graduation-cap" />,
    to: "/educacion",
    children: [
      {
        label: "Cursos",
        Icon: () => <Icon iconName="user-graduate" />,
        to: "cursos",
      },
      {
        label: "Ciclos",
        Icon: () => <Icon iconName="arrows-spin" />,
        to: "ciclos",
      },
      // {
      //   label: "Profesores",
      //   Icon: () => <Icon iconName="chalkboard-user" />,
      //   to: "profesores",
      // },
      // {
      //   label: "Sedes",
      //   Icon: () => <Icon iconName="school-flag" />,
      //   to: "sedes",
      // },
    ],
  },
  // {
  //   label: "Perfil",
  //   Icon: () => <Icon iconName="user" />,
  //   to: "/perfil",
  // },
];

export const logout =
{
  label: "Cerrar Sesión",
  Icon: () => <Icon iconName="right-from-bracket" />,
  to: "/",
};