"use client";
import { useCreateMapathonSurveyMutation } from "@/Services/modules/mapathon";
import { useFormik } from "formik";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import * as Yup from "yup";
import CustomInput from "../ui/custom-input/custom-input";
import CustomSelect from "../ui/custom-select/custom-select";
import {
  createRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { showToast } from "../toast";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  features: Yup.string().required("Features field is required"),
  navigationEase: Yup.string().required("Navigation ease field is required"),
  accessibility: Yup.string().required("Accessibility field is required"),
  additionalFeatures: Yup.string().required(
    "Additional features field is required"
  ),
  motivation: Yup.string().required("Motivation field is required"),
  // Optional fields
  challenges: Yup.string(),
  satisfaction: Yup.string(),
  recommend: Yup.string(),
  frequency: Yup.string(),
  featuresReason: Yup.string().when("features", {
    is: "Other",
    then: (schema) => schema.required("Please explain your other feature"),
  }),
  navigationEaseReason: Yup.string().when("navigationEase", {
    is: "Impossible",
    then: (schema) =>
      schema.required("Please explain why navigation is impossible"),
  }),
});

interface handler {
  show: () => void;
  hide: () => void;
}

export const surveyRef = createRef<handler>();

export const showServeyModal = () => {
  surveyRef.current?.show?.();
};

