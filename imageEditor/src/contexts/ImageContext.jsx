import { createContext, useState } from "react";
import img1 from "../assets/compSciDepartment.jpg";
import img2 from "../assets/senateBuilding.jpg";
import img3 from "../assets/tetfund7InOneBuilding.jpg";
import img4 from "../assets/libraryBuilding.jpg";
import img5 from "../assets/ofirimaBuilding.jpg";
import img6 from "../assets/newConvocationArena.jpg";
import img7 from "../assets/facultyOfLawBuilding.jpg";
import img8 from "../assets/managementSciBuilding.jpg";
import img9 from "../assets/pharmacyBuilding.jpg";

export const ImageContext = createContext();

const images = [
  { src: img1, name: "Comp Sci Department", size: "1.2 MB" },
  { src: img2, name: "Senate Building", size: "2.5 MB" },
  { src: img3, name: "Tetfund 7 In One Building", size: "3.1 MB" },
  { src: img4, name: "Library Building", size: "2.0 MB" },
  { src: img5, name: "Ofirima Building", size: "1.8 MB" },
  { src: img6, name: "New Convocation Arena", size: "3.5 MB" },
  { src: img7, name: "Faculty of Law Building", size: "2.3 MB" },
  { src: img8, name: "Management Sci Building", size: "1.9 MB" },
  { src: img9, name: "Pharmacy Building", size: "2.7 MB" },
  
];

export function ImageProvider({ children }) {
  const [clickedImage, setClickedImage] = useState(null);

  const getAllImages = () => images;

  const selectImage = (image) => {
    setClickedImage(image);
  };

  return (
    <ImageContext.Provider
      value={{
        getAllImages,
        clickedImage,
        selectImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}
