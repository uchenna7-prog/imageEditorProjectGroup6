import { createContext, useState } from "react";

export const GridDisplaySizesContext = createContext(null);

export function GridDisplaySizesProvider({ children }) {
  const [showGridDisplaySizes, setShowGridDisplaySizes] = useState(false);
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
        setShowGridDisplaySizes(prev => !prev);
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
        gridLayout,
        gridSize,
        changeGridSize
      }}
    >
      {children}
    </GridDisplaySizesContext.Provider>
  );
}
