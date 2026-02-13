import { useState, useRef, useEffect } from "react";
import styles from "./ImageViewerPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { useImage } from "../../contexts/ImageContext";
import { Link } from "react-router-dom";

function ImageViewerPage() {

  const { 
    clickedImage,
    addEditedImage 
  } = useImage();

  const viewerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [grayscale, setGrayscale] = useState(0);

  const enterFullscreen = () => {
    if (viewerRef.current?.requestFullscreen) {
      viewerRef.current.requestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const toggleEdit = () => setIsEditing(!isEditing);

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setGrayscale(0);
  };

  const saveImage = () => {

  const editedImage = {
    name: clickedImage?.name + " (Edited) " || "Edited Image",
    src: clickedImage?.src || "",
    size: clickedImage?.size,
    filters: {
      brightness,
      contrast,
      grayscale,
    }
  };

  addEditedImage(editedImage);
  window.alert("Image saved to edits!");

};
 
  return (
    <div className={styles.imageViewerPage}>
      
      {!isFullscreen && <Sidebar />}

      <main ref={viewerRef} className={styles.imageViewerMain}>

        <Header showDeleteBtn={false} showDisplayLayoutBtns={false} />

        <div className={styles.buttonsContainer}>

          <Link to="/" className={styles.backBtn}>
            <i className="material-icons">arrow_back</i>
            Back
          </Link>

          <div className={styles.imageActionsContainer}>

            <button className={styles.editBtn} onClick={toggleEdit}>
              <i className="material-icons">edit</i>
              {isEditing ? "Editing" : "Edit"}
            </button>

            <button
              onClick={isFullscreen ? exitFullscreen : enterFullscreen}
              className={styles.fullscreenBtn}
            >
              <i className="material-icons">
                {isFullscreen ? "fullscreen_exit" : "fullscreen"}
              </i>
              {isFullscreen ? "Exit" : "Fullscreen"}
            </button>

            <button className={styles.downloadBtn} onClick={saveImage}>
              <i className="material-icons">download</i>
              Save
            </button>

          </div>

        </div>

        <div className={styles.imageContainer}>
          <img
            src={
              clickedImage
                ? clickedImage.src
                : "https://via.placeholder.com/800x600?text=No+Image+Selected"
            }
            alt={clickedImage ? clickedImage.name : "No Image Selected"}
            style={{ filter: `brightness(${brightness || clickedImage?.filters?.brightness || 100}%) 
            contrast(${contrast || clickedImage?.filters?.contrast || 100}%) 
            grayscale(${grayscale || clickedImage?.filters?.grayscale || 0}%)`, width: isEditing ? "auto" : "700px", height: "auto" }}
          />
        </div>

        {isEditing && (
          <div className={styles.editPanel}>

            <h2 className={styles.editPanelTitle}>FILTERS</h2>

            <div className={styles.filterControl}>
                <label>Brightness</label>
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={brightness}
                    onChange={(e) => setBrightness(e.target.value)}
                />
            </div>
            
            <div className={styles.filterControl}>

                <label>Contrast</label>
                <input
                type="range"
                min="0"
                max="200"
                value={contrast}
                onChange={(e) => setContrast(e.target.value)}
                />

            </div>

            <div className={styles.filterControl}>

                <label>Grayscale</label>
                <input
                type="range"
                min="0"
                max="100"
                value={grayscale}
                onChange={(e) => setGrayscale(e.target.value)}
                />
            </div>

            <button onClick={resetFilters} className={styles.resetBtn}>
              Reset
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default ImageViewerPage;
