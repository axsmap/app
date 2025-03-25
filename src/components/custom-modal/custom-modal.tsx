// "use client";
// import React, { ChangeEvent } from "react";
// import Image from "next/image";
// import CloseMenuIcon from "@/assets/icons/close-menu-icon";
// import ArrowLeftIcon from "@/assets/icons/arrow-left-icon";

// interface CustomModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onNextStep: () => void;
//   onPreviousStep: () => void;
//   stepText: string;
//   imageSrc: any;
//   title: string;
//   description: string;
//   isFinalStep: boolean;
//   onYes: () => void;
//   onNo: () => void;
//   setReviewText: React.Dispatch<React.SetStateAction<string>>;
//   reviewText: string;

//   onSubmitReview: () => void;
// }

// const CustomModal: React.FC<CustomModalProps> = ({
//   isOpen,
//   onClose,
//   onNextStep,
//   onPreviousStep,
//   stepText,
//   imageSrc,
//   title,
//   description,
//   isFinalStep,
//   reviewText,
//   setReviewText,
//   onYes,
//   onNo,
//   onSubmitReview,
// }) => {
//   if (!isOpen) return null;

//   const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     setReviewText(e.target.value);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//       <div className="w-[450px] bg-white rounded-xl border border-[#D9DADF] shadow-lg p-6 flex flex-col items-center gap-4">
//         <div className="flex justify-between items-center w-full">
//           <span className="text-sm text-gray-500">{stepText}</span>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <CloseMenuIcon />
//           </button>
//         </div>

//         {!isFinalStep && (
//           <>
//             <Image
//               src={imageSrc}
//               width={400}
//               height={400}
//               alt="Modal Image"
//               className="w-[187px] h-[138px] object-cover"
//             />
//             <h2 className="text-[24px] font-semibold text-black text-center">
//               {title}
//             </h2>
//             <p className="text-[16px] text-[#5D606D] text-center">
//               {description}
//             </p>
//           </>
//         )}

//         {isFinalStep ? (
//           <div className=" w-full">
//             <h5>Comments</h5>
//             <textarea
//               className="w-full p-2 border border-[#D9DADF] rounded-lg"
//               rows={4}
//               value={reviewText}
//               onChange={handleReviewChange}
//               placeholder="Enter you comments..."
//             />
//             <button
//               onClick={onSubmitReview}
//               className="btn-primary w-full mt-4 py-2"
//             >
//               Submit Review
//             </button>
//           </div>
//         ) : (
//           <div className="flex gap-4">
//             <button className="btn-secondary w-[120px] py-2" onClick={onNo}>
//               No
//             </button>
//             <button className="btn-primary w-[120px] py-2" onClick={onYes}>
//               Yes
//             </button>
//           </div>
//         )}
//         {!isFinalStep && (
//           <div className="flex justify-between items-center w-full mt-4">
//             <button
//               className="btn-secondary w-[120px] py-2"
//               onClick={onPreviousStep}
//             >
//               Previous
//             </button>
//             <button
//               className="text-[#787879] text-[16px] font-medium"
//               onClick={onNextStep}
//             >
//               Skip
//             </button>
//             <button className="" onClick={onNextStep}>
//               <ArrowLeftIcon />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomModal;

"use client";
import React, { ChangeEvent } from "react";
import Image from "next/image";
import CloseMenuIcon from "@/assets/icons/close-menu-icon";
import ArrowLeftIcon from "@/assets/icons/arrow-left-icon";
import ArrowRightIcon from "@/assets/icons/arrow-right-icon";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  stepText: string;
  imageSrc: any;
  title: string;
  description: string;
  isFinalStep: boolean;
  onYes: () => void;
  onNo: () => void;
  setReviewText: React.Dispatch<React.SetStateAction<string>>;
  reviewText: string;

  onSubmitReview: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  onNextStep,
  onPreviousStep,
  stepText,
  imageSrc,
  title,
  description,
  isFinalStep,
  reviewText,
  setReviewText,
  onYes,
  onNo,
  onSubmitReview,
}) => {
  if (!isOpen) return null;

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="w-[450px] bg-white rounded-xl border border-[#D9DADF] shadow-lg p-6 flex flex-col items-center gap-4 relative">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm text-gray-500">{stepText}</span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <CloseMenuIcon />
          </button>
        </div>

        {!isFinalStep && (
          <>
            <Image
              src={imageSrc}
              width={150}
              height={150}
              alt="Modal Image"
              className="w-[187px] h-[138px] object-cover"
            />
            <h2 className="text-[24px] font-semibold text-black text-center">
              {title}
            </h2>
            <p className="text-[16px] text-[#5D606D] text-center">
              {description}
            </p>
          </>
        )}

        {isFinalStep ? (
          <div className=" w-full">
            <h5>Comments</h5>
            <textarea
              className="w-full p-2 border border-[#D9DADF] rounded-lg"
              rows={4}
              value={reviewText}
              onChange={handleReviewChange}
              placeholder="Enter your comments..."
            />
            <button
              onClick={onSubmitReview}
              className="btn-primary w-full mt-4 py-2"
            >
              Submit Review
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button className="btn-secondary w-[120px] py-2" onClick={onNo}>
              No
            </button>
            <button className="btn-primary w-[120px] py-2" onClick={onYes}>
              Yes
            </button>
          </div>
        )}

        {!isFinalStep && (
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex justify-between w-full px-4">
            <button
              onClick={onPreviousStep}
              className="flex justify-center items-center w-2 h-2 "
            >
              <ArrowRightIcon />
            </button>
            <button
              onClick={onNextStep}
              className="flex justify-center items-center w-2 h-2"
            >
              <ArrowLeftIcon />
            </button>
          </div>
        )}

        {!isFinalStep && (
          <button
            className="text-[#787879] text-[16px] font-medium mt-2"
            onClick={onNextStep}
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomModal;
