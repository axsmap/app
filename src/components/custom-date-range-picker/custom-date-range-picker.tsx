"use client";
import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Props = {
  label?: string;
  onChange: (range: { startDate: Date; endDate: Date; label: string }) => void;
  initialStartDate?: Date;
  initialEndDate?: Date;
};

const CustomDateRangePicker = ({
  label = "Select Duration",
  onChange,
  initialStartDate,
  initialEndDate,
}: Props) => {
  const [showPicker, setShowPicker] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: initialStartDate || new Date(),
      endDate: initialEndDate || new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const formattedLabel = `${format(
      range[0].startDate,
      "dd MMMM yyyy"
    )} to ${format(range[0].endDate, "dd MMMM yyyy")}`;
    onChange({
      startDate: range[0].startDate,
      endDate: range[0].endDate,
      label: formattedLabel,
    });
  }, [range]);

  return (
    <div className="relative mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <input
        readOnly
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 cursor-pointer"
        value={`${format(range[0].startDate, "dd MMM yyyy")} to ${format(
          range[0].endDate,
          "dd MMM yyyy"
        )}`}
        onClick={() => setShowPicker(!showPicker)}
      />

      {showPicker && (
        <div className="absolute z-20 mt-2 shadow-md">
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={range}
            rangeColors={["#FACC15"]}
          />
        </div>
      )}
    </div>
  );
};

export default CustomDateRangePicker;
