const deepAssign = (obj1, obj2) => {
  const keys = Object.keys(obj1)
  for (const key of keys) {
    if (typeof obj1[key] === 'object') {
      obj1[key] = obj2[key] ? deepAssign(obj1[key], obj2[key]) : obj1[key]
    } else {
      obj1[key] = obj2[key] ? obj2[key] : obj1[key]
    }
  }

  return obj1
}

export {
  deepAssign,
}
