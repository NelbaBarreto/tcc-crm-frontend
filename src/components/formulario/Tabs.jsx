import React from "react";

const Tabs = ({ tabs, activeTab }) => {
  return (
    <>
      <div class="tabs is-right is-boxed">
        <ul>
          {tabs.map((tab, key) => <a key={key}>{tab}</a>)}
        </ul>
      </div>
      {activeTab}
    </>
  )
}

export default Tabs;