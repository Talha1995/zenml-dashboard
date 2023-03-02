import React, { Fragment, useEffect, useState } from 'react';
import styles from './index.module.scss';
import {
  Box,
  FlexBox,
  FormTextField,
  FullWidthSpinner,
  H2,
  Paragraph,
  icons,
} from '../../../../components';

import { Form, TextField, ToggleField } from '../../../common/FormElement';
import { useDispatch, useHistory, useSelector } from '../../../../hooks';
import {
  sessionSelectors,
  userSelectors,
  workspaceSelectors,
} from '../../../../../redux/selectors';
import { showToasterAction } from '../../../../../redux/actions';
import { iconColors, toasterTypes } from '../../../../../constants';
import axios from 'axios';
import { routePaths } from '../../../../../routes/routePaths';
import { SidePopup } from '../SidePopup';
import { callActionForStackComponentsForPagination } from '../../Stacks/useService';

export const CreateComponent: React.FC<{ flavor: any }> = ({ flavor }) => {
  const {
    dispatchStackComponentsData,
  } = callActionForStackComponentsForPagination();
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  // const [validationSchema, setValidationSchema] = useState({});
  const user = useSelector(userSelectors.myUser);
  const workspaces = useSelector(workspaceSelectors.myWorkspaces);
  const [componentName, setComponentName] = useState('');
  const [isShared, setIsShared] = useState(true);
  const [inputData, setInputData] = useState({}) as any;
  const [inputFields, setInputFields] = useState() as any;
  const history = useHistory();
  console.log(flavor, 'flavorflavor');
  useEffect(() => {
    let setDefaultData = {};
    let setInputObjectType: any = [];
    initForm(flavor.configSchema.properties);
    Object.keys(flavor.configSchema.properties).map((key, ind) => {
      const data = flavor.configSchema.properties[key];
      if (data.default && (data.type === 'string' || data.type === 'integer'))
        setDefaultData = {
          ...setDefaultData,
          [toSnakeCase(data.title)]: data.default,
        };
      return null;
    });

    Object.keys(flavor.configSchema.properties).map((key, ind) => {
      const data = flavor.configSchema.properties[key];
      if (data.type === 'object')
        setInputObjectType.push({
          [key]: [{ key: '', value: '' }],
        });
      return null;
    });

    setInputFields(setInputObjectType);

    setInputData({ ...setDefaultData });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleAddFields = (name: any, index: any) => {
    const values = [...inputFields];
    // const check = values.find(({ name }) => name);
    // const targetObject = values.find((x) => x[name] !== undefined);

    // if (targetObject) {
    // }
    // debugger;
    values[index][name].push({ key: '', value: '' });

    setInputFields(values);
  };

  const handleRemoveFields = (parentIndex: any, childIndex: any, name: any) => {
    const values = [...inputFields];
    debugger;
    values[parentIndex][name].splice(childIndex, 1);
    setInputFields(values);
  };
  const toSnakeCase = (str: any) =>
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
      )
      .map((x: any) => x.toLowerCase())
      .join('_');

  const handleInputChange = (
    parentIndex: any,
    childIndex: any,
    event: any,
    name: any,
    type: any,
  ) => {
    const values = [...inputFields];
    if (type === 'key') {
      values[parentIndex][name][childIndex].key = event;
    } else {
      values[parentIndex][name][childIndex].value = event;
    }
    setInputFields(values);
    // const keys = values.map((object) => object.key);
    // const value = values.map((object) => object.value);

    // keys.forEach((key: any, i: any) => (result[key] = value[i]));

    // if (event) {
    //   setInputData({
    //     ...inputData,
    //     [name]: {
    //       ...values[parentIndex][name],
    //     },
    //   });
    // }
  };

  const initForm = (properties: any) => {
    let _formData: any = {};

    for (var key of Object.keys(properties)) {
      _formData[key] = '' as any;
    }

    setFormData(_formData);
  };
  console.log(inputData, 'inputDatainputData');
  const getFormElement = (elementName: any, elementSchema: any) => {
    const props = {
      name: elementName,
      label: elementSchema.title,
      default: elementSchema.default as any,
    };

    if (elementSchema.type === 'object' && elementSchema.title) {
      return (
        <Box marginTop="md">
          <Paragraph size="body" style={{ color: '#000' }}>
            <label htmlFor="key">{props.label}</label>
          </Paragraph>

          <FlexBox.Row>
            <div className="form-row">
              {inputFields?.map((item: any, parentIndex: any) =>
                item[props.name]?.map((inputField: any, childIndex: any) => (
                  <Fragment key={`${inputField}~${childIndex}`}>
                    <div className="form-group col-sm-5">
                      <FormTextField
                        onChange={(event: any) =>
                          handleInputChange(
                            parentIndex,
                            childIndex,
                            event,
                            props.name,
                            'key',
                          )
                        }
                        label={'Key'}
                        value={inputField?.key}
                        placeholder={''}
                      />
                    </div>

                    <div className="form-group col-sm-5">
                      <FormTextField
                        onChange={(event: any) =>
                          handleInputChange(
                            parentIndex,
                            childIndex,
                            event,
                            props.name,
                            'value',
                          )
                        }
                        label={'Value'}
                        value={inputField?.value}
                        placeholder={''}
                      />
                    </div>
                    <div
                      className="col-sx-2 "
                      style={{
                        justifyContent: 'space-between',
                        display: 'flex',
                        marginTop: '10px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        {item[props.name].length > 1 && (
                          <button
                            className={styles.fieldButton}
                            style={{}}
                            type="button"
                            // disabled={item[props.name].length === 1}
                            onClick={() =>
                              handleRemoveFields(
                                parentIndex,
                                childIndex,
                                props.name,
                              )
                            }
                          >
                            <icons.minusCircle color={iconColors.primary} />
                          </button>
                        )}

                        {childIndex === item[props.name].length - 1 && (
                          <button
                            className={styles.fieldButton}
                            type="button"
                            onClick={() =>
                              handleAddFields(props.name, parentIndex)
                            }
                          >
                            <icons.plusCircle color={iconColors.primary} />
                          </button>
                        )}
                      </div>
                    </div>
                  </Fragment>
                )),
              )}
              {/* {inputFields
                ?.filter((x: any) => x.hasOwnProperty(props.name))
                .map((inputField: any, index: any) => (
            
                ))} */}
            </div>
            <div className="submit-button"></div>
            <br />
          </FlexBox.Row>
        </Box>
      );
    }

    if (
      elementSchema.type === 'string' ||
      (elementSchema.type === 'integer' && elementSchema.title)
    ) {
      return (
        <TextField
          {...props}
          required={flavor?.configSchema?.required?.includes(elementName)}
          // disable={
          //   elementSchema.default &&
          //   (elementSchema.type === 'string' ||
          //     elementSchema.type === 'integer')
          // }
          default={
            inputData[props.name] ? inputData[props.name] : props.default
          }
          onHandleChange={(key: any, value: any) =>
            setInputData({ ...inputData, [key]: value })
          }
        />
      );
    }
    if (elementSchema.type === 'boolean' && elementSchema.title) {
      return (
        <ToggleField
          {...props}
          onHandleChange={(key: any, value: any) =>
            setInputData({ ...inputData, [key]: value })
          }
        />
      );
    }
  };

  const onSubmit = async (values: any) => {
    const requiredField = flavor?.configSchema?.required?.filter(
      (item: any) => inputData[item],
    );
    console.log('requiredField', requiredField);
    if (requiredField?.length !== flavor?.configSchema?.required?.length) {
      dispatch(
        showToasterAction({
          description: 'Required Field is Empty',
          type: toasterTypes.failure,
        }),
      );
      return false;
    }
    if (!componentName) {
      dispatch(
        showToasterAction({
          description: 'Required Field is Empty',
          type: toasterTypes.failure,
        }),
      );
      return false;
    }
    const { id }: any = workspaces.find(
      (item) => item.name === selectedWorkspace,
    );

    const final: any = {};
    inputFields.forEach((ar: any) => {
      const keys = Object.keys(ar);
      keys.forEach((key) => {
        final[key] = {};

        ar[key].forEach((nestedArr: any) => {
          if (nestedArr.key && nestedArr.value) {
            final[key] = {
              ...final[key],
              [nestedArr.key]: nestedArr.value,
            };
          } else {
            if (Object.keys(final[key]).length === 0) {
              delete final[key];
            }
          }
        });
      });
    });

    const body = {
      user: user?.id,
      workspace: id,
      is_shared: isShared,
      name: componentName,
      type: flavor.type,
      flavor: flavor.name,
      configuration: { ...inputData, ...final },
    };
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/workspaces/${selectedWorkspace}/components`,
        // @ts-ignore
        { ...body },
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      .then((response) => {
        const id = response.data.id;
        setLoading(false);
        dispatch(
          showToasterAction({
            description: 'Component has been created successfully',
            type: toasterTypes.success,
          }),
        );
        dispatchStackComponentsData(1, 10);

        history.push(
          routePaths.stackComponents.configuration(
            flavor.type,
            id,
            selectedWorkspace,
          ),
        );
      })
      .catch((err) => {
        setLoading(false);
        dispatch(
          showToasterAction({
            description: err?.response?.data?.detail[0].includes('Exists')
              ? `Component name already exists.`
              : err?.response?.data?.detail[0],
            type: toasterTypes.failure,
          }),
        );
      });
  };
  if (loading) {
    return <FullWidthSpinner color="black" size="md" />;
  }

  return (
    <Box>
      <Box style={{ width: '100%', marginTop: '-30px' }} marginBottom="lg">
        <H2>Configuring your component</H2>
      </Box>

      <FlexBox.Row style={{ width: '100%' }}>
        <Box style={{ width: '50rem' }}>
          <FormTextField
            onChange={(e: any) => {
              setComponentName(e);
            }}
            required={'*'}
            placeholder="Component Name"
            label={'Component Name'}
            value={componentName}
          />
          <ToggleField
            label={'Share Component with public'}
            default={isShared}
            onHandleChange={
              (key: any, value: any) => setIsShared(value)
              // setInputData({ ...inputData, ['is_shared']: value })
            }
          />

          <Form
            enableReinitialize
            initialValues={formData}
            // validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {Object.keys(flavor.configSchema.properties).map((key, ind) => (
              <div key={key}>
                {getFormElement(key, flavor.configSchema.properties[key])}
              </div>
            ))}

            {/* <PrimaryButton marginTop="md">Upload File</PrimaryButton> */}
          </Form>
        </Box>

        <SidePopup onClose={() => {}} flavor={flavor} action={onSubmit} />
      </FlexBox.Row>
    </Box>
    // <FlexBox.Column fullWidth marginTop="xl">
    //   <Box style={{ width: '40%' }}>
    //     <Box>
    //       <EditField
    //         onChangeText={() => {}}
    //         label="Component Name"
    //         optional={false}
    //         value=""
    //         placeholder=""
    //         hasError={false}
    //         className={styles.field}
    //       />
    //     </Box>
    //   </Box>
    //   {/* <Box style={{ marginLeft: 'auto' }} marginRight='lg' ><PrimaryButton>Register Component</PrimaryButton></Box> */}
    // </FlexBox.Column>
  );
};
