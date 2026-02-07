import styles from "./Header.module.css"
import { useContext } from "react";
import { GridDisplaySizesContext } from "../../contexts/GridDisplaySizes"
import { useTheme } from "../../contexts/ThemeContext";

function Header() {

  const {showGridDisplaySizes,toggleGridDisplaySizes,viewType,changeViewType} = useContext(GridDisplaySizesContext)
  const {theme, toggleTheme} = useTheme()
  
  return(
  <header className={styles.galleryHeader}>

    <div className={styles.searchContainer}>

      <i className="material-icons">search</i>
      <input type="text" placeholder="Search images..." className={styles.searchInput} />

    </div>

    <div className={styles.headerButtonsContainer}>

      <button className={styles.headerButton} onClick={toggleTheme}>
        <i className="material-icons">{theme === "light-mode" ? "dark_mode" : "light_mode"}</i>
      </button>

      <button className={styles.headerButton} onClick={() => changeViewType("list")}>
        <i className="material-icons">view_headline</i>
      </button>

      <button className={styles.headerButton}  onClick={() => changeViewType("grid")}>
        <i className="material-icons">grid_on</i>
        <i className="material-icons" style={{fontSize:"18px"}}>keyboard_arrow_down</i>
      </button>

    </div>

  </header>

  )
}


export default Header;