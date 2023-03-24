import React from 'react';

import {
  FlexBox,
} from '../../../../components';

import { useService } from './useService';
// import {setRunDetails} from '../../../../../redux/actions/runs/setRunDetails'
import { useDispatch } from 'react-redux';
import JsonDisplay from '../../../../components/lineage/JsonDisplay';
export const Details: React.FC<{ runId: TId }> = ({ runId }) => {
  // const dispatch = useDispatch();
  const { run } = useService({ runId });

  const artifact: any = localStorage.getItem("__ARTIFACT");
  const step: any = localStorage.getItem("__STEP");

  if (artifact == null && step == null) return <></>
  // console.log({data})
  console.log({ artifact })



  return (
    <FlexBox.Column fullWidth styles={{background:"black"}}>
      <JsonDisplay data={JSON.parse(artifact)}/>
    </FlexBox.Column>
  );
};
