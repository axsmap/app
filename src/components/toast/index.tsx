"use client";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState
} from "react";
import "./toast.css";

type toastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: toastType;
  onClose?: () => void;
  id?: string;
}
export const toastRef = React.createRef<handler>();

export const showToast = (props: ToastProps) => {
  toastRef.current?.show(props);
};

interface handler {
  show: (props: ToastProps) => void;
}

const toastIcon = (type: toastType) => {
  if (type === "success") {
    return <i className="fas fa-check-circle mr-2 text-green-500"></i>;
  }
  if (type === "error") {
    return <i className="fas fa-info-circle mr-2 text-red-400"></i>;
  }
  if (type === "info") {
    return <i className="fas fa-info-circle mr-2 text-orange-500"></i>;
  }
};

const Toast = forwardRef<handler, {}>(({}, ref) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const show = useCallback(
    (props: ToastProps) => {
      const id = Math.random().toString(36).substring(2, 15);
      setToasts((pre) => [...pre, { ...props, id }]);
      setTimeout(() => {
        setToasts((pre) => pre.filter((toast) => toast.id !== id));
      }, 5000);
    },
    [toasts]
  );

  useImperativeHandle(ref, () => ({ show }), [show]);

  return (
    <div>
      {toasts.map((item, index) => (
        <div key={index} className="toast-container">
          <div
            onClick={() => {
              item?.onClose?.();
              setToasts((pre) => pre.filter((toast) => toast.id !== item.id));
            }}
            className={`toast ${item?.type}`}
          >
            {toastIcon(item?.type)}
            <div className="text-grey-800">{item?.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default Toast;
