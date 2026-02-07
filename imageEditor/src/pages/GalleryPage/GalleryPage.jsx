import styles from "./GalleryPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

import img1 from "../../assets/compSciDepartment.jpg";
import img2 from "../../assets/senateBuilding.jpg";
import img3 from "../../assets/tetfund7InOneBuilding.jpg";
import img4 from "../../assets/libraryBuilding.jpg";
import img5 from "../../assets/ofirimaBuilding.jpg";
import img6 from "../../assets/newConvocationArena.jpg";

import { GridDisplaySizesContext } from "../../contexts/GridDisplaySizes";
import { useContext } from "react";
import { useSidebar } from "../../contexts/SidebarContext";

const images = [
  { src: img1, name: "Comp Sci Department", size: "1.2 MB" },
  { src: img2, name: "Senate Building", size: "2.5 MB" },
  { src: img3, name: "Tetfund 7 In One Building", size: "3.1 MB" },
  { src: img4, name: "Library Building", size: "2.0 MB" },
  { src: img5, name: "Ofirima Building", size: "1.8 MB" },
  { src: img6, name: "New Convocation Arena", size: "3.5 MB" },
];

function GalleryPage() {
  const { viewType, showGridDisplaySizes, gridSize, changeGridSize } = useContext(GridDisplaySizesContext);
  const { isCollapsed, isMobile } = useSidebar();

  return (
    <div className={styles.galleryPageContainer}>
      <Sidebar />

      <main className={`${styles.galleryMain} ${isCollapsed && !isMobile ? styles.mainExpanded : ""}`}>
        <Header />

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
            <div
              key={idx}
              className={`${styles.imageContainer} ${
                viewType === "list" ? styles.listLayoutItem : styles.gridLayoutItem
              }`}
            >
              {
                viewType === "grid" && (
                <div className={styles.imageOverlay}>
                  <i className="material-icons">edit</i>
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
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default GalleryPage;
