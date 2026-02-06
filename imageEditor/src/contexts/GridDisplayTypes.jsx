import { createContext, useState } from "react";

export const GridDisplayTypesContext = createContext(null);

export function GridDisplayTypesProvider({ children }) {
  const [showGridDisplayTypes, setShowGridDisplayTypes] = useState(false);
  const [viewType, setViewType] = useState("grid");
  const [gridLayout, setGridLayout] = useState("square");
  const [gridSize, setGridSize] = useState("medium");

  const changeGridLayout = (newGridLayout) => {
    setGridLayout(newGridLayout);
  };

  const changeGridSize = (newGridSize) => {
    setGridSize(newGridSize);
  };

  const changeViewType = (newViewType) => {
    setViewType(newViewType);

    if (newViewType === "grid") {
        setShowGridDisplayTypes(prev => !prev);
    } 
    else {
        setShowGridDisplayTypes(false);
    }
  };


  const toggleGridDisplayTypes = () => {
    setShowGridDisplayTypes(prev => !prev);
  };

  return (
    <GridDisplayTypesContext.Provider
      value={{
        showGridDisplayTypes,
        toggleGridDisplayTypes,
        viewType,
        changeViewType,
        gridLayout,
        changeGridLayout,
        gridSize,
        changeGridSize
      }}
    >
      {children}
    </GridDisplayTypesContext.Provider>
  );
}
