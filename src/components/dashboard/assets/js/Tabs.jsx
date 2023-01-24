import React, { useState } from "react";
import Casos from "./Casos";
import { Titulo1 } from "../../../formulario/Titulo";

const Tab = ({ tab, activeTab, changeActiveTab })=> {

  return (
    <li className={tab.name === activeTab && "is-active"} onClick={() => changeActiveTab(tab.name)}>
      <a>
        <span>{tab.name}</span>
      </a>
    </li>
  );
};

const Tabs = ({ tabList, activeTab, changeActiveTab }) => {
  return (
    <div className="tabs">
      <ul>
        {tabList.map(tab =>
          <Tab 
            tab={tab}
            key={tab.name}
            activeTab={activeTab}
            changeActiveTab={changeActiveTab}
          />
        )}
      </ul>
    </div>
  );
}

const ActiveTabContent = (props) => <div>{props.content}</div>;

const tabList = [
  {
    name: "Ventas",
    icon: "",   
    content: "Stuff 1"
  }, 
  {
    name: "Soporte",
    icon: "",
    content: <Casos/>
  }, 
  {
    name: "Actividades",
    icon: "",
    content: "Stuff 3"
  }, 
  {
    name: "CSAT",
    icon: "",
    content: "Stuff 4"
  }
];

const App = () => {
  const [activeTab, setActiveTab] = useState("Ventas");

  const changeActiveTab = (tab) => {
    setActiveTab(tab);
  }

  const TabContent = () => {
    const activeIndex = tabList.findIndex((tab) => {
      return tab.name === activeTab;
    });
    return tabList[activeIndex || 0]?.content;
  }

  return (
    <section className="section w-full m-auto">
      <Titulo1>
        Dashboard
      </Titulo1>
      <div className="container">
        <Tabs 
          tabList={tabList}
          activeTab={activeTab}
          changeActiveTab={changeActiveTab}
        />
        <ActiveTabContent key={activeTab} content={<TabContent/>} />
      </div>
    </section>
  );
}

export default App;
