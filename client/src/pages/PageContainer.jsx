import React, { useState, useEffect } from "react";
import MyProjectsPage from "./MyProject";
import NewProject from "./NewProject";
import { useAppContext } from "../context/AppContex";
import ProjectTask from "../components/common/ProjectTask";

function PageContainer() {
  const { activeItem } = useAppContext();
  const [isVisible, setIsVisible] = useState(true);
  const [currentComponent, setCurrentComponent] = useState(activeItem);

  useEffect(() => {
    if (activeItem !== currentComponent) {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentComponent(activeItem);

        setTimeout(() => {
          setIsVisible(true);
        }, 100);
      }, 200);
    }
  }, [activeItem, currentComponent]);

  const renderComponent = () => {
    switch (currentComponent) {
      case 0:
        return <MyProjectsPage />;
      case 1:
        return <NewProject />;
      case 2:
        return <div>Change Request</div>;
      case 3:
        return <div>Learning and Innovation</div>;
      case 4:
        return <div>Setting</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div
        className={`flex-1 transition-all duration-200 ease-linear ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {renderComponent()}
      </div>
    </div>
  );
}

export default PageContainer;
