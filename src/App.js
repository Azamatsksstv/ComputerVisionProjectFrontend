import React, { useState } from 'react';
import axios from 'axios';
import './components/FilterApp.css';
import notload from './components/notfound.png'

const SketchFilterApp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filteredImage, setFilteredImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null); // новое состояние
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setActiveFilter(filter); // устанавливаем активный фильтр при его выборе
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSend = async () => {
    try {
      if (!selectedFile) {
        alert('Please choose a file before sending.');
        return;
      }
      if (!selectedFilter) {
        alert('Please choose a filter before sending.');
        return;
      }

      const formData = new FormData();
      formData.append('image_file', selectedFile);

      const response = await axios.post(`http://127.0.0.1:8000/filters/${selectedFilter}/`, formData);
      setFilteredImage(response.data.filtered_image);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <>
      <div className="mmmain">
        <div>
          <input type="file" accept="image/*" onChange={handleFileChange}/>
          <div className="imagecontainer">
            {filteredImage ? (
                <img className="notload" src={`http://127.0.0.1:8000${filteredImage.image_file}`} alt="Filtered"/>
            ) : (
                <img className="notload" src={notload}/>
            )}
          </div>
        </div>

        <div>
          <div className="filterssyrty">


            <div
              className={`choosefilterwithcss ${activeFilter === "blur" ? "active" : ""}`}
              onClick={() => handleFilterChange("blur")}
            >
              <p>Blur Filter</p>
            </div>

            <div
              className={`choosefilterwithcss ${activeFilter === "emboss" ? "active" : ""}`}
              onClick={() => handleFilterChange("emboss")}
            >
              <p>Emboss Filter</p>
            </div>


            <div
              className={`choosefilterwithcss ${activeFilter === "sharpen" ? "active" : ""}`}
              onClick={() => handleFilterChange("sharpen")}
            >
              <p>Sharpen Filter</p>
            </div>


            <div
              className={`choosefilterwithcss ${activeFilter === "sepia" ? "active" : ""}`}
              onClick={() => handleFilterChange("sepia")}
            >
              <p>Sepia Filter</p>
            </div>


            <div
              className={`choosefilterwithcss ${activeFilter === "sketch" ? "active" : ""}`}
              onClick={() => handleFilterChange("sketch")}
            >
              <p>Sketch Filter</p>
            </div>



            <div
              className={`choosefilterwithcss ${activeFilter === "blackandwhite" ? "active" : ""}`}
              onClick={() => handleFilterChange("blackandwhite")}
            >
              <p>Black and White Filter</p>
            </div>
            {/* Добавьте аналогичный код для остальных фильтров */}
          </div>



          <div onClick={handleSend} className="applybrn">
             <p>Apply</p>
          </div>

        </div>



      </div>

    </>
  );
};

export default SketchFilterApp;
