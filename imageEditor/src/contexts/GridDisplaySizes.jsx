import { createContext, useState } from "react";

export const GridDisplaySizesContext = createContext(null);

export function GridDisplaySizesProvider({ children }) {
  const [showGridDisplaySizes, setShowGridDisplaySizes] = useState(false);
  const [viewType, setViewType] = useState("grid");
  const [gridSize, setGridSize] = useState("medium");

  const changeGridSize = (newGridSize) => {
    setGridSize(newGridSize);
    toggleGridDisplaySizes()
  };

  const changeViewType = (newViewType) => {
    setViewType(newViewType);

    if (newViewType === "grid") {
      setShowGridDisplaySizes(true);
    } 
    else {
      setShowGridDisplaySizes(false);
    }   

  };

  const toggleGridDisplaySizes = () => {
    setShowGridDisplaySizes(prev => !prev);
  };

  return (
    <GridDisplaySizesContext.Provider
      value={{
        showGridDisplaySizes,
        toggleGridDisplaySizes,
        viewType,
        changeViewType,
        gridSize,
        changeGridSize
      }}
    >
      {children}
    </GridDisplaySizesContext.Provider>
  );
}
