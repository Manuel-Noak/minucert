import React, { useEffect, useState } from "react";
import styles from "./AddCourseModal.module.css";

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCourseSubmit?: (formData: CourseFormData) => void;
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
}) => {
  const [formData, setFormData] = useState<CourseFormData>({
    courseName: "",
    courseCode: "",
    coursePrice: "",
    thumbnailLink: "",
    provider: "",
    currency: "",
    category: "",
  });
  const [selectCategories, setCategories] = useState<ProviderData[]>([]);
  const [selectProviders, setProviders] = useState<ProviderData[]>([]);
  const [toggleCategoryInput, setToggleCategoryInput] = useState(false);

  useEffect(() => {
    fetch("/api/getProviders")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.categories);
          setProviders(data.providers);
        }
      })
      .catch(() => {});
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "category" && value === "input") {
      setToggleCategoryInput(true);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Special handler for course price input
  const handleCoursePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Remove all non-numeric characters (except for the ₦ symbol and commas)
    value = value.replace(/[^\d,]/g, "");

    // Remove any existing commas to work with raw numbers
    const numericValue = value.replace(/,/g, "");

    // Only proceed if the value is numeric or empty
    if (numericValue === "" || /^\d+$/.test(numericValue)) {
      // Add commas for thousands separator
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
          <h2 className={styles.modal_title}>Add Course</h2>
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
            <label className={styles.form_label}>Course Code</label>
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

          <div className={styles.form_group}>
            <label className={styles.form_label}>Currency</label>
            <input
              type="text"
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className={styles.form_input}
              placeholder="₦"
              required
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label}>Category</label>
            {formData.category.length === 0 && !toggleCategoryInput ? (
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={styles.form_select}
                required
              >
                <option value="input">Input Custom Categroy</option>
                {selectCategories.map((category, index) => (
                  <option value={category.name} key={index}>
                    {category.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className={styles.form_input}
                type="text"
                name="category"
                placeholder="Input category"
                value={formData.category}
                onChange={handleInputChange}
              />
            )}
          </div>

          <button type="submit" className={styles.submit_button}>
            Add Course
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
