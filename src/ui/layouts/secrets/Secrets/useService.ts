/* eslint-disable */

import { useEffect } from 'react';
import {
  stackPagesActions,
  secretsActions,
  secretPagesActions,
} from '../../../../redux/actions';
import { workspaceSelectors } from '../../../../redux/selectors';
import { useDispatch, useSelector, useLocationPath } from '../../../hooks';
import { filterObjectForParam } from '../../../../utils';

interface ServiceInterface {
  setFetching: (arg: boolean) => void;
}

export const useService = (): ServiceInterface => {
  const locationPath = useLocationPath();
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  useEffect(() => {
    setFetching(true);
    console.log('locationPath111', locationPath);
    // dispatch(
    //   stacksActions.getMy({
    //     sort_by: 'desc:created',
    //     logical_operator: 'and',
    //     page: 1,
    //     size: ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
    //     workspace: selectedWorkspace,
    //     onSuccess: () => setFetching(false),
    //     onFailure: () => setFetching(false),
    //   }),
    // );
  }, [locationPath, selectedWorkspace]);

  const setFetching = (fetching: boolean) => {
    dispatch(secretPagesActions.setFetching({ fetching }));
  };

  return {
    setFetching,
    // dispatchStackData,
  };
};

export const callActionForSecretsForPagination = () => {
  const locationPath = useLocationPath();
  const dispatch = useDispatch();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  function dispatchSecretData(
    page: number,
    size: number,
    filters?: any[],
    sortby?: string,
    // stackComponentId?: TId,
  ) {
    const logicalOperator = localStorage.getItem('logical_operator');
    let filtersParam = filterObjectForParam(filters);

    setFetching(true);
    dispatch(
      secretsActions.getMy({
        // component_id: stackComponentId,
        workspace: selectedWorkspace,
        sort_by: sortby ? sortby : 'desc:created',
        logical_operator: logicalOperator ? JSON.parse(logicalOperator) : 'and',
        page: page,
        size: size,
        filtersParam,
        onSuccess: () => {
          setFetching(false);
          localStorage.setItem('logical_operator', JSON.stringify('and'));
        },
        onFailure: () => {
          setFetching(false);
          localStorage.setItem('logical_operator', JSON.stringify('and'));
        },
      }),
    );
  }

  const setFetching = (fetching: boolean) => {
    dispatch(secretPagesActions.setFetching({ fetching }));
  };

  return {
    setFetching,
    dispatchSecretData,
  };
};
