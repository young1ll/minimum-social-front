import { Input } from "./ui/input";

const Search = () => {
  return (
    <div className="tw-flex-1">
      <Input type="search" placeholder="Search..." className="md:tw-w-[200px] lg:tw-w-[400px]" />
    </div>
  );
};
export default Search;
