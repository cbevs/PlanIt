const cleanUserInput = (formInput) => {
  Object.keys(formInput).forEach((field) => {
    if (formInput[field] === "") {
      delete formInput[field]
    }
  })
  const submittedRating = parseInt(formInput.rating)
  formInput.rating = submittedRating
  return formInput
}

export default cleanUserInput
