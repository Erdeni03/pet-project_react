export function formatPathNameRoute(route: string): string[] {
  const pathName = route.split('/')
  const result = []
  for (let i = 0; i < pathName.length; i++) {
    if (pathName[i] !== '') {
      if (pathName[i].includes('-')) {
        const separatedPath = pathName[i].split('-')
        separatedPath[1] =
          separatedPath[1][0].toUpperCase() +
          separatedPath[1].slice(1, separatedPath[1].length)
        pathName[i] = separatedPath.join('')
        result.push(pathName[i])
      } else {
        result.push(pathName[i])
      }
    }
  }
  return result
}
