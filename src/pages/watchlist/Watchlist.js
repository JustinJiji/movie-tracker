import React, { useEffect, useState } from "react";
import Card from "../../components/others/Card";
import "./Watchlist.css";
import { getUserWatchlists } from "../../firebase/FirestoreUtils";
import { getSearchedItem } from "../../api/Api";
import Loader from "../../components/others/Loader";

function Watchlist() {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlistItems = async () => {
      try {
        const watchlist = await getUserWatchlists();

        // Ensure watchlist is an array
        if (!Array.isArray(watchlist)) {
          console.error("Watchlist is not an array:", watchlist);
          return;
        }

        const itemsPromises = watchlist.map(async (item) => {
          try {
            const searchResults = await getSearchedItem(item.name);
            const foundItem = searchResults.find(
              (dataItem) => dataItem.id == item.id
            );
            return foundItem || {}; // Return found item or empty object if not found
          } catch (error) {
            console.error(`Error fetching details for ${item.name}:`, error);
            return {}; // Return empty object on error
          }
        });

        const resolvedItems = await Promise.all(itemsPromises);
        const filteredItems = resolvedItems.filter(
          (item) => Object.keys(item).length > 0
        );

        setWatchlistItems(filteredItems);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching watchlist items:", error);
        setIsLoading(false);
      }
    };

    fetchWatchlistItems();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="watchlist">
          <div className="watchlist-text">Watchlist</div>
          <div className="watchlist-cards">
            {watchlistItems.map((item) => (
              <Card key={item.id} obj={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Watchlist;
