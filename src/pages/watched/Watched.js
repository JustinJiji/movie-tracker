import React, { useEffect, useState } from "react";
import Card from "../../components/others/Card";
import "./Watched.css";
import { getUserWatchedLists } from "../../firebase/FirestoreUtils";
import { getSearchedItem } from "../../api/Api";
import Loader from "../../components/others/Loader";

function Watched() {
  const [watchedItems, setWatchedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWatchedItems = async () => {
      try {
        const watchedList = await getUserWatchedLists();

        if (!Array.isArray(watchedList)) {
          console.error("Watched list is not an array:", watchedList);
          return;
        }
        const itemsPromises = watchedList.map(async (item) => {
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

        setWatchedItems(filteredItems);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching watched items:", error);
        setIsLoading(false);
      }
    };

    fetchWatchedItems();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="watched">
          <div className="watched-text">Watched</div>
          <div className="watched-cards">
            {watchedItems.map((item) => (
              <Card key={item.id} obj={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Watched;
