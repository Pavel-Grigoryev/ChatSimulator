import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppRootState } from 'src/common/types';

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
