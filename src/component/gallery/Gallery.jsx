import { useEffect, useRef, useState } from "react";
import "./gallery.css";
import Card from "./card/Card.jsx";
import Search from "./search/Search.jsx";
import CategoryButtons from "./categoryButtons/CategoryButtons.jsx";
import Pagination from "./pagination/Pagination.jsx";
import SearchSuggestions from "./searchSuggestions/SearchSuggestions.jsx";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [fetchType, setFetchType] = useState("dogs");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState(""); // state to store the input value
  const searchInput = useRef(null);

  const urlApi = "https://freetestapi.com/api/v1/";

  // changing the value of itemsPerPage based on the screen width
  // to show the images in a more responsive way. From Pc you need to refresh the page after adjusting devices  width.
  const getItemsPerPage = () => {
    const width = document.body.clientWidth;
    if (width < 500) return 1;
    if (width >= 500 && width <= 768) return 3;
    return 4;
  };
  const itemsPerPage = getItemsPerPage(); // Use the function to get the items per page

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${urlApi}${fetchType}?&page=${currentPage}&search=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setImages(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage)); //setTotalPage(item.totalPage) if the api has a totalPage prop.
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [currentPage, fetchType, searchQuery]);

  useEffect(() => {
    if (inputValue) {
      const filteredSuggestions = images.filter((image) =>
        image.name.toLowerCase().includes(inputValue)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [inputValue, images]);

  // to handle the input change in the search bar.
  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setInputValue(value);
  };

  // to handle the search form submission.
  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(inputValue);
    setCurrentPage(1);
    setInputValue(""); // Clear the search input
    setSuggestions([]); // Clear the suggestions
  };

  // to handle the click on the suggestion pets name when user type in the search bar.
  const handleSuggestionClick = (suggestionName) => {
    setInputValue(suggestionName); // Update the input value with the clicked suggestion
    setSearchQuery(suggestionName);
    setInputValue("");
  };

  // to handle the pets category change when the user click on the top-right buttons.
  const handleFilterChange = (filterType) => {
    setFetchType(filterType);
    setSearchQuery("");
    setCurrentPage(1);
    setInputValue("");
  };

  // this function has page as argument, which is (number) to buttonNumbers and (CurrentPage +1), (CurrentPage -1) Next and Prev buttons
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchQuery("");
    setInputValue("");
  };

  // the current images to show based on the current page and items per page.
  // they start from image with index of (currentPage - 1) * itemsPerPage
  //  and end at image with index of currentPage * itemsPerPage

  const currentImages = images.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section id="gallery">
      <div className="search">
        <Search
          handleSearch={handleSearch}
          searchInput={searchInput}
          handleInputChange={handleInputChange}
          inputValue={inputValue}
        />

        <h2>Gallery of Pets </h2>

        <CategoryButtons
          fetchType={fetchType}
          handleFilterChange={handleFilterChange}
        />
      </div>

      {isLoading ? (
        <article className="loading">
          <div className="loader"></div>
        </article>
      ) : error ? (
        <article className="error-msg">
          <p>{error}</p>
        </article>
      ) : (
        <div className="gallery-wrap">
          <SearchSuggestions
            suggestions={suggestions}
            handleSuggestionClick={handleSuggestionClick}
          />

          {/* display Card component only if there is at least one image.
          otherwise display a message. */}

          {currentImages.length > 0 ? (
            currentImages.map((image) => (
              <Card key={image.id} fetchType={fetchType} image={image} />
            ))
          ) : (
            <p className="pets-not-found">
              Sorry! No {fetchType} found with this name!
            </p>
          )}
        </div>
      )}

      <Pagination
        totalPages={totalPages} // Pass the total number of pages  to disable next button when on the last page.
        currentPage={currentPage} // Pass the current page number to disable previous button when on the first page.
        handlePageChange={handlePageChange} // Pass the handlePageChange function to update the current page number.
      />
    </section>
  );
};

export default Gallery;
