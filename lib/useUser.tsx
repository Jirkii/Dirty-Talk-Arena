import { useState, useEffect } from "react";
import axios from "axios";

export default function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get("/api/me");

        if (response.status === 401) {
          setAuthFailed(true);
        } else {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Fetching user failed:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading, authFailed };
}
