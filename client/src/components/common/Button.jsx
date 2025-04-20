import React from "react";
import {
  ChevronRight,
  Check,
  X,
  Plus,
  Edit,
  Trash2,
  Send,
  Download,
  Upload,
  Save,
  RefreshCw,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

// Mapping of icon types to Lucide icons
const iconMap = {
  next: ChevronRight,
  check: Check,
  close: X,
  add: Plus,
  edit: Edit,
  delete: Trash2,
  send: Send,
  download: Download,
  upload: Upload,
  save: Save,
  refresh: RefreshCw,
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: XCircle,
  alert: AlertCircle,
};

function Button({
  children,
  variant = "default",
  size = "medium",
  leftIcon,
  rightIcon,
  onClick,
  disabled = false,
  loading = false,
  className = "",
  type = "button",
}) {
  // Variant styles
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-50",
    ghost: "text-blue-500 hover:bg-blue-50",
    success: "bg-green-500 text-white hover:bg-green-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
  };

  // Size styles
  const sizeStyles = {
    small: "px-2 py-1 text-xs rounded",
    medium: "px-4 py-2 text-sm rounded-md",
    large: "px-6 py-3 text-base rounded-lg",
  };

  // Determine icon components
  const LeftIconComponent = leftIcon ? iconMap[leftIcon] : null;
  const RightIconComponent = rightIcon ? iconMap[rightIcon] : null;
  const LoadingIcon = iconMap["refresh"];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        flex items-center justify-center 
        transition-all duration-300 
        ${variantStyles[variant]} 
        ${sizeStyles[size]}
        ${
          disabled || loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:shadow-md"
        }
        ${className}
      `}
    >
      {loading ? (
        <LoadingIcon className="mr-2 animate-spin" size={16} />
      ) : (
        LeftIconComponent && <LeftIconComponent className="mr-2" size={16} />
      )}

      {children}

      {!loading && RightIconComponent && (
        <RightIconComponent className="ml-2" size={16} />
      )}
    </button>
  );
}

export default Button;

// // Example usage component
// export default function Buttonshowcase() {
//   return (
//     <div className="flex flex-wrap gap-4 p-4">
//       <Button leftIcon="add">Add Item</Button>
//       <Button variant="outline" rightIcon="next">
//         Next Step
//       </Button>
//       <Button variant="success" leftIcon="check">
//         Confirm
//       </Button>
//       <Button variant="danger" leftIcon="delete">
//         Delete
//       </Button>
//       <Button loading>Processing</Button>
//       <Button variant="warning" rightIcon="warning">
//         Warning
//       </Button>
//     </div>
//   );
// }
