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

function GalleryPage() {
  const {
    showGridDisplaySizes,
    gridSize,
    changeGridSize,
  } = useContext(GridDisplaySizesContext);

  return (
    <div className={styles.galleryPageContainer}>
      <Sidebar />

      <main className={styles.galleryMain}>
        <Header />

        {showGridDisplaySizes && (
          <div className={styles.gridDisplaySizesContainer}>
            <div className={styles.gridDisplaySizeTitle}>SIZE</div>

            <button
              className={styles.gridSizeBtn}
              onClick={() => changeGridSize("small")}
              style={{ background: gridSize === "small" ? "var(--btn-hover-bg)" : "var(--bg)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="var(--textColor)"
              >
                <path d="M200-200h80v-80h-80v80Zm160 0h80v-80h-80v80Zm160 0h80v-80h-80v80Zm160 0h80v-80h-80v80ZM200-680h80v-80h-80v80Zm0 160h80v-80h-80v80Zm0 160h80v-80h-80v80Zm160-320h80v-80h-80v80Zm0 160h80v-80h-80v80Zm0 160h80v-80h-80v80Zm160-320h80v-80h-80v80Zm0 160h80v-80h-80v80Zm0 160h80v-80h-80v80Zm160-320h80v-80h-80v80Zm0 160h80v-80h-80v80Zm0 160h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z" />
              </svg>
              Small
            </button>

            <button
              className={styles.gridSizeBtn}
              onClick={() => changeGridSize("medium")}
              style={{ background: gridSize === "medium" ? "var(--btn-hover-bg)" : "var(--bg)"}}
            >
              <i className="material-icons">window</i>
              Medium
            </button>

            <button
              className={styles.gridSizeBtn}
              onClick={() => changeGridSize("large")}
              style={{ background: gridSize === "large" ? "var(--btn-hover-bg)" : "var(--bg)" }}
            >
              <i className="material-icons">crop_square</i>
              Large
            </button>
          </div>
        )}

        <div className={`${styles.galleryContainer} ${styles.square} ${styles[gridSize]}`}>
          <img src={img1} alt="Comp Sci Department" />
          <img src={img2} alt="Senate Building" />
          <img src={img3} alt="Tetfund 7 In One Building" />
          <img src={img4} alt="Library Building" />
          <img src={img5} alt="Ofirima Building" />
          <img src={img6} alt="New Convocation Arena" />
        </div>
      </main>
    </div>
  );
}

export default GalleryPage;
