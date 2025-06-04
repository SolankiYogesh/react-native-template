type AppLoaderRefType = {
  showLoader: (state: boolean) => void
}

type ResponseTypeAXIOS<T> = {
  status: number
  data: T
}
