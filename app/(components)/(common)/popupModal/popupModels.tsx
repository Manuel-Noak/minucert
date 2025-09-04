import React, { useEffect, useState } from "react";
import styles from "./popupModels.module.css";
import Image from "next/image";
import checkImg from "@/app/assets/img/check.png";
import { CourseFormsData } from "@/app/admin/dashboard/manage-courses/ManageCoursesSection";

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCourseSubmit?: (formData: CourseFormData) => void;
  editCourseValues?: CourseFormsData;
}
interface AddProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (formData: ProviderData) => void;
}
interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (formData: AdminData) => void;
}

export interface CourseFormData {
  courseName: string;
  courseCode: string;
  coursePrice: string;
  thumbnailLink: string;
  provider: string;
  currency: string;
  category: string;
}

export interface ProviderData {
  name: string;
  website: string;
  apiBaseUrl: string;
}
export interface MessageProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  status: boolean;
  moreDetails?: string;
}
export interface AdminData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  username: string;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isOpen,
  onClose,
  onCourseSubmit,
  editCourseValues,
}) => {
  const [selectProviders, setProviders] = useState<ProviderData[]>([]);
  const [formData, setFormData] = useState<CourseFormData>({
    courseName: "",
    courseCode: "",
    coursePrice: "",
    thumbnailLink: "",
    provider: "",
    currency: "",
    category: "All Course",
  });
  const [selectCategories, setCategories] = useState<{ name: string }[]>([]);

  const currency = [
    {
      name: "NGN",
      code: "566",
    },
  ];

  useEffect(() => {
    const tempCategories = [{ name: "All course" }];
    if (editCourseValues) {
      setFormData({
        category: editCourseValues.category,
        courseCode: editCourseValues.courseCode,
        thumbnailLink: editCourseValues.thumbnailLink,
        coursePrice: editCourseValues.coursePrice,
        courseName: editCourseValues.courseName,
        currency: editCourseValues.currency,
        provider: editCourseValues.provider,
      });
    }
    fetch("/api/getProviders")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(tempCategories);
          setProviders(data.providers);
          // Set default provider if not in edit mode
          if (!editCourseValues && data.providers.length > 0) {
            setFormData((prev) => ({
              ...prev,
              provider: data.providers[0].name,
            }));
          }
        }
      })
      .catch(() => {});
  }, [editCourseValues]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCurrencyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      currency: e.target.value,
    }));
  };

  const handleCoursePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^\d,]/g, "");
    const numericValue = value.replace(/,/g, "");

    if (numericValue === "" || /^\d+$/.test(numericValue)) {
      const formattedValue = numericValue
        ? parseInt(numericValue).toLocaleString()
        : "";

      setFormData((prev) => ({
        ...prev,
        coursePrice: formattedValue,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onCourseSubmit) {
      onCourseSubmit(formData);
    }
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      courseName: "",
      courseCode: "",
      coursePrice: "",
      thumbnailLink: "",
      provider: "",
      currency: "",
      category: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay} onClick={handleClose}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal_header}>
          <h2 className={styles.modal_title}>
            {editCourseValues ? "Edit Course" : "Add Course"}
          </h2>
          <button
            type="button"
            className={styles.close_button}
            onClick={handleClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Course Name</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
              className={styles.form_input}
              placeholder="E.g, Executive"
              required
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label}>Course Id</label>
            <input
              type="text"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleInputChange}
              className={styles.form_input}
              placeholder="1069"
              required
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label}>Course Price</label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                name="coursePrice"
                value={formData.coursePrice ? `₦${formData.coursePrice}` : ""}
                onChange={handleCoursePriceChange}
                className={styles.form_input}
                placeholder="₦150,000"
                style={{ paddingLeft: "20px" }}
                required
              />
            </div>
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label}>
              ThumbnailLink url(Optional)
            </label>
            <input
              type="url"
              name="thumbnailLink"
              value={formData.thumbnailLink}
              onChange={handleInputChange}
              className={styles.form_input}
              placeholder="https://www.aicerts.ai/wp-content/uploads/2025/07/AIC_AI-Executive.svg"
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label}>Provider</label>
            <div className={styles.select_container}>
              <select
                name="provider"
                value={formData.provider}
                onChange={handleInputChange}
                className={styles.form_select}
                required
              >
                {selectProviders.map((provider, index) => (
                  <option key={index} value={provider.name}>
                    {provider.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label}>Currency</label>
            {currency?.length > 0 ? (
              <div className={styles.select_container}>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleCurrencyChange}
                  className={styles.form_select}
                  required
                >
                  <option value="">Choose Currency</option>
                  {currency.map((currency, index) => (
                    <option value={currency.name} key={index}>
                      {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className={styles.form_input}
                placeholder="₦"
                required
              />
            )}
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label}>Category</label>
            <div className={styles.select_container}>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={styles.form_select}
                required
              >
                {selectCategories.map((category, index) => (
                  <option value={category.name} key={index}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className={styles.submit_button}>
            {editCourseValues ? "Edit Course" : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;

export const AddProviderModal: React.FC<AddProviderModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ProviderData>({
    name: "",
    apiBaseUrl: "",
    website: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      website: "",
      apiBaseUrl: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay} onClick={handleClose}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal_header}>
          <h2 className={styles.modal_title}>Add Provider</h2>
          <button
            type="button"
            className={styles.close_button}
            onClick={handleClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Provider Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.form_input}
              placeholder="AI Cert"
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Api BaseUrl</label>
            <input
              type="text"
              name="apiBaseUrl"
              value={formData.apiBaseUrl}
              onChange={handleInputChange}
              className={styles.form_input}
              placeholder=""
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Website</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className={styles.form_input}
              placeholder="aicerts.ai"
              required
            />
          </div>

          <button type="submit" className={styles.submit_button}>
            Add Provider
          </button>
        </form>
      </div>
    </div>
  );
};

export interface MessageProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  status: boolean;
  moreDetails?: string;
}

export const MessageModal: React.FC<MessageProps> = ({
  isOpen,
  onClose,
  header,
  status,
  moreDetails,
}) => {
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Modal Container - Using absolute positioning as per design specs */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "706px",
          height: "517px",
          background: "#FFFFFF",
          border: "0.94px solid #EFEFEF",
          borderRadius: "10px",
          position: "relative",
          opacity: 1,
        }}
      >
        {/* First Circle (Outermost) - positioned as per specs */}
        <div
          style={{
            width: "134px",
            height: "134px",
            background: status ? "#BBE8BF" : "#FFCCCB",
            borderRadius: "50%",
            position: "absolute",
            top: "30px", // Adjusted from original 330px to fit within modal
            left: "286px", // Centered: (706-134)/2 = 286px
            opacity: 1,
          }}
        />

        {/* Second Circle (Middle) - positioned as per specs */}
        <div
          style={{
            width: "118.925px",
            height: "118.925px",
            background: status ? "#1EB12D" : "#FF6B6B",
            borderRadius: "50%",
            position: "absolute",
            top: "37.54px", // 30 + 7.54
            left: "293.54px", // 286 + 7.54
            opacity: 1,
          }}
        />

        {/* Third Circle (Innermost) - positioned as per specs */}
        <div
          style={{
            width: "96.3125px",
            height: "96.3125px",
            background: status ? "#18902C" : "#FF4444",
            borderRadius: "50%",
            position: "absolute",
            top: "48.43px", // 30 + 18.43
            left: "304.43px", // 286 + 18.43
            opacity: 1,
          }}
        />

        {/* Check Icon - positioned as per specs */}
        <div
          style={{
            width: "48px",
            height: "34.65px",
            position: "absolute",
            top: "79px", // 30 + 49
            left: "329px", // 286 + 43
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            fontSize: "48px",
            fontWeight: "bold",
            opacity: 1,
          }}
        >
          {status ? "✓" : "✕"}
        </div>

        {/* Message Title - positioned as per specs */}
        <h2
          style={{
            fontFamily:
              'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: 700,
            fontStyle: "normal",
            fontSize: "35px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#000000B2",
            width: "488px",
            height: "44px",
            position: "absolute",
            top: "194px", // Adjusted from original 494px to fit within modal
            left: "109px", // (706-488)/2 = 109px
            margin: 0,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 1,
          }}
        >
          {header}
        </h2>

        {/* Message Description - positioned below title */}
        {moreDetails && (
          <div
            style={{
              position: "absolute",
              top: "260px",
              left: "50px",
              maxWidth: "606px", // Modal width - padding
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily:
                  'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 400,
                fontSize: "20px", // Slightly smaller to fit better
                lineHeight: "140%", // Added line height for readability
                letterSpacing: "0%",
                textAlign: "center",
                color: "#001A32",
                display: "block",
              }}
            >
              <span style={{ fontWeight: 600 }}>{moreDetails}</span>
            </span>
          </div>
        )}

        {/* Continue Button - positioned as per specs */}
        <button
          onClick={handleClose}
          style={{
            width: "400px",
            height: "54px",
            position: "absolute",
            top: "420px", // Near bottom of modal
            left: "153px", // (706-400)/2 = 153px
            borderRadius: "50px",
            paddingTop: "17px",
            paddingRight: "72px",
            paddingBottom: "17px",
            paddingLeft: "72px",
            background: "#000000CC",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            opacity: 1,
          }}
        >
          <span
            style={{
              fontFamily:
                'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: 600,
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0%",
              color: "#FFBB15",
            }}
          >
            Continue
          </span>
        </button>
      </div>
    </div>
  );
};

export const AddAdminModal: React.FC<AddAdminModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<AdminData>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    role: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      username: "",
      role: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay} onClick={handleClose}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal_header}>
          <h2 className={styles.modal_title}>Add Admin</h2>
          <button
            type="button"
            className={styles.close_button}
            onClick={handleClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.form_group}>
            <label className={styles.form_label}>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={styles.form_input}
              placeholder="John"
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={styles.form_input}
              placeholder="Doe"
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.form_input}
              placeholder="Email"
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={styles.form_input}
              placeholder="Admin"
              required
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label}>Username(Unique)</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={styles.form_input}
              placeholder="johndoe"
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.form_label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.form_input}
              placeholder="****"
              required
            />
          </div>

          <button type="submit" className={styles.submit_button}>
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
};
