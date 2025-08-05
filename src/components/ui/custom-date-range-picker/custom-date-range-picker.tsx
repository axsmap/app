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
    <div className="relative">
      <label className="block text-[#363537] font-poppinsRegular text-2xs font-normal leading-8">
        {label}
      </label>

      <input
        readOnly
        className="block w-full px-4 py-3 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-[#363537] text-sm font-normal leading-8"
        value={`${format(range[0].startDate, "dd MMM yyyy")} to ${format(
          range[0].endDate,
          "dd MMM yyyy"
        )}`}
        ref={(ref) => {
          if (ref) {
            const handleClickOutside = (e: MouseEvent) => {
              if (ref && !ref.contains(e.target as Node)) {
                setShowPicker(false);
              }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
          }
        }}
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
