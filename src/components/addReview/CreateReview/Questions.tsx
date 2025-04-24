import React from "react";

interface Props {
  title: string;
  value?: null | boolean;
  onChange?: (e: null | boolean) => void;
}

interface RadioProps {
  title: string;
  onPress: () => void;
  value?: null | boolean;
}

const Radio: React.FC<RadioProps> = ({ title, onPress, value }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onPress}
        className={`h-5 w-5 rounded-full border ${
          value ? "border-blue-500" : "border-gray-400"
        } flex items-center justify-center`}
      >
        {value && <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />}
      </button>
      <span className="text-sm font-medium">{title}</span>
    </div>
  );
};

const Questions: React.FC<Props> = ({ title, onChange, value }) => {
  const onPressRadio = (e: boolean | null) => {
    if (onChange) {
      onChange(value === e ? null : e);
    }
  };

  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex items-center space-x-6 mt-2">
        <Radio title="Yes" onPress={() => onPressRadio(true)} value={value} />
        <Radio
          title="No"
          onPress={() => onPressRadio(false)}
          value={value === false}
        />
      </div>
    </div>
  );
};

export default Questions;
