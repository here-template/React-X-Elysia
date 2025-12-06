import { treaty } from '@elysiajs/eden'
import type {Routes} from 'backend/route-types'

const client = treaty<Routes>('localhost:3000') 

export default client
