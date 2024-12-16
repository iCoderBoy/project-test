import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";

function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center mb-4">
      <div className="flex items-center gap-2 border rounded px-4 py-2 w-1/3">
        <SearchIcon className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none w-full"
        />
      </div>
      <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded">
        <SortIcon />
        Sort
      </button>
    </header>
  );
}

export default Header;
