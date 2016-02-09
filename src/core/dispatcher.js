
window.listen = window.listen || {}

export const dispatch = (type, data = null) => {
  console.log('dispatch', type)
  for (var i = 0; i < (window.listen[type] || []).length; i++) {
    window.listen[type][i](data)
  }
}

export const listenner = (type, func) => {
  if (!window.listen[type]) {
    window.listen[type] = [];
  }

  window.listen[type].push(func);
}
