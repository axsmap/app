import React from "react";

interface Props {
  title: string;
  value?: null | boolean;
  onChange?: (e: null | boolean) => void;
}

interface RadioProps {
  title: string;
  onPress: () => void;
  selected?: boolean;
}

const Radio: React.FC<RadioProps> = ({ title, onPress, selected }) => {
  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={onPress}
        className={`h-6 w-6 rounded-full border-2 transition-all duration-200 ${
          selected 
            ? "border-primary bg-white" 
            : "border-gray-400 bg-white hover:border-gray-500"
        } flex items-center justify-center`}
      >
        {selected && (
          <div className="h-3 w-3 rounded-full bg-primary" />
        )}
      </button>
      <span className="text-base font-medium text-gray-700">{title}</span>
    </div>
  );
};

const Questions: React.FC<Props> = ({ title, onChange, value }) => {
  const onPressRadio = (selectedValue: boolean) => {
    if (onChange) {
      // Toggle: if already selected, deselect (null), otherwise select
      onChange(value === selectedValue ? null : selectedValue);
    }
  };

  return (
    <div className="py-3 border-b border-gray-100 last:border-b-0">
      <h3 className="text-base font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="flex items-center space-x-8">
        <Radio 
          title="Yes" 
          onPress={() => onPressRadio(true)} 
          selected={value === true} 
        />
        <Radio
          title="No"
          onPress={() => onPressRadio(false)}
          selected={value === false}
        />
      </div>
    </div>
  );
};

export default Questions;
