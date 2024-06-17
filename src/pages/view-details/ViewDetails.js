import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewDetails.css";
import "../home/Home.css";
import config from "../../config";
import Loader from "../../components/others/Loader";
import { getMultiDetails } from "../../api/Api";

function ViewDetails() {
  const { media_type, id } = useParams();
  const [obj, setObj] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMultiDetails(media_type, id);
        setObj(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [media_type, id]);

  if (loading) return <Loader />;

  return (
    <div
      className="header-image"
      style={{
        backgroundImage: `url(${config.backdropImgBaseUrl}${obj.backdrop_path})`,
      }}
    >
      <div className="header-home-overlay">
        <div className="header-texts">
          <div className="header-title">{obj.title || obj.name}</div>
          <div className="header-para">{obj.overview}</div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