const SurveyModal = forwardRef<handler, {}>(({}, ref) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const featuresValues = [
    t("mapathonsTitle"),
    t("homeAddReviewButton"),
    t("homeNoRatingsMessage"),
    t("other") ?? "Other",
  ];
  const navigationValues = [
    t("veryEasy") ?? "Very Easy",
    t("easy") ?? "Easy",
    t("notEasy") ?? "Not Easy",
    t("veryHard") ?? "Very Hard",
    t("impossible") ?? "Impossible",
  ];

  const formik = useFormik({
    initialValues: {
      features: "",
      navigationEase: "",
      challenges: "",
      accessibility: "",
      additionalFeatures: "",
      motivation: "",
      satisfaction: "",
      recommend: "",
      frequency: "",
      featuresReason: "",
      navigationEaseReason: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const data = {
        ...values,
        features:
          values.features === "Other" ? values.featuresReason : values.features,
        navigationEase:
          values.navigationEase === "Impossible"
            ? values.navigationEaseReason
            : values.navigationEase,
      };
      try {
        const res: any = await surveyData(data).unwrap();
        if (res.error) {
          showToast({ message: res?.error?.message, type: "error" });
        } else {
          formik.resetForm();
          setVisible(false);
          // setIsSurveyOpen(false);
          showToast({ message: "Survey Submitted Successfully", type: "success" });
        }
      } catch (error: any) {
        showToast({ message: error?.message, type: "error" });
      }
    },
  });

  const [surveyData, { isLoading }] = useCreateMapathonSurveyMutation();

  const show = useCallback(() => {
    formik.resetForm();
    // formik.setTouched({});
    setVisible(true);
  }, [formik]);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  useImperativeHandle(ref, () => ({ show, hide }), [show, hide]);

  if (!visible) return null;

  const yesNoOptions = [
    { value: "", label: t("selectAnOption") },
    { value: "yes", label: t("yes") },
    { value: "no", label: t("no") },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white px-12 py-12 max-w-2xl  mx-auto overflow-y-auto max-h-[70vh] relative  ">
        <button
          onClick={hide}
          className="absolute top-6 right-4 text-xl text-gray-600 hover:text-gray-800"
        >
          <AiOutlineClose />
        </button>

        <h3 className="text-xl font-semibold mb-2">AXS Map Survey</h3>
        <p className="text-gray-700 mb-4">
          We would love to hear your thoughts and feedback on the AXS Map app.
          Please take a moment to answer the following questions.
        </p>

        <div className="mb-4">
          <CustomSelect
            options={[{ value: "", label: t("selectAnOption") }, ...featuresValues.map((it) => ({ value: it, label: it }))]}
            label={t("survey.featuresLabel") ?? "What features do you use most on AXS Map?"}
            name="features"
            value={formik.values.features}
            onChange={(e) => formik.setFieldValue("features", e.target.value)}
            error={
              formik.touched?.features && formik.errors?.features
                ? formik.errors?.features
                : ""
            }
            onBlur={() => formik.setFieldTouched("features")}
          />
        </div>
        {formik.values.features === "Other" && (
          <div className="mb-4">
            <CustomInput
              label="Please explain your other feature"
              type="text"
              name="features"
              value={formik.values?.featuresReason}
              onChange={(e) =>
                formik.setFieldValue("featuresReason", e.target.value)
              }
              error={
                formik.touched?.featuresReason && formik.errors?.featuresReason
                  ? formik.errors?.featuresReason
                  : ""
              }
              onBlur={() => formik.setFieldTouched("featuresReason")}
            />
          </div>
        )}
        <div className="mb-4">
          <CustomSelect
            options={[{ value: "", label: t("selectAnOption") }, ...navigationValues.map((it) => ({ value: it, label: it }))]}
            label={t("survey.navigationLabel") ?? "How easy is it to navigate the app?"}
            name="navigationEase"
            value={formik.values.navigationEase}
            onChange={(e) =>
              formik.setFieldValue("navigationEase", e.target.value)
            }
            onBlur={() => formik.setFieldTouched("navigationEase")}
            error={
              formik.touched?.navigationEase && formik.errors?.navigationEase
                ? formik.errors?.navigationEase
                : ""
            }
          />
        </div>
        {formik.values.navigationEase === "Impossible" && (
          <div className="mb-4">
            <CustomInput
              label="Please explain why navigation is impossible"
              type="text"
              name="navigationEaseReason"
              value={formik.values?.navigationEaseReason}
              onChange={(value) =>
                formik.setFieldValue("navigationEaseReason", value)
              }
              error={
                formik.touched?.navigationEaseReason &&
                formik.errors?.navigationEaseReason
                  ? formik.errors?.navigationEaseReason
                  : ""
              }
              onBlur={() => formik.setFieldTouched("navigationEaseReason")}
            />
          </div>
        )}
        <div className="mb-4">
          <CustomInput
            label="What challenges have you faced using AXS Map?"
            type="text"
            name="challenges"
            value={formik.values?.challenges}
            onChange={(e) => formik.setFieldValue("challenges", e.target.value)}
            error={
              formik.touched?.challenges && formik.errors?.challenges
                ? formik.errors?.challenges
                : ""
            }
            onBlur={() => formik.setFieldTouched("challenges")}
          />
        </div>

        <div className="mb-4">
          <CustomInput
            label="How can we improve accessibility ratings?"
            type="text"
            name="accessibility"
            value={formik.values?.accessibility}
            onChange={(e) =>
              formik.setFieldValue("accessibility", e.target.value)
            }
            error={
              formik.touched?.accessibility && formik.errors?.accessibility
                ? formik.errors?.accessibility
                : ""
            }
            onBlur={() => formik.setFieldTouched("accessibility")}
          />
        </div>

        <div className="mb-4">
          <CustomInput
            label="Any additional features you'd like to see?"
            type="text"
            name="additionalFeatures"
            value={formik.values?.additionalFeatures}
            onChange={(e) =>
              formik.setFieldValue("additionalFeatures", e.target.value)
            }
            error={
              formik.touched?.additionalFeatures &&
              formik.errors?.additionalFeatures
                ? formik.errors?.additionalFeatures
                : ""
            }
            onBlur={() => formik.setFieldTouched("additionalFeatures")}
          />
        </div>
        <div className="mb-4">
          <CustomInput
            label="What motivates you to participate in Mapathons?"
            type="text"
            name="motivation"
            value={formik.values?.motivation}
            onChange={(e) => formik.setFieldValue("motivation", e.target.value)}
            error={
              formik.touched?.motivation && formik.errors?.motivation
                ? formik.errors?.motivation
                : ""
            }
            onBlur={() => formik.setFieldTouched("motivation")}
          />
        </div>

        <div className="mb-4">
          <CustomSelect
            options={[{ value: "", label: t("selectAnOption") }, ...yesNoOptions]}
            label={t("survey.satisfactionLabel") ?? "Are you satisfied with the app?"}
            name="satisfaction"
            value={formik.values.satisfaction}
            onChange={(e) =>
              formik.setFieldValue("satisfaction", e.target.value)
            }
            error={
              formik.touched?.satisfaction && formik.errors?.satisfaction
                ? formik.errors?.satisfaction
                : ""
            }
            onBlur={() => formik.setFieldTouched("satisfaction")}
          />
        </div>

        <div className="mb-4">
          <CustomSelect
            options={[{ value: "", label: t("selectAnOption") }, ...yesNoOptions]}
            label={t("survey.recommendLabel") ?? "Would you recommend it to others?"}
            name="recommend"
            value={formik.values.recommend}
            onChange={(e) => formik.setFieldValue("recommend", e.target.value)}
            error={
              formik.touched?.recommend && formik.errors?.recommend
                ? formik.errors?.recommend
                : ""
            }
            onBlur={() => formik.setFieldTouched("recommend")}
          />
        </div>

        <div className="mb-4">
          <CustomInput
            label="What would make you use it more often?"
            type="text"
            name="frequency"
            value={formik.values?.frequency}
            onChange={(e) => formik.setFieldValue("frequency", e.target.value)}
            error={
              formik.touched?.frequency && formik.errors?.frequency
                ? formik.errors?.frequency
                : ""
            }
            onBlur={() => formik.setFieldTouched("frequency")}
          />
        </div>

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={hide}
            className="bg-gray-300 text-black py-2 px-4 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => formik.handleSubmit()}
            className="bg-yellow-500 text-black py-2 px-4 rounded-lg"
          >
            <div className="flex items-center justify-center gap-2">
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Submit"
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
});

export default SurveyModal;
