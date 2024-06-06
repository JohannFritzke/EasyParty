import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search as SearchBar } from "lucide-react";

import "./search.css";

export function Search() {
  return (
    <div className="search">
      <Input
        placeholder="Search..."
        className="bg-background w-[240px] input"
        type="search"
      />
      <Button className="bg-easy button">
        <SearchBar />
      </Button>
    </div>
  );
}
