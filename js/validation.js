const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;

const ErrorMessage = {
  Hashtag: {
    INVALID_HASHTAG: 'введён невалидный хэштег',
    BIG_QUANTITY: 'превышено количество хэштегов',
    REPEAT_HASHTAG: 'хэштеги повторяются',
  },
  Comment: {
    BIG_COMMENT_LENGTH: `длина комментария больше ${MAX_COMMENT_LENGTH} символов`,
  },
};
let pristine = null;

let message = '';
const getMessage = () => message;

const createPristine = (uploadFormElement) =>
  new Pristine(uploadFormElement, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
  });

const validateHashtags = (hashtagsString) => {
  const trimmedHashtagString = hashtagsString.trim();
  if (!trimmedHashtagString) {
    return true;
  } else {
    const hashtags = trimmedHashtagString
      .toLowerCase()
      .split(' ')
      .filter((value) => value);
    if (hashtags.length > MAX_HASHTAG_COUNT) {
      message = ErrorMessage.Hashtag.BIG_QUANTITY;
      return false;
    }
    if (!hashtags.every((hashtag) => /^#[a-zа-яё0-9]{1,20}$/i.test(hashtag))) {
      message = ErrorMessage.Hashtag.INVALID_HASHTAG;
      return false;
    }
    const uniqueHashtags = [...new Set(hashtags)];
    if (uniqueHashtags.length !== hashtags.length) {
      message = ErrorMessage.Hashtag.REPEAT_HASHTAG;
      return false;
    }
    return true;
  }
};

const validateComment = (commentText) => {
  if (commentText.length > MAX_COMMENT_LENGTH) {
    message = ErrorMessage.Comment.BIG_COMMENT_LENGTH;
    return false;
  }
  return true;
};

const setValidation = (
  uploadFormElement,
  hashtagsValueElement,
  commentValueElement
) => {
  if (!pristine) {
    pristine = createPristine(uploadFormElement);

    pristine.addValidator(hashtagsValueElement, validateHashtags, getMessage);

    pristine.addValidator(commentValueElement, validateComment, getMessage);
  }
};

const validate = () => pristine.validate();
const resetValidation = () => pristine.reset();

export {
  setValidation,
  validate,
  resetValidation
};
