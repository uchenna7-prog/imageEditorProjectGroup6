import styles from "./Header.module.css";
import { useImageDisplay } from "../../contexts/ImageDisplayContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useImage } from "../../contexts/ImageContext";
import { useSidebar } from "../../contexts/SidebarContext";

function Header({ showDeleteBtn, showDisplayLayoutBtns }) {

  const { viewType,changeViewType } = useImageDisplay();
  const { theme, toggleTheme } = useTheme();
  const { isMobile, toggleSidebar } = useSidebar();
  const { 
    deleteImage, 
    deleteMultipleImages, 
    clickedImage, 
    clickedImages
  } = useImage();

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
      style={{justifyContent: !isMobile ? "flex-end" : "space-between"}}
    >

      {isMobile && (
        <button className={styles.headerButton} onClick={toggleSidebar} title="menu">
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