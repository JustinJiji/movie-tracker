import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./ViewDetails.css";
import config from "../../config";
import Loader from "../../components/others/Loader";
import { getMultiDetails } from "../../api/Api";

function ViewDetails() {
  const { media_type, id } = useParams();
  const location = useLocation();
  const { name } = location.state || {}; 
  const [obj, setObj] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMultiDetails(media_type, id);
        if (Array.isArray(data)) {
          if (data[0].name === name || data[0].title === name) {
            setObj(data[0]);
          } else {
            setObj(data[1]);
          }
        } else {
          setObj(data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [media_type, name, id]);

  if (loading) return <Loader />;

  return (
    <div
      className="header-image"
      style={{
        backgroundImage: `url(${config.backdropImgBaseUrl}${obj.backdrop_path})`,
      }}
    >
      <div className="header-home-overlay text-side-overlay">
        <div className="header-texts">
          <div className="header-title">{obj.title || obj.name}</div>
          <div className="header-para">{obj.overview}</div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
