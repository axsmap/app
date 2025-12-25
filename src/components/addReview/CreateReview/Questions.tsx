import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  value?: null | boolean;
  onChange?: (e: null | boolean) => void;
}

interface SquareButtonProps {
  title: string;
  onPress: () => void;
  selected?: boolean;
  type: 'yes' | 'no';
}

const SquareButton: React.FC<SquareButtonProps> = ({ title, onPress, selected, type }) => {
  return (
    <button
      onClick={onPress}
      className={`
        px-8 py-3 min-w-[100px] font-semibold rounded-lg transition-all duration-200 shadow-sm
        ${selected 
          ? "bg-[#FFD12D] text-gray-900 shadow-md" 
          : "bg-gray-500 text-white hover:bg-gray-600"
        }
      `}
    >
      {title}
    </button>
  );
};

const Questions: React.FC<Props> = ({ title, onChange, value }) => {
  const { t } = useTranslation();

  const onPressButton = (selectedValue: boolean) => {
    if (onChange) {
      // Toggle: if already selected, deselect (null), otherwise select
      onChange(value === selectedValue ? null : selectedValue);
    }
  };

  return (
    <div className="py-4 border-b border-gray-200 last:border-b-0">
      <h3 className="text-base font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="flex items-center space-x-4">
        <SquareButton 
          title={t("yes")} 
          type="yes"
          onPress={() => onPressButton(true)} 
          selected={value === true} 
        />
        <SquareButton
          title={t("no")}
          type="no"
          onPress={() => onPressButton(false)}
          selected={value === false}
        />
      </div>
    </div>
  );
};

export default Questions;
