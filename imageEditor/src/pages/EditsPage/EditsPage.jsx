import styles from "./EditsPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { ImageContext} from "../../contexts/ImageContext";

import { GridDisplaySizesContext } from "../../contexts/GridDisplaySizes";
import { useContext } from "react";
import { useSidebar } from "../../contexts/SidebarContext";
import { Link } from "react-router-dom";


function EditsPage() {

    const { 
    editedImages, 
    selectImage, 
    toggleImageSelection, 
    clickedImages,
    deleteImage
  } = useContext(ImageContext);

  const { viewType, showGridDisplaySizes, gridSize, changeGridSize } = useContext(GridDisplaySizesContext);
  const { isCollapsed, isMobile } = useSidebar();

  const isImageSelected = (img) => {
    return clickedImages.some(selected => selected.name === img.name);
  }
  

  return (
    <div className={styles.EditsPageContainer}>
      <Sidebar />

      <main className={`${styles.EditsMain} ${isCollapsed && !isMobile ? styles.mainExpanded : ""}`}>
        <Header showDeleteBtn={clickedImages.length > 0} showDisplayLayoutBtns={true}/>

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
          className={`${styles.EditsContainer} ${
            viewType === "grid" ? `${styles.gridLayout} ${styles[gridSize]}` : styles.listLayout
          }`}
        >
          {editedImages.map((img, idx) => (
            
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
                  <input
                    type="checkbox"
                    style={{ width: "15px", height: "15px" }}
                    checked={isImageSelected(img)}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleImageSelection(img);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                )
              }
              {viewType === "list" ? (
                <div className={styles.listItemContent}>
                  <img src={img.src} alt={img.name} 
                  style={{filter: `brightness(${img.filters?.brightness || 100}%) contrast(${img.filters?.contrast || 100}%) grayscale(${img.filters?.grayscale || 0}%)`}}
                  />
                  <div className={styles.fileInfo}>
                    <div className={styles.fileName}>{img.name}</div>
                    <div className={styles.fileSize}>{img.size}</div>
                  </div>
                  <div className={styles.fileActions}>
                    <button className={styles.actionBtn}>
                      <i className="material-icons">edit</i>
                    </button>
                    <button className={styles.actionBtn} onClick={(e)=>{
                      e.preventDefault()
                      e.stopPropagation()
                      deleteImage(img.name)
                      window.alert(`${img.name} will be deleted.`)
                    }}>
                      <i className="material-icons">delete</i>
                    </button>
                  </div>
                </div>
              ) : (
                <img className={`${styles.image} ${
                viewType === "list" ? styles.listLayoutImage : styles.gridLayoutImage}`} src={img.src} alt={img.name} 
                style={{filter: `brightness(${img.filters?.brightness || 100}%) contrast(${img.filters?.contrast || 100}%) grayscale(${img.filters?.grayscale || 0}%)`}}
                />
              )}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default EditsPage;
