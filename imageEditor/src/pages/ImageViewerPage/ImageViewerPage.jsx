import { useState, useRef, useEffect } from "react";
import styles from "./ImageViewerPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { ImageContext } from "../../contexts/ImageContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function ImageViewerPage() {
  const {clickedImage } = useContext(ImageContext);
  const viewerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    return () =>
      document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  return (
    <div ref={viewerRef} className={styles.imageViewerPage}>
      {!isFullscreen && <Sidebar />}

      <main className={styles.imageViewerMain}>
        <Header />

        <div className={styles.buttonsContainer}>

          <Link to="/" className={styles.backBtn} s>
            <i className="material-icons">arrow_back</i>
            Back
          </Link>

          <div className={styles.imageActionsContainer}>
            <button className={styles.editBtn}>
              <i className="material-icons">edit</i>
              Edit
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

            <button className={styles.downloadBtn}>
              <i className="material-icons">download</i>
              Save
            </button>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <img
            src={clickedImage ? clickedImage.src : "https://via.placeholder.com/800x600?text=No+Image+Selected"}
            alt={clickedImage ? clickedImage.name : "No Image Selected"}
          />
        </div>
      </main>
    </div>
  );
}

export default ImageViewerPage;
