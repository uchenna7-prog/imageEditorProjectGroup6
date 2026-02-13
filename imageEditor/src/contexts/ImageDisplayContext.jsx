import { useContext } from "react";
import { createContext, useState } from "react";

export const ImageDisplayContext = createContext();

export function ImageDisplayProvider({ children }) {
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
    <ImageDisplayContext.Provider
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
    </ImageDisplayContext.Provider>
  );
}

export const useImageDisplay = () => useContext(ImageDisplayContext)