import Fetch from 'ch-tools-fetch'

const runFetch = async () => {
  const fetchWrap = new Fetch()
  fetchWrap.use(async (input, init, next) => {
    console.log('pre fetch')

    const response = await next()

    console.log('post fetch')

    return response
  })

  fetchWrap.use(async (input, init, next) => {
    console.log('pre fetch 2')

    const response = await next()

    console.log('post fetch 2')

    return response
  })

  try {
    await fetchWrap.fetch('/api', {})
  } catch (error) {
    console.log(error)
  }
}

runFetch()
