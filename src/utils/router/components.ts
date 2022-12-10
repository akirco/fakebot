// import type { App } from 'vue'

export function getViews() {
  const components = import.meta.glob('../../views/**/*.vue')
  console.log(components)

  return components
}

export function getComponents() {
  const components = import.meta.glob('../views/**/*.vue', { eager: true })
  return components
}

export const asyncComponent = () => {
  const views = getViews()
  const components = getComponents()
  Object.keys(views).forEach((key: string) => {
    const view = components[key]
    console.log(view)
  })
}
