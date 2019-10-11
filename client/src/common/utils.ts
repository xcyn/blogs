export function desensitization (str:string) {
  var len = str.length
  if (len > 3) {
    // X*****Y
    return str.substring(0,1) + '*'.repeat(len-2) + str.substring(len-1)
  }
  // **X
  return '*'.repeat(len-1) + str.substr(len-1)
}
