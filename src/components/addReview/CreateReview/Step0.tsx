import React, { useState, useEffect } from "react";
import { createReviewValuesInterface } from "./interface";
import { Sparkle } from "lucide-react";
import { useAiReviewMutation } from "@/Services/modules/mapathon";
import { mapathon } from "@/Services/modules/mapathon/joinedMapathons";
import { useTranslation } from "react-i18next";

interface Props {
  initialValues: React.RefObject<createReviewValuesInterface>;
  nextStep: () => void;
  mapathons: mapathon[];
}

const Step0: React.FC<Props> = ({ nextStep, mapathons, initialValues }) => {
  const { t } = useTranslation();
  // Auto-select the first mapathon (user's active mapathon) as default
  const [selected, setSelected] = useState<null | string>(
    initialValues.current.step0.event || (mapathons?.length > 0 ? mapathons[0].id : null)
  );
  const [showError, setShowError] = useState(false);

  // Update selection when mapathons load and no selection exists
  useEffect(() => {
    if (!selected && mapathons?.length > 0) {
      const activeMapathon = mapathons[0].id;
      setSelected(activeMapathon);
      initialValues.current.step0.event = activeMapathon;
    }
  }, [mapathons, selected, initialValues]);

  const onSubmit = () => {
    if (!selected) {
      setShowError(true);
      return;
    }
    setShowError(false);
    initialValues.current.step0.event = selected;
    nextStep();
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex-1">
        <div className="flex justify-between mt-3">
          <label htmlFor="comment" className="text-[18px] font-bold mb-2">
            {t("selectMapathon")}
          </label>
        </div>
        <div className=" max-h-[250px] overflow-auto flex flex-col cursor-pointer rounded-[6px] p-3 gap-y-3">
          {mapathons?.map((item, index) => (
            <div
              onClick={
                selected === item?.id
                  ? () => {
                      setShowError(false);
                      setSelected("");
                    }
                  : () => {
                      setShowError(false);
                      setSelected(item?.id);
                    }
              }
              className={`${
                item?.id === selected ? "bg-primary-primary" : "bg-gray-100"
              } rounded-[6px] p-2`}
            >
              <p className="text-base text-black">{item?.name}</p>
              <p className="text-sm truncate w-auto text-gray-500">
                {item?.description}
              </p>
            </div>
          ))}
        </div>
        {showError && (
          <p className="text-red-500 text-sm">
            {t("selectMapathonError")}
          </p>
        )}
      </div>
      <div className="flex mt-5 gap-x-4">
        <button
          className="w-full bg-gray-300 rounded-[8px] py-3"
          onClick={() => {
            initialValues.current.step0.event = null;
            setShowError(false);
            setSelected("");
            nextStep();
          }}
        >
          {t("skip")}
        </button>
        <button
          className={`w-full bg-primary rounded-[8px] py-3 text-white`}
          onClick={onSubmit}
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
};

export default Step0;
