import { venuesCategories } from "@/utils/helperFunction";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { FaTimes } from "react-icons/fa";
import { handler } from "./interface";
import { useAppSelector } from "@/Store";
import { useDispatch } from "react-redux";
import { setSearchFilters } from "@/Store/Search/searchSlice";

const FilterModal = forwardRef<handler, {}>(({}, ref) => {
  const [visible, setVisible] = useState(false);
  const search = useAppSelector((state) => state.search);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    venueType: search.venueType,
    entranceScore: search.entranceScore,
    interiorScore: search.interiorScore,
    restroomScore: search.restroomScore,
    hasParking: search.hasParking,
  });

  const onApplyFilters = () => {
    dispatch(setSearchFilters(filters));
    hide();
  };

  const onClearFilters = () => {
    setFilters({
      venueType: "establishment",
      entranceScore: "Any",
      interiorScore: "Any",
      restroomScore: "Any",
      hasParking: "",
    });
    dispatch(setSearchFilters({
      venueType: "establishment",
      entranceScore: "Any",
      interiorScore: "Any",
      restroomScore: "Any",
      hasParking: "",
    }));
    hide();
  };

  const show = useCallback(() => {
    console.log({
      venueType: search.venueType,
      entranceScore: search.entranceScore,
      interiorScore: search.interiorScore,
      restroomScore: search.restroomScore,
      hasParking: search.hasParking,
    })
    setFilters({
      venueType: search.venueType,
      entranceScore: search.entranceScore,
      interiorScore: search.interiorScore,
      restroomScore: search.restroomScore,
      hasParking: search.hasParking,
    });
    setVisible(true);
  }, [JSON.stringify(search)]);

  const hide = useCallback(() => {
    setVisible(false);
  }, [search]);

  useImperativeHandle(ref, () => ({ show, hide }), [show, hide]);

  if (!visible) return null;
  return (
    <div className="fixed mt-1 shadow-2xl bg-white top-0 right-0 bg-opacity-50 flex justify-center items-start z-50 h-full">
      <div className="bg-white overflow-auto rounded-lg w-full max-w-[400px] h-full p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Filter</h3>
          <button onClick={hide} className="text-gray-500">
            <FaTimes />
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-sm">Place Type</label>
          <select
            className="w-full p-2 border md:text-base text-sm rounded-lg mt-2"
            value={filters.venueType}
            onChange={(e) => {
              setFilters((pre) => ({ ...pre, venueType: e.target.value }));
            }}
          >
            <option value="establishment">All</option>

            {venuesCategories
              .filter((category) => category.value !== "all")
              .map((category) => (
                <optgroup
                  key={category.value}
                  label={category.value
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^\w/, (char) => char.toUpperCase())}
                >
                  {category.options.map((option) => (
                    <option key={option} value={option}>
                      {option
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </option>
                  ))}
                </optgroup>
              ))}
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm">Entrance Score</label>
          <div className="flex mt-2">
            {["Any", "At least Yellow", "Accessible"].map((option) => (
              <button
                key={option}
                className={`md:px-4 px-3 py-1 md:py-2 md:text-base text-sm rounded-lg mr-2 border-[1px] border-[#838799] ${
                  filters.entranceScore === option
                    ? "bg-primary border-primary"
                    : ""
                }`}
                onClick={() => {
                  setFilters((pre) => ({
                    ...pre,
                    entranceScore: option,
                  }));
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm">Interior Score</label>
          <div className="flex mt-2">
            {["Any", "At least Yellow", "Accessible"].map((option) => (
              <button
                key={option}
                className={`md:px-4 px-3 py-1 md:py-2 md:text-base text-sm rounded-lg mr-2 border-[1px] border-[#838799] ${
                  filters.interiorScore === option
                    ? "bg-primary border-primary"
                    : ""
                }`}
                onClick={() => {
                  setFilters((pre) => ({
                    ...pre,
                    interiorScore: option,
                  }));
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm">Restroom Score</label>
          <div className="flex mt-2">
            {["Any", "At least Yellow", "Accessible"].map((option) => (
              <button
                key={option}
                className={`md:px-4 px-3 py-1 md:py-2 md:text-base text-sm rounded-lg mr-2 border-[1px] border-[#838799] ${
                  filters.restroomScore === option
                    ? "bg-primary border-primary"
                    : ""
                }`}
                onClick={() => {
                  setFilters((pre) => ({
                    ...pre,
                    restroomScore: option,
                  }));
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm">Parking</label>
          <div className="flex mt-2">
            {["Allowed"].map((option) => (
              <button
                key={option}
                className={`md:px-4 px-3 py-1 md:py-2 md:text-base text-sm rounded-lg mr-2 border-[1px] border-[#838799] ${
                  filters.hasParking === option
                    ? "bg-primary border-primary"
                    : ""
                }`}
                onClick={() => {
                  const newFilterValue =
                    filters.hasParking === option ? "" : option;
                  setFilters((pre) => ({ ...pre, hasParking: newFilterValue }));
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClearFilters}
            className="md:px-8  py-1 md:py-2 bg-gray-300 rounded-lg"
          >
            Clear
          </button>
          <button
            onClick={onApplyFilters}
            className="md:px-8 px-4 py-1 md:py-2 bg-primary md:text-base text-sm text-black rounded-lg"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
});

export default FilterModal;
