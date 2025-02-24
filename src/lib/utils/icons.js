const svgResources = new Map()

function loadIcons() {
  let modules = import.meta.glob('@/assets/icons/**/*.svg', {
    query: '?raw',
    import: 'default',
    eager: true,
  })

  for (const fileName in modules) {
    const name = fileName.substring(fileName.lastIndexOf('/') + 1, fileName.length - 4)
    svgResources.set(name, modules[fileName])
  }
}

function getSvgIcon(name) {
  return svgResources.get(name)
}

export { loadIcons, getSvgIcon }
