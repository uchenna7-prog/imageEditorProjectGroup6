
import styles from "./Sidebar.module.css";

function Sidebar(){

    return(
        <aside className={styles.sidebar}>

            <header className={styles.sidebarHeader}>

                <button className={styles.menuBtn}>
                    <i className="material-icons">menu</i>
                </button>

                <div className={styles.sidebarTitle}>
                    <h2>IMAGE GALLERY</h2>
                </div>

            </header>

            <nav className={styles.navLinksContainer}>

                <button className={styles.navBtn} >
                    <i className="material-icons">photo_library</i>
                    <span>Gallery</span>
                </button>

                <button  className={styles.navBtn}>
                    <i className="material-icons">edit</i>
                    <span>Edits</span>
                </button>
                

            </nav>
            
        </aside>
    )
   
}

export default Sidebar;