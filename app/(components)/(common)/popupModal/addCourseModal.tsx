import React, { useEffect, useState } from "react";
import styles from "./AddCourseModal.module.css";

interface AddCourseModalProps {
<<<<<<< HEAD
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (formData: CourseFormData) => void;
}

interface CourseFormData {
    courseName: string;
    courseCode: string;
    coursePrice: string;
    previewUrl: string;
    provider: string;
    currency: string;
    category: string;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({
    isOpen,
    onClose,
    onSubmit
}) => {
    const [formData, setFormData] = useState<CourseFormData>({
        courseName: "",
        courseCode: "",
        coursePrice: "",
        previewUrl: "",
        provider: "",
        currency: "",
        category: ""
=======
  isOpen: boolean;
  onClose: () => void;
  onCourseSubmit?: (formData: CourseFormData) => void;
}
interface AddProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (formData: ProviderData) => void;
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
>>>>>>> e06e757 (payment_integration_v2)
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Special handler for course price input
    const handleCoursePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        
        // Remove all non-numeric characters (except for the ₦ symbol and commas)
        value = value.replace(/[^\d,]/g, '');
        
        // Remove any existing commas to work with raw numbers
        const numericValue = value.replace(/,/g, '');
        
        // Only proceed if the value is numeric or empty
        if (numericValue === '' || /^\d+$/.test(numericValue)) {
            // Add commas for thousands separator
            const formattedValue = numericValue ? parseInt(numericValue).toLocaleString() : '';
            
            setFormData(prev => ({
                ...prev,
                coursePrice: formattedValue
            }));
        }
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
            courseName: "",
            courseCode: "",
            coursePrice: "",
            previewUrl: "",
            provider: "",
            currency: "",
            category: ""
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal_overlay} onClick={handleClose}>
            <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
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
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                name="coursePrice"
                                value={formData.coursePrice ? `₦${formData.coursePrice}` : ''}
                                onChange={handleCoursePriceChange}
                                className={styles.form_input}
                                placeholder="₦150,000"
                                style={{ paddingLeft: '20px' }}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.form_group}>
                        <label className={styles.form_label}>Preview url</label>
                        <input
                            type="url"
                            name="previewUrl"
                            value={formData.previewUrl}
                            onChange={handleInputChange}
                            className={styles.form_input}
                            placeholder="https://www.aicerts.ai/wp-content/uploads/2025..."
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
                            <option value="">Select Provider</option>
                            <option value="AI Certification">AI Certification</option>
                            <option value="Tech Institute">Tech Institute</option>
                            <option value="Business Academy">Business Academy</option>
                            <option value="Digital Learning">Digital Learning</option>
                        </select>
                    </div>

                    <div className={styles.form_group}>
                        <label className={styles.form_label}>Currency</label>
                        <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleInputChange}
                            className={styles.form_select}
                            required
                        >
                            <option value="">Select Currency</option>
                            <option value="NGN">NGN</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </div>

                    <div className={styles.form_group}>
                        <label className={styles.form_label}>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className={styles.form_select}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="AI & Machine Learning">AI & Machine Learning</option>
                            <option value="Business Management">Business Management</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Technology">Technology</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                        </select>
                    </div>

                    <button type="submit" className={styles.submit_button}>
                        Add Course
                    </button>
                </form>
            </div>
<<<<<<< HEAD
=======
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
            <select
              name="currency"
              value={formData.currency || "NGN"}
              onChange={handleInputChange}
              className={styles.form_select}
              required
            >
              <option value="NGN">NGN</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
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
>>>>>>> e06e757 (payment_integration_v2)
        </div>
    );
};

export default AddCourseModal;