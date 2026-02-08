import styles from "./GalleryPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { ImageContext} from "../../contexts/ImageContext";

import { GridDisplaySizesContext } from "../../contexts/GridDisplaySizes";
import { useContext } from "react";
import { useSidebar } from "../../contexts/SidebarContext";
import { Link } from "react-router-dom";


function GalleryPage() {

  const { getAllImages, selectImage } = useContext(ImageContext);

  const images = getAllImages()

  const { viewType, showGridDisplaySizes, gridSize, changeGridSize } = useContext(GridDisplaySizesContext);
  const { isCollapsed, isMobile } = useSidebar();
  

  return (
    <div className={styles.galleryPageContainer}>
      <Sidebar />

      <main className={`${styles.galleryMain} ${isCollapsed && !isMobile ? styles.mainExpanded : ""}`}>
        <Header showSearchBar = {true} showDisplayLayoutBtns={true}/>

        {showGridDisplaySizes && (

          <div className={styles.gridDisplaySizesContainer}>
            <div className={styles.gridDisplaySizeTitle}>SIZES</div>
            <button
              className={styles.gridSizeBtn}
              onClick={() => changeGridSize("small")}
              style={{ background: gridSize === "small" ? "var(--btn-hover-bg)" : "var(--bg)" }}
            >
              <i className="material-icons">grid_on</i> Small
            </button>
            <button
              className={styles.gridSizeBtn}
              onClick={() => changeGridSize("medium")}
              style={{ background: gridSize === "medium" ? "var(--btn-hover-bg)" : "var(--bg)" }}
            >
              <i className="material-icons">window</i> Medium
            </button>
            <button
              className={styles.gridSizeBtn}
              onClick={() => changeGridSize("large")}
              style={{ background: gridSize === "large" ? "var(--btn-hover-bg)" : "var(--bg)" }}
            >
              <i className="material-icons">crop_square</i> Large
            </button>
          </div>
        )}

        <div
          className={`${styles.galleryContainer} ${
            viewType === "grid" ? `${styles.gridLayout} ${styles[gridSize]}` : styles.listLayout
          }`}
        >
          {images.map((img, idx) => (
            
            <Link to="/image" style={{ textDecoration: "none", color: "inherit" }}
              key={idx}
              className={`${styles.imageContainer} ${
                viewType === "list" ? styles.listLayoutItem : styles.gridLayoutItem
              }`}
              onClick={() => selectImage(img)}
            >
              {
                viewType === "grid" && (
                <div className={styles.imageOverlay}>
                  <i className="material-icons" style={{fontSize:"small"}}>visibility</i>
                </div>
                )
              }
              {viewType === "list" ? (
                <div className={styles.listItemContent}>
                  <img src={img.src} alt={img.name} />
                  <div className={styles.fileInfo}>
                    <div className={styles.fileName}>{img.name}</div>
                    <div className={styles.fileSize}>{img.size}</div>
                  </div>
                  <div className={styles.fileActions}>
                    <button className={styles.actionBtn}>
                      <i className="material-icons">edit</i>
                    </button>
                    <button className={styles.actionBtn}>
                      <i className="material-icons">delete</i>
                    </button>
                  </div>
                </div>
              ) : (
                <img className={`${styles.image} ${
                viewType === "list" ? styles.listLayoutImage : styles.gridLayoutImage}`} src={img.src} alt={img.name} />
              )}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default GalleryPage;
