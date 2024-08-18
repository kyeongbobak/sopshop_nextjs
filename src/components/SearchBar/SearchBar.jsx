"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const router = useRouter();

  const handleOnChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const onSearchHandle = (e) => {
    e.preventDefault();
    router.push(`/searchResults/${searchKeyword}`);
  };

  return (
    <form action="" onSubmit={onSearchHandle}>
      <span className={styles.title}>Search</span>
      <input type="text" className={styles.searchInput} value={searchKeyword} onChange={handleOnChange} />
    </form>
  );
}
