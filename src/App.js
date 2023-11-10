import React, { useState } from 'react';
import axios from 'axios';
import './components/FilterApp.css';
import notload from './components/notfound.png'

const SketchFilterApp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('blackandwhite');
  const [filteredImage, setFilteredImage] = useState(null);
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSend = async () => {
    try {
      if (!selectedFile) {
        console.error('Please choose a file before sending.');
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
            <div className="choosefilterwithcss">
              <p>
                <input type="radio" name="filter" value="sketch" onChange={handleFilterChange}/>
                Sketch
              </p>
            </div>
            <div className="choosefilterwithcss">
              <p>
                <input type="radio" name="filter" value="blur" onChange={handleFilterChange}/>
                Blur
              </p>
            </div>
            <div className="choosefilterwithcss">
              <p>
                <input type="radio" name="filter" value="blackandwhite" onChange={handleFilterChange}/>
                Black and White
              </p>
            </div>
            <div className="choosefilterwithcss">
              <p>
                <input type="radio" name="filter" value="kafwefw" onChange={handleFilterChange}/>
                Kafwefw
              </p>
            </div>
            <div className="choosefilterwithcss">
              <p>
                <input type="radio" name="filter" value="ewfwefrege" onChange={handleFilterChange}/>
                Ewfwefrege
              </p>
            </div>
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
