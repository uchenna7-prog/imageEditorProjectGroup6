import styles from "./Header.module.css"
import { useContext } from "react";
import { GridDisplayTypesContext } from "../../contexts/GridDisplayTypes"

function Header() {

  const {showGridDisplayTypes,toggleGridDisplayTypes,viewType,changeViewType} = useContext(GridDisplayTypesContext)

  return(
  <header className={styles.galleryHeader}>

    <div className={styles.searchContainer}>

      <i className="material-icons">search</i>
      <input type="text" placeholder="Search images..." className={styles.searchInput} />

    </div>

    <div className={styles.headerButtonsContainer}>

      <button className={styles.headerButton}>
        <i className="material-icons">light_mode</i>
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