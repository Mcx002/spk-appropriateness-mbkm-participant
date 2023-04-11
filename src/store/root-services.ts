import auth from '@/services/auth'
import faculty from '@/services/faculty'
import programStudy from '@/services/program-study'

const rootServices = {
  reducers: {
    // auth
    [auth.reducerPath]: auth.reducer,
    // faculty
    [faculty.reducerPath]: faculty.reducer,
    // programStudy
    [programStudy.reducerPath]: programStudy.reducer,
  },
  middlewares: [
    // auth
    auth.middleware,
    // faculty
    faculty.middleware,
    // programStudy
    programStudy.middleware,
  ],
}

export default rootServices
