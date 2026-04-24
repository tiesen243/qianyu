import {
  useSelector as useBaseSelector,
  useDispatch as useBaseDispatch,
} from 'react-redux'

import type { AppDispatch, RootState } from '@/redux/store'

export const useSelector = useBaseSelector.withTypes<RootState>()
export const useDispatch = useBaseDispatch.withTypes<AppDispatch>()
