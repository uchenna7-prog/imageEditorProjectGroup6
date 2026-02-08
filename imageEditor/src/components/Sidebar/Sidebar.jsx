import styles from "./Sidebar.module.css";
import { useSidebar } from "../../contexts/SidebarContext";
import { Link } from "react-router-dom";

function Sidebar() {
  const { isCollapsed, isMobile, isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();

  return (
    <>
      {isMobile && isSidebarOpen && (
        <div className={styles.overlay} onClick={closeSidebar}></div>
      )}

      <aside
        className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""} ${
          isMobile ? (isSidebarOpen ? styles.mobileOpen : styles.mobileClosed) : ""
        }`}
      >
        <header className={`${styles.sidebarHeader} ${isMobile ? styles.mobileSideHeader : ""}`}>
          <button className={styles.menuBtn} onClick={toggleSidebar}>
            <i className="material-icons">{isSidebarOpen ? "close" : "menu"}</i>
          </button>

          {!isCollapsed && (
            <div className={styles.sidebarTitle}>
              <h2>IMAGE GALLERY</h2>
            </div>
          )}
        </header>

        <nav className={styles.navLinksContainer}>
          <Link to="/" className={styles.navBtn}>
            <i className="material-icons">photo_library</i>
            {!isCollapsed && <span>Gallery</span>}
          </Link>

          <button className={styles.navBtn}>
            <i className="material-icons">edit</i>
            {!isCollapsed && <span>Edits</span>}
          </button>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;