import { createContext, useState, useEffect } from "react";
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

const defaultFilters = {
  brightness: 100,
  contrast: 100,
  grayscale: 0,
};

const allImages = [
  { src: img1, name: "Comp Sci Department", size: "1.2 MB", filters: defaultFilters },
  { src: img2, name: "Senate Building", size: "2.5 MB", filters: defaultFilters },
  { src: img3, name: "Tetfund 7 In One Building", size: "3.1 MB", filters: defaultFilters },
  { src: img4, name: "Library Building", size: "2.0 MB", filters: defaultFilters },
  { src: img5, name: "Ofirima Building", size: "1.8 MB", filters: defaultFilters },
  { src: img6, name: "New Convocation Arena", size: "3.5 MB", filters: defaultFilters },
  { src: img7, name: "Faculty of Law Building", size: "2.3 MB", filters: defaultFilters },
  { src: img8, name: "Management Sci Building", size: "1.9 MB", filters: defaultFilters },
  { src: img9, name: "Pharmacy Building", size: "2.7 MB", filters: defaultFilters },
];

export function ImageProvider({ children }) {
  const [clickedImage, setClickedImage] = useState(null);
  const [clickedImages, setClickedImages] = useState([]);
  const [editedImages, setEditedImages] = useState([]);
  const [images, setImages] = useState(allImages);

  useEffect(() => {
    const storedEdits = localStorage.getItem("editedImages");
    if (storedEdits) {
      setEditedImages(JSON.parse(storedEdits));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("editedImages", JSON.stringify(editedImages));
  }, [editedImages]);

  const addEditedImage = (image) => {
    setEditedImages((prev) => [image, ...prev]);
  };

  const getAllImages = () => images;

  const selectImage = (image) => {
    setClickedImage(image);
  };

  const toggleImageSelection = (image) => {
    setClickedImages((prev) => {
      const isSelected = prev.some(img => img.name === image.name);
      if (isSelected) {
        return prev.filter(img => img.name !== image.name);
      } else {
        return [...prev, image];
      }
    });
  };

  const deleteImage = (imageName) => {
    setImages((prevImages) => prevImages.filter(image => image.name !== imageName));

    if (clickedImage?.name === imageName) {
      setClickedImage(null);
    }

    setClickedImages((prev) => prev.filter(img => img.name !== imageName));
    setEditedImages((prev) => prev.filter(img => img.name !== imageName));
  };

  const deleteMultipleImages = (imageNames) => {
    setImages((prevImages) => 
      prevImages.filter(image => !imageNames.includes(image.name))
    );

    if (clickedImage && imageNames.includes(clickedImage.name)) {
      setClickedImage(null);
    }

    setClickedImages([]);
    setEditedImages((prev) => 
      prev.filter(img => !imageNames.includes(img.name))
    );
  };

  return (
    <ImageContext.Provider
      value={{
        getAllImages,
        clickedImage,
        clickedImages,
        setClickedImages,
        selectImage,
        toggleImageSelection,
        editedImages,
        addEditedImage,
        deleteImage,
        deleteMultipleImages,
        images,
        setImages,
        setEditedImages
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}