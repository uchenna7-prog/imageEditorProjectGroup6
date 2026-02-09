import styles from "./Header.module.css";
import { useContext } from "react";
import { GridDisplaySizesContext } from "../../contexts/GridDisplaySizes";
import { useTheme } from "../../contexts/ThemeContext";
import { ImageContext } from "../../contexts/ImageContext";
import { useSidebar } from "../../contexts/SidebarContext";

function Header({ showDeleteBtn, showDisplayLayoutBtns }) {
  const { changeViewType, viewType } = useContext(GridDisplaySizesContext);
  const { theme, toggleTheme } = useTheme();
  const { toggleSidebar, isMobile } = useSidebar();
  const { 
    deleteImage, 
    deleteMultipleImages, 
    clickedImage, 
    clickedImages, 
    setClickedImages 
  } = useContext(ImageContext);

  const handleDeleteSelected = () => {
    if (clickedImages.length > 0) {
      const imageNames = clickedImages.map(img => img.name);
      if (window.confirm(`Delete ${imageNames.length} image(s)?`)) {
        deleteMultipleImages(imageNames);
      }
    } else if (clickedImage) {
      if (window.confirm(`Delete ${clickedImage.name}?`)) {
        deleteImage(clickedImage.name);
      }
    }
  };

  return (
    <header
      className={styles.galleryHeader}
      style={{justifyContent: !isMobile? "flex-end" : "space-between"}}
    >
      {isMobile && (
        <button className={styles.mobileMenuBtn} onClick={toggleSidebar} title="menu">
          <i className="material-icons">menu</i>
        </button>
      )}

   
      <div className={styles.headerButtonsContainer}>

        {showDeleteBtn && (
          <button
            className={`${styles.headerButton} ${styles.deleteBtn}`}
            onClick={handleDeleteSelected}
            title="Delete"
          >
            <i className="material-icons">delete</i>
          </button>
        )}


        <button className={styles.headerButton} onClick={toggleTheme} title="Theme">
          <i className="material-icons">
            {theme === "light-mode" ? "dark_mode" : "light_mode"}
          </i>
        </button>

        {showDisplayLayoutBtns && (
          <div className={styles.displayLayoutBtnsContainer}>
            <button
              className={`${styles.headerButton} ${viewType === "list" ? styles.active : ""}`}
              onClick={() => changeViewType("list")}
              title="List View"
            >
              <i className="material-icons">list</i>
            </button>

            <button
              className={`${styles.headerButton} ${viewType === "grid" ? styles.active : ""}`}
              onClick={() => changeViewType("grid")}
              title="Grid View"
            >
              <i className="material-icons">grid_view</i>
              <i className="material-icons" style={{ fontSize: "18px" }}>
                keyboard_arrow_down
              </i>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;