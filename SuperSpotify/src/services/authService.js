
const fetchFromAuth = async (endpoint, options = {}) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
    ...options,
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  
  console.log(response);
  
  if (!response.ok) {
    throw new Error(`Authentication server error: ${response.statusText}`);
  }

  return response.json();
};

const handleDemoLogin = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/demo`, {
      method: "GET",
      headers: {
        "Accept": "application/json" 
      },
      credentials: "include" 
    });

    const data = await response.json();
    if (data.success) {
      window.location.href = data.redirectUrl;
    }
  } catch (error) {
    console.error("Demo login error:", error);
  }
}

export const authService = {

  demoLogin: () => handleDemoLogin(),

  // ✅ FIX: Removed fetchFromAuth. Directly redirect the window instead.
  login: () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/signin`;
  },

  checkSessionStatus: async () => {
    try {
      const status = await fetchFromAuth("/auth/status");
      return status.loggedIn; 
    } catch (error) {
      return false;
    }
  },

  logout: async () => {
    try {
      await fetchFromAuth("/auth/signout", { method: "POST" });
    } catch (error) {
      console.error("Error during server-side signout:", error);
    } finally {
      window.location.href = "/auth";
    }
  }
};