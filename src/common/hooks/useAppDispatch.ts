import { AppDispatch } from 'src/common/types/types';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
