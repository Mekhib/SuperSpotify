

export const searchService = {
  /**
   * Fetches tracks, artists, and albums in a single concurrent backend request.
   * @param {string} keyword - The user's search query
   */
  searchCatalog: async (keyword) => {
    if (!keyword || keyword.trim() === "") return null;

    const response = await fetch(`${process.env.REACT_APP_API_URL}/global/search?keyword=${encodeURIComponent(keyword)}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Search API Error: ${response.statusText}`);
    }
    return response.json(); 
  }
};