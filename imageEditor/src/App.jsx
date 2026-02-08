import GalleryPage from './pages/GalleryPage/GalleryPage';
import ImageViewerPage from './pages/ImageViewerPage/ImageViewerPage';
import './App.css';
import { Route,Routes } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path="/" element={<GalleryPage />} />
      <Route path="/image" element={<ImageViewerPage />} />
    </Routes>
  )
}

export default App;
