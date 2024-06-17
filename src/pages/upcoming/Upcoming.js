import React, { useEffect, useState } from "react";
import Card from "../../components/others/Card";
import { getUpcomingMovies } from "../../api/Api";
import Loader from "../../components/others/Loader";
import './Upcoming.css'

function Upcoming() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const data = await getUpcomingMovies();
        setMovies(data); 
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching upcoming movies", error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="upcoming">
      {movies.length > 0 ? (
        movies.map((movie) => <Card obj={movie} />)
      ) : (
        <p>No upcoming movies found.</p>
      )}
    </div>
  );
}

export default Upcoming;
