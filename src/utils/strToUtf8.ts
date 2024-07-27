const strToUtf8 = (str: string) => {
  const encoder = new TextEncoder()
  const utfArr = encoder.encode(str)
  const utf = utfArr.toString().replace(/,/g, "-")
  return utf
}

export default strToUtf8
