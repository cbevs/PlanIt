const cleanUserInput = (formInput) => {
  Object.keys(formInput).forEach((field) => {
    if (formInput[field] === "") {
      delete formInput[field]
    }
  })
  const submittedRating = parseInt(formInput.rating)
  formInput.rating = submittedRating
  if(isNaN(formInput.rating)) {
    delete formInput.rating
  }
  return formInput
}

export default cleanUserInput
