import "./ReviewForm.css";
import { useCallback, useState } from "react";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import useAsync from "./hooks/useAsync";
import useTranslate from "./hooks/useTranslate";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm({
  initialValues = INITIAL_VALUES,
  initialPreview,
  onSubmitSuccess,
  onCancel,
  onSubmit,
}) {
  //   const [title, setTitle] = useState("");
  //   const [rating, setRating] = useState(0);
  //   const [content, setContent] = useState("");
  const t = useTranslate();
  const [values, setValues] = useState(initialValues);
  const [isSubmmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);

  //   const handleTitleChange = (e) => {
  //     setTitle(e.target.value);
  //   };

  //   const handleRatingChange = (e) => {
  //     const nextRating = Number(e.target.value) || 0;
  //     setRating(nextRating);
  //   };

  //   const handleContentChange = (e) => {
  //     setContent(e.target.value);
  //   };

  const handleChange = (name, value) => {
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);

    const result = await onSubmitAsync(formData);
    if (!result) return;

    const { review } = result;
    onSubmitSuccess(review);
    setValues(INITIAL_VALUES);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        className="ReviewForm-preview"
        name="imgFile"
        value={values.imgFile}
        initialPreview={initialPreview}
        onChange={handleChange}
      />
      <div className="ReviewForm-rows">
        <div className="ReviewForm-title-rating">
          <input
            className="ReviewForm-title"
            name="title"
            value={values.title}
            onChange={handleInputChange}
          ></input>
          <RatingInput
            className="ReviewForm-rating"
            name="rating"
            value={values.rating}
            onChange={handleChange}
          />
        </div>
        <textarea
          className="ReviewForm-content"
          name="content"
          value={values.content}
          onChange={handleInputChange}
        ></textarea>
        <div className="ReviewForm-error-buttons">
          <div className="ReviewForm-error">
            {submittingError?.message && <div>{submittingError.message}</div>}
          </div>
          <div className="ReviewForm-buttons">
            {onCancel && (
              <button className="ReviewForm-cancel-button" onClick={onCancel}>
                {t("cancel")}
              </button>
            )}
            <button
              className="ReviewForm-submit-button"
              type="submit"
              disabled={isSubmmitting}
            >
              {t("confirm")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
