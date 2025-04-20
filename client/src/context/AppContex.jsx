import React, { useContext } from "react";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(0);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const handleLinkClick = (index) => {
    setActiveItem(index);
    setIsExpanded(false);
  };

  return (
    <AppContext.Provider
      value={{
        isExpanded,
        activeItem,
        handleMouseEnter,
        handleMouseLeave,
        handleLinkClick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider, useAppContext };
