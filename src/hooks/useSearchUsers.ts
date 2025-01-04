"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const useSearchUsers = () => {
  const [allUsernames, setAllUsernames] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch all usernames on mount
  useEffect(() => {
    const fetchUsernames = async () => {
      const usernamesRef = collection(db, "usernames");
      const snapshot = await getDocs(usernamesRef);

      const usernames: string[] = [];
      snapshot.forEach((doc) => usernames.push(doc.id));

      setAllUsernames(usernames);
    };

    fetchUsernames();
  }, []);

  // Handle user search
  const searchUsers = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    const results = allUsernames.filter((username) =>
      username.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    setSearchResults(results);
    setIsSearching(false);
  };

  // Navigate to the selected user's page
  const selectUser = (username: string) => {
    window.location.href = `/${username}`;
  };

  return {
    searchResults,
    isSearching,
    searchUsers,
    selectUser,
  };
};
