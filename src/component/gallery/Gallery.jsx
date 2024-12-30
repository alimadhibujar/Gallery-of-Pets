import { useEffect, useRef, useState } from "react";
import "./gallery.css";
import Card from "./card/Card.jsx";
import Search from "./search/Search.jsx";
import CategoryButtons from "./categoryButtons/CategoryButtons.jsx";
import Pagination from "./pagination/Pagination.jsx";
import SearchSuggestions from "./searchSuggestions/SearchSuggestions.jsx";
import SkeletonLoading from "./skeletonLoading/SkeletonLoading.jsx";
import mockFetchPets from "./data/mockFetchPets.js";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [fetchType, setFetchType] = useState("dogs");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState(""); // Tracks search input state
  const searchInput = useRef(null);

  // Adjust items per page based on viewport width
  const getItemsPerPage = () => {
    const width = window.innerWidth;
    if (width < 500) return 1;
    if (width >= 500 && width <= 768) return 3;
    return 4;
  };
  const itemsPerPage = getItemsPerPage();

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const data = await mockFetchPets(fetchType, currentPage, searchQuery);
      setImages(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //  API fetch implementation
  // const urlApi = "https://freetestapi.com/api/v1/";
  // const fetchImages = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch(
  //       `${urlApi}${fetchType}?&page=${currentPage}&search=${searchQuery}`
  //     );

  //     if (!response.ok) {
  //       throw new Error("Something went wrong!");
  //     }
  //     const data = await response.json();
  //     setImages(data);
  //     setTotalPages(Math.ceil(data.length / itemsPerPage));
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchImages();
  }, [currentPage, fetchType, searchQuery, itemsPerPage]);

  useEffect(() => {
    if (inputValue) {
      // Filter and sort suggestions based on input
      const filteredSuggestions = images
        .filter((image) => image.name.toLowerCase().startsWith(inputValue))
        .sort((a, b) => a.name.localeCompare(b.name));
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [inputValue, images]);

  // Search input handlers
  const handleInputChange = (event) => {
    setInputValue(event.target.value.toLowerCase());
  };

  const clearInput = () => {
    setInputValue("");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(inputValue);
    setCurrentPage(1);
    setInputValue("");
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestionName) => {
    setSearchQuery(suggestionName);
    setInputValue("");
  };

  // Reset states when changing pet category
  const handleFilterChange = (filterType) => {
    setFetchType(filterType);
    setSearchQuery("");
    setCurrentPage(1);
    setInputValue("");
  };

  // Update page and reset search states
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchQuery("");
    setInputValue("");
  };

  // Get current page's images
  const currentImages = images.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Render image cards or no results message
  const CardsImageList = ({ currentImages, fetchType }) => {
    if (currentImages.length === 0) {
      return (
        <p className="pets-not-found">
          Sorry! No {fetchType} found with this name!
        </p>
      );
    }
    return currentImages.map((image) => (
      <Card key={image.id} fetchType={fetchType} image={image} id={image.id} />
    ));
  };

  return (
    <section className="gallery">
      <div className="search">
        <Search
          handleSearch={handleSearch}
          searchInput={searchInput}
          handleInputChange={handleInputChange}
          inputValue={inputValue}
          clearInput={clearInput}
        />

        <h2>Gallery of Pets </h2>

        <CategoryButtons
          fetchType={fetchType}
          handleFilterChange={handleFilterChange}
        />
      </div>

      <div className="gallery-wrap">
        <SearchSuggestions
          suggestions={suggestions}
          handleSuggestionClick={handleSuggestionClick}
        />

        {error && (
          <article className="error-msg">
            <p>{error}</p>
          </article>
        )}

        {isLoading && <SkeletonLoading count={itemsPerPage} />}

        {!error && !isLoading && (
          <CardsImageList currentImages={currentImages} fetchType={fetchType} />
        )}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        isLoading={isLoading}
      />
    </section>
  );
};

export default Gallery;
