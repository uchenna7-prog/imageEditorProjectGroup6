import { useState, useRef, useEffect } from "react";
import styles from "./ImageViewerPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { ImageContext } from "../../contexts/ImageContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function ImageViewerPage() {
  const { clickedImage } = useContext(ImageContext);
  const viewerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Filter state
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

  const applyFilters = () => {
    return `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%)`;
  };

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setGrayscale(0);
  };

  const saveImage = () => {
    const img = viewerRef.current.querySelector("img");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.filter = applyFilters();
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = clickedImage?.name || "edited-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div ref={viewerRef} className={styles.imageViewerPage}>
      {!isFullscreen && <Sidebar />}

      <main className={styles.imageViewerMain}>
        <Header showSearchBar={false} showDisplayLayoutBtns={false} />

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
            style={{ filter: applyFilters() }}
          />
        </div>

        {isEditing && (
          <div className={styles.editPanel}>
            <label>Brightness</label>
            <input
              type="range"
              min="0"
              max="200"
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
            />

            <label>Contrast</label>
            <input
              type="range"
              min="0"
              max="200"
              value={contrast}
              onChange={(e) => setContrast(e.target.value)}
            />

            <label>Grayscale</label>
            <input
              type="range"
              min="0"
              max="100"
              value={grayscale}
              onChange={(e) => setGrayscale(e.target.value)}
            />

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
