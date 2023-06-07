import auth from '@/services/auth'
import faculty from '@/services/faculty'
import period from '@/services/period'
import programStudy from '@/services/program-study'
import submissions from '@/services/submissions'
import users from '@/services/user'

const rootServices = {
  reducers: {
    // auth
    [auth.reducerPath]: auth.reducer,
    // faculty
    [faculty.reducerPath]: faculty.reducer,
    // programStudy
    [programStudy.reducerPath]: programStudy.reducer,
    // submissions
    [submissions.reducerPath]: submissions.reducer,
    // user
    [users.reducerPath]: users.reducer,
    // user
    [period.reducerPath]: period.reducer,
  },
  middlewares: [
    // auth
    auth.middleware,
    // faculty
    faculty.middleware,
    // programStudy
    programStudy.middleware,
    // submission
    submissions.middleware,
    period.middleware,
    // user
    users.middleware,
  ],
}

export default rootServices
