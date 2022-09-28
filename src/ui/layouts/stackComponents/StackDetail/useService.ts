/* eslint-disable */

import { StackDetailRouteParams } from '.';
import {
  pipelinesActions,
  stackComponentsActions,
  stacksActions,
} from '../../../../redux/actions';
import {
  stackComponentSelectors,
  stackSelectors,
} from '../../../../redux/selectors';
import { useParams, useSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { stackPagesActions } from '../../../../redux/actions';
import { useEffect } from 'react';

interface ServiceInterface {
  stackComponent: TStack;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { id } = useParams<StackDetailRouteParams>();

  useEffect(() => {
    setFetching(true);
    // Legacy: previously runs was in pipeline
    dispatch(
      stackComponentsActions.stackComponentForId({
        stackComponentId: id,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
    dispatch(
      stackComponentsActions.allRunsByStackComponentId({
        stackComponentId: id,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [id]);

  const setFetching = (fetching: boolean) => {
    dispatch(stackPagesActions.setFetching({ fetching }));
  };

  const stackComponent = useSelector(
    stackComponentSelectors.stackComponentForId(id),
  );

  return { stackComponent };
};
