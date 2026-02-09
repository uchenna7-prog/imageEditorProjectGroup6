import styles from "./Header.module.css";
import { useContext } from "react";
import { GridDisplaySizesContext } from "../../contexts/GridDisplaySizes";
import { useTheme } from "../../contexts/ThemeContext";
import { ImageContext } from "../../contexts/ImageContext";
import { useSidebar } from "../../contexts/SidebarContext";

function Header({showDeleteBtn,showDisplayLayoutBtns}) {
  const { changeViewType, viewType } = useContext(GridDisplaySizesContext);
  const { theme, toggleTheme } = useTheme();
  const { toggleSidebar, isMobile } = useSidebar();
  const { deleteImage, clickedImage, clickedImages, setClickedImages } = useContext(ImageContext);

  const handleDeleteSelected = () => {
  if (clickedImages.length > 0) {
    setImages(prevImages =>
      prevImages.filter(img => !clickedImages.some(sel => sel.name === img.name))
    );

    setClickedImages([]);

    if (clickedImage && clickedImages.some(sel => sel.name === clickedImage.name)) {
      setClickedImage(null);
    }

    setEditedImages(prev => prev.filter(img => !clickedImages.some(sel => sel.name === img.name)));
  } else if (clickedImage) {
    deleteImage(clickedImage.name);
  }
};


  return (
    <header className={styles.galleryHeader} style={{
  justifyContent: !isMobile && !showDeleteBtn
    ? "flex-end"
    : "space-between",
}}
>
      {isMobile && (
        <button className={styles.mobileMenuBtn} onClick={toggleSidebar}>
          <i className="material-icons">menu</i>
        </button>
      )}

      {
        showDeleteBtn && (
        <button className={`${styles.headerButton} ${styles.deleteBtn}`} onClick={(e) =>{
          e.stopPropagation(); 

          if(clickedImages.length > 0){
            clickedImages.forEach(img => deleteImage(img.name));
            setClickedImages([]); 
          }
          else if(clickedImage){  
            deleteImage(clickedImage.name);
          }
          } } title="Delete">
          <i className="material-icons">delete</i>
        </button>
        )
      }


      <div className={styles.headerButtonsContainer}>
        <button className={styles.headerButton} onClick={toggleTheme}>
          <i className="material-icons">
            {theme === "light-mode" ? "dark_mode" : "light_mode"}
          </i>
        </button>

        {
          showDisplayLayoutBtns && (
            <div className={styles.displayLayoutBtnsContainer}>
              <button
                className={`${styles.headerButton} ${
                  viewType === "list" ? styles.active : ""
                }`}
                onClick={() => changeViewType("list")}
              >
                <i className="material-icons">list</i>
              </button>

              <button
                className={`${styles.headerButton} ${
                  viewType === "grid" ? styles.active : ""
                }`}
                onClick={() => changeViewType("grid")}
              >
                <i className="material-icons">grid_view</i>
                <i className="material-icons" style={{ fontSize: "18px" }}>
                  keyboard_arrow_down
                </i>
              </button>

            </div>


          )
        }
       
       

      </div>
    </header>
  );
}

export default Header;