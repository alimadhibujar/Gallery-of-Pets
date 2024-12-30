import mockPetData from "./mockPetData.js";

const mockFetchPets = async (type, page, search = "") => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

  const petsData = mockPetData[type] || [];

  if (search) {
    return petsData.filter((pet) =>
      pet.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return petsData;
};

export default mockFetchPets;
